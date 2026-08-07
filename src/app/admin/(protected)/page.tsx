import Link from "next/link";
import {
  Newspaper,
  ClipboardList,
  MessageSquareText,
  Users,
  ArrowRight,
  CheckCircle2,
  Clock,
  CalendarClock,
} from "lucide-react";
import {
  getBeritaList,
  getProgramKerjaList,
  getAspirasiList,
  getPengurusList,
} from "@/lib/data";

const statusStyle: Record<string, string> = {
  Selesai: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  Berjalan: "border-gold-400/30 bg-gold-400/10 text-gold-300",
  Segera: "border-sky-400/30 bg-sky-400/10 text-sky-300",
};

export default async function AdminDashboardPage() {
  const [beritaList, programList, aspirasiList, pengurusList] = await Promise.all([
    getBeritaList(),
    getProgramKerjaList(),
    getAspirasiList(),
    getPengurusList(),
  ]);

  const aspirasiBaru = aspirasiList.filter((a) => a.status === "Baru");
  const programSelesai = programList.filter((p) => p.status === "Selesai").length;
  const programBerjalan = programList.filter((p) => p.status === "Berjalan").length;
  const programSegera = programList.filter((p) => p.status === "Segera").length;

  const stats = [
    {
      label: "Total Berita",
      value: beritaList.length,
      href: "/admin/berita",
      icon: Newspaper,
    },
    {
      label: "Aspirasi Baru",
      value: aspirasiBaru.length,
      href: "/admin/aspirasi",
      icon: MessageSquareText,
      highlight: aspirasiBaru.length > 0,
    },
    {
      label: "Program Kerja",
      value: programList.length,
      href: "/admin/program-kerja",
      icon: ClipboardList,
    },
    {
      label: "Total Pengurus",
      value: pengurusList.length,
      href: "/admin/pengurus",
      icon: Users,
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className={`glass group rounded-xl2 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-sm ${
              stat.highlight ? "border-gold-400/50" : "hover:border-gold-400/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border ${
                  stat.highlight
                    ? "border-gold-400/60 bg-gold-400/20 text-gold-300"
                    : "border-gold-400/40 bg-gold-400/10 text-gold-300"
                }`}
              >
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

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* Aspirasi terbaru */}
        <section className="glass rounded-xl2 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg text-white">Aspirasi Terbaru</h2>
            <Link
              href="/admin/aspirasi"
              className="inline-flex items-center gap-1 text-xs text-gold-400 transition-colors hover:text-gold-300"
            >
              Lihat semua <ArrowRight size={13} />
            </Link>
          </div>
          {aspirasiList.length === 0 ? (
            <p className="py-8 text-center font-body text-sm text-white/40">
              Belum ada aspirasi masuk.
            </p>
          ) : (
            <ul className="space-y-3">
              {aspirasiList.slice(0, 5).map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-perlemen-900/50 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">{a.nama}</p>
                    <p className="truncate text-xs text-white/50">{a.pesan}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-widest ${
                      a.status === "Baru"
                        ? "border-gold-400/40 bg-gold-400/15 text-gold-300"
                        : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                    }`}
                  >
                    {a.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Berita terbaru */}
        <section className="glass rounded-xl2 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg text-white">Berita Terbaru</h2>
            <Link
              href="/admin/berita"
              className="inline-flex items-center gap-1 text-xs text-gold-400 transition-colors hover:text-gold-300"
            >
              Lihat semua <ArrowRight size={13} />
            </Link>
          </div>
          {beritaList.length === 0 ? (
            <p className="py-8 text-center font-body text-sm text-white/40">
              Belum ada berita. Klik tombol “Tambah Berita” di halaman Berita.
            </p>
          ) : (
            <ul className="space-y-3">
              {beritaList.slice(0, 5).map((b) => (
                <li
                  key={b.id}
                  className="rounded-lg border border-white/5 bg-perlemen-900/50 px-4 py-3"
                >
                  <p className="truncate text-sm font-medium text-white">{b.title}</p>
                  <p className="mt-1 flex items-center gap-3 text-xs text-white/50">
                    <span className="rounded-full border border-gold-400/30 bg-gold-400/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-gold-300">
                      {b.category}
                    </span>
                    <span>{b.date}</span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Ringkasan program kerja */}
      <section className="glass mt-6 rounded-xl2 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-lg text-white">Program Kerja</h2>
          <Link
            href="/admin/program-kerja"
            className="inline-flex items-center gap-1 text-xs text-gold-400 transition-colors hover:text-gold-300"
          >
            Kelola program <ArrowRight size={13} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-4 py-4">
            <CheckCircle2 size={20} className="shrink-0 text-emerald-300" />
            <div>
              <p className="font-heading text-2xl text-white">{programSelesai}</p>
              <p className="text-xs text-white/50">Selesai</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-gold-400/20 bg-gold-400/5 px-4 py-4">
            <Clock size={20} className="shrink-0 text-gold-300" />
            <div>
              <p className="font-heading text-2xl text-white">{programBerjalan}</p>
              <p className="text-xs text-white/50">Berjalan</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg border border-sky-400/20 bg-sky-400/5 px-4 py-4">
            <CalendarClock size={20} className="shrink-0 text-sky-300" />
            <div>
              <p className="font-heading text-2xl text-white">{programSegera}</p>
              <p className="text-xs text-white/50">Segera</p>
            </div>
          </div>
        </div>

        {/* Program terbaru */}
        <ul className="mt-5 space-y-2">
          {programList.slice(0, 4).map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-perlemen-900/50 px-4 py-2.5"
            >
              <p className="min-w-0 truncate text-sm text-white/80">{p.title}</p>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-widest ${
                  statusStyle[p.status] ?? statusStyle.Berjalan
                }`}
              >
                {p.status}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
