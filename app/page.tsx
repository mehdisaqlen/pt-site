import Stats from "./components/Stats";
import Hero from "./components/Hero";
import Partners from "./components/Partners";
import Services from "./components/Services";
import Steps from "./components/Steps";
import CTA from "./components/CTA";
import Solutions from "./components/Solutions";

export default function page() {
  return (
    <div>
      <Hero />
      <Partners />
      <Services />
      <Stats />
      <Steps />
      <Solutions />
      <CTA
        headline="Unlock premium Google Ad Exchange demand and earn more"
        leftLabel="Start Monetization"
        rightLabel="Talk to Our Team"
        leftHref="/contact"
        rightHref="/team"
      />
    </div>
  );
}
