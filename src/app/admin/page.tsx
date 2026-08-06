import Link from "next/link";
import { Newspaper, ClipboardList, ArrowRight } from "lucide-react";
import { getBeritaList, getProgramKerjaList } from "@/lib/data";

export default async function AdminDashboardPage() {
  const [beritaList, programList] = await Promise.all([
    getBeritaList(),
    getProgramKerjaList(),
  ]);

  const stats = [
    {
      label: "Total Berita",
      value: beritaList.length,
      href: "/admin/berita",
      icon: Newspaper,
    },
    {
      label: "Total Program Kerja",
      value: programList.length,
      href: "/admin/program-kerja",
      icon: ClipboardList,
    },
  ];

  return (
    <div>
      <div className="mb-10">
        <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-300">
          Panel Admin
        </p>
        <h1 className="mt-3 font-heading text-3xl text-white md:text-4xl">Dashboard</h1>
        <p className="mt-3 max-w-xl font-body text-sm text-white/60">
          Kelola konten website SMFT UNDIP. Perubahan yang disimpan akan langsung
          tampil di halaman publik.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="glass group rounded-xl2 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-gold-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10 text-gold-300">
                <stat.icon size={22} />
              </div>
              <ArrowRight
                size={20}
                className="text-white/30 transition-all group-hover:translate-x-1 group-hover:text-gold-300"
              />
            </div>
            <p className="mt-6 font-heading text-4xl text-white">{stat.value}</p>
            <p className="mt-2 font-body text-sm text-white/60">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-xl2 border border-gold-400/15 bg-perlemen-900/50 p-6">
        <h2 className="font-heading text-lg text-white">Panduan Singkat</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 font-body text-sm text-white/60">
          <li>Kelola <span className="text-gold-300">Berita</span> — tambah, ubah, atau hapus artikel berita.</li>
          <li>Kelola <span className="text-gold-300">Program Kerja</span> — perbarui program beserta statusnya.</li>
          <li>Gunakan tombol <span className="text-gold-300">Keluar</span> di kanan atas setelah selesai.</li>
        </ul>
      </div>
    </div>
  );
}
