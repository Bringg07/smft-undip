import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import ProgramGrid from "@/components/sections/ProgramGrid";
import { getProgramKerjaList } from "@/lib/data";

export const metadata: Metadata = {
  title: "Program Kerja",
  description:
    "Daftar program kerja, agenda kegiatan, dan status progress dari Komisi serta Badan di bawah naungan Senat Mahasiswa Fakultas Teknik UNDIP.",
  openGraph: {
    title: "Program Kerja SMFT UNDIP",
    description: "Lihat daftar program kerja dan pergerakan Senat Mahasiswa FT UNDIP.",
    siteName: "SMFT UNDIP",
  },
};

export const revalidate = 60;

export default async function ProgramKerjaPage() {
  const programs = await getProgramKerjaList();

  return (
    <main className="min-h-screen bg-parlemen-950">
      <Navbar />
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gold-glow animate-pulse-glow transform-gpu" />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32">
          <div className="mb-10 text-center">
            <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-300">
              Agenda &amp; Pergerakan
            </p>
            <h1 className="mt-4 font-heading text-4xl text-white md:text-5xl">
              Program <span className="text-gold-gradient">Kerja</span>
            </h1>
            <div className="divider-gold mx-auto mt-6 w-24" />
            <p className="mx-auto mt-4 max-w-xl font-body text-sm text-white/60 md:text-base">
              Daftar program kerja dari Komisi dan Badan di bawah naungan Senat Mahasiswa
              Fakultas Teknik UNDIP, Kabinet Langkah Karya.
            </p>
          </div>

          <ProgramGrid programs={programs} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
