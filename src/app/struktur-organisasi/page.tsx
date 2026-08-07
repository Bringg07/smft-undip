import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import StrukturGrid from "@/components/sections/StrukturGrid";
import { getStrukturList } from "@/lib/data";

export const metadata: Metadata = {
  title: "Struktur Organisasi",
  description:
    "Susunan kepengurusan Senat Mahasiswa Fakultas Teknik Universitas Diponegoro: senator dan staff ahli per badan serta komisi.",
};

// Konten diperbarui saat admin menyimpan perubahan (revalidatePath) —
// plus fallback otomatis refresh jika halaman diakses setelah 60 detik.
export const revalidate = 60;

export default async function StrukturOrganisasiPage() {
  const anggota = await getStrukturList();

  return (
    <main className="min-h-screen bg-perlemen-950">
      <Navbar />
      <div className="relative overflow-hidden">
        {/* Dekorasi latar khas halaman struktur organisasi */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.15),_transparent_35%),linear-gradient(135deg,_#09090b,_#18181b_55%,_#27272a)]" />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32">
          <div className="relative mb-10 overflow-hidden rounded-[2rem] border border-gold-400/25 bg-black/25 px-8 py-10 text-center shadow-[0_25px_90px_rgba(0,0,0,0.4)] backdrop-blur-md sm:px-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.2),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_25%)]" />
            <div className="absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 rounded-full bg-gold-400/15 blur-3xl" />
            <div className="relative">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.45em] text-gold-400/95">
                Profil Kepengurusan
              </p>
              <h1 className="font-heading text-4xl font-black tracking-[0.02em] text-white sm:text-5xl">
                Struktur Organisasi
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-perlemen-300 sm:text-base">
                Susunan kepengurusan disajikan dengan nuansa formal, berkelas, dan simetris seperti profil dewan eksekutif.
              </p>
            </div>
          </div>

          <StrukturGrid anggota={anggota} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
