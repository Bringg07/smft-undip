import type { Metadata } from "next";
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

// Catatan: openGraph, twitter, dan images diwarisi dari layout.tsx agar
// tidak ada field yang tertimpa (metadata Next.js di-merge secara shallow).
export const metadata: Metadata = {
  title: {
    absolute: "Senat Mahasiswa Fakultas Teknik UNDIP | Kabinet Langkah Karya",
  },
  description:
    "Parlemen Bermakna, Langkah Nyata, Karya Berdampak. Website resmi Senat Mahasiswa Fakultas Teknik Universitas Diponegoro, Kabinet Langkah Karya.",
};

// Catatan: setiap section sudah memiliki animasi whileInView sendiri,
// sehingga tidak perlu dibungkus animasi tambahan di level halaman.
export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Vision />
      <Mission />
      <CabinetPhilosophy />
      <Values />
      <LogoPhilosophy />
      <LeadershipPreview />
      <Aspirasi />
      <Footer />
    </main>
  );
}
