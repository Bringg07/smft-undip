import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import GaleriGrid from "@/components/sections/GaleriGrid";
import { getGaleriList } from "@/lib/data";

export const metadata: Metadata = {
  title: "Galeri Kegiatan",
  description:
    "Dokumentasi foto kegiatan Senat Mahasiswa Fakultas Teknik Universitas Diponegoro.",
};

export const revalidate = 60;

export default async function GaleriPage() {
  const items = await getGaleriList();

  return (
    <main className="min-h-screen bg-parlemen-950">
      <Navbar />
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gold-glow animate-pulse-glow transform-gpu" />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32">
          <div className="mb-14 text-center">
            <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-300">
              Dokumentasi
            </p>
            <h1 className="mt-4 font-heading text-4xl text-white md:text-5xl">
              Galeri <span className="text-gold-gradient">Kegiatan</span>
            </h1>
            <div className="divider-gold mx-auto mt-6 w-24" />
            <p className="mx-auto mt-4 max-w-xl font-body text-sm text-white/60 md:text-base">
              Dokumentasi kegiatan SMFT UNDIP periode 2026/2027.
            </p>
          </div>

          {items.length === 0 ? (
            <p className="py-20 text-center font-body text-white/50">
              Dokumentasi foto sedang dikumpulkan tim humas. Pantau Instagram @smftundip
              untuk pembaruan.
            </p>
          ) : (
            <GaleriGrid items={items} />
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
