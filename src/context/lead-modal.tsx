import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Modal } from "@/components/ui/modal";
import { LeadForm } from "@/components/sections/lead-form";

interface LeadModalCtx {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

const Ctx = createContext<LeadModalCtx | null>(null);

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <Modal open={isOpen} onClose={close} labelledBy="lead-modal-title">
        <LeadForm onClose={close} />
      </Modal>
    </Ctx.Provider>
  );
}

export function useLeadModal() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLeadModal must be used within LeadModalProvider");
  return ctx;
}
