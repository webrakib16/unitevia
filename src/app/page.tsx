import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";
import { RecentEvents } from "@/components/Past-Events-Gallery";
import { RecentEventGallery } from "@/components/Recent-Event-Gallery";
import { Subscribe } from "@/components/Newsletter";
import { Sponsor } from "@/components/Sponsor";
import { WhyChoose } from "@/components/Why-Choose";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050a08] text-white">
      {/* Ambient glow behind navbar and hero */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12),rgba(5,10,8,0)_60%)]" />
     
      <Hero />
      <Features />
      <RecentEventGallery />
      <RecentEvents />
      <WhyChoose />
      <Sponsor />
      <Subscribe />
    </div>
  );
}
