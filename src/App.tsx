import { LeadModalProvider } from "@/context/lead-modal";
import { Header } from "@/components/sections/header";
import { MirWebLaptopHero } from "@/components/hero/MirWebLaptopHero";
import { Showcase } from "@/components/sections/showcase";
import { ForWhom } from "@/components/sections/for-whom";
import { HowWeWork } from "@/components/sections/how-we-work";
import { FreeDemo } from "@/components/sections/free-demo";
import { Examples } from "@/components/sections/examples";
import { WhyWebsite } from "@/components/sections/why-website";
import { Pricing } from "@/components/sections/pricing";
import { Team } from "@/components/sections/team";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function App() {
  return (
    <LeadModalProvider>
      <div className="relative min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <MirWebLaptopHero />
          <Showcase />
          <ForWhom />
          <HowWeWork />
          <FreeDemo />
          <Examples />
          <WhyWebsite />
          <Pricing />
          <Team />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </LeadModalProvider>
  );
}
