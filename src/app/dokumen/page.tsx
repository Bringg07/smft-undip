import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import DokumenGrid from "@/components/sections/DokumenGrid";
import { getDokumenList } from "@/lib/data";

export const metadata: Metadata = {
  title: "Dokumen Resmi",
  description:
    "Kumpulan dokumen resmi Senat Mahasiswa Fakultas Teknik Universitas Diponegoro: peraturan, keputusan, pedoman, dan laporan.",
};

export const revalidate = 60;

export default async function DokumenPage() {
  const items = await getDokumenList();

  return (
    <main className="min-h-screen bg-perlemen-950">
      <Navbar />
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gold-glow blur-3xl animate-pulse-glow" />

        <div className="relative mx-auto max-w-5xl px-6 pb-20 pt-32">
          <div className="mb-14 text-center">
            <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-300">
              Arsip Senat
            </p>
            <h1 className="mt-4 font-heading text-4xl text-white md:text-5xl">
              Dokumen <span className="text-gold-gradient">Resmi</span>
            </h1>
            <div className="divider-gold mx-auto mt-6 w-24" />
            <p className="mx-auto mt-4 max-w-xl font-body text-sm text-white/60 md:text-base">
              Peraturan, keputusan, pedoman, dan laporan resmi yang dapat diunduh publik.
            </p>
          </div>

          {items.length === 0 ? (
            <p className="py-20 text-center font-body text-white/50">
              Belum ada dokumen. Silakan kembali lagi nanti.
            </p>
          ) : (
            <DokumenGrid items={items} />
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
