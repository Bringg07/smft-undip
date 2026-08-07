import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Vision from "@/components/sections/Vision";
import CabinetPhilosophy from "@/components/sections/CabinetPhilosophy";
import Values from "@/components/sections/Values";
import LogoPhilosophy from "@/components/sections/LogoPhilosophy";
import LeadershipPreview from "@/components/sections/LeadershipPreview";
import Aspirasi from "@/components/sections/Aspirasi";
import Footer from "@/components/sections/Footer";
import { getPengurusList } from "@/lib/data";

// Metadata openGraph/twitter/images diwarisi dari layout.tsx agar tidak tertimpa
// (metadata Next.js di-merge secara shallow).
export const metadata: Metadata = {
  title: {
    absolute: "Senat Mahasiswa Fakultas Teknik UNDIP | Kabinet Langkah Karya",
  },
  description:
    "Parlemen Bermakna, Langkah Nyata, Karya Berdampak. Website resmi Senat Mahasiswa Fakultas Teknik Universitas Diponegoro, Kabinet Langkah Karya.",
};

export default async function Home() {
  const pengurus = await getPengurusList();

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Vision />
      <CabinetPhilosophy />
      <Values />
      <LogoPhilosophy />
      <LeadershipPreview pengurus={pengurus} />
      <Aspirasi />
      <Footer />
    </main>
  );
}
