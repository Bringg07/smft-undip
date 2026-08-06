"use client"; // Diperlukan karena menggunakan animasi framer-motion

import type { Metadata } from "next";
import { motion } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Vision from "@/components/sections/Vision";
import Mission from "@/components/sections/Mission";
import CabinetPhilosophy from "@/components/sections/CabinetPhilosophy";
import Values from "@/components/sections/Values";
import LogoPhilosophy from "@/components/sections/LogoPhilosophy";
import LeadershipPreview from "@/components/sections/LeadershipPreview";
import Aspirasi from "@/components/sections/Aspirasi";
import Footer from "@/components/sections/Footer";

// Komponen pembungkus untuk efek Fade-in saat di-scroll
const FadeInSection = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      
      <FadeInSection><About /></FadeInSection>
      <FadeInSection><Vision /></FadeInSection>
      <FadeInSection><Mission /></FadeInSection>
      <FadeInSection><CabinetPhilosophy /></FadeInSection>
      <FadeInSection><Values /></FadeInSection>
      <FadeInSection><LogoPhilosophy /></FadeInSection>
      <FadeInSection><LeadershipPreview /></FadeInSection>
      <FadeInSection><Aspirasi /></FadeInSection>
      
      <Footer />
    </main>
  );
}