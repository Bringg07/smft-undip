import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import BeritaGrid from "@/components/sections/BeritaGrid";
import { getBeritaList } from "@/lib/data";

export const metadata: Metadata = {
  title: "Berita & Update",
  description:
    "Informasi terbaru, kegiatan, dan pengumuman resmi dari Senat Mahasiswa Fakultas Teknik Universitas Diponegoro.",
};

// Konten diperbarui saat admin menyimpan perubahan (revalidatePath) —
// plus fallback otomatis refresh jika halaman diakses setelah 60 detik.
export const revalidate = 60;

export default async function BeritaPage() {
  const articles = await getBeritaList();

  return (
    <main className="min-h-screen bg-parlemen-950">
      <Navbar />
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gold-glow animate-pulse-glow transform-gpu" />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32">
          <div className="mb-14 text-center">
            <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-300">
              Warta Senat
            </p>
            <h1 className="mt-4 font-heading text-4xl text-white md:text-5xl">
              Berita <span className="text-gold-gradient">&amp; Update</span>
            </h1>
            <div className="divider-gold mx-auto mt-6 w-24" />
            <p className="mx-auto mt-4 max-w-xl font-body text-sm text-white/60 md:text-base">
              Informasi resmi seputar kegiatan, kebijakan, dan pengumuman Senat Mahasiswa
              Fakultas Teknik UNDIP.
            </p>
          </div>

          <BeritaGrid articles={articles} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
