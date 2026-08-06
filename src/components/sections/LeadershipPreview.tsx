"use client";

import { motion } from "framer-motion";

const LEADERSHIP = [
  { n: "Nur Muhammad Rauf", j: "Ketua Senat" },
  { n: "Andra Aryasatya Ramadhan", j: "Wakil Ketua 1" },
  { n: "Kemal Ghifariwarman J.", j: "Wakil Ketua 2" },
  { n: "Alexsandria Nurintan R.", j: "Sekretaris Jendral" },
  { n: "Omar Rafizki Pradana", j: "Bendahara Eksternal" },
  { n: "Naura Refa Adalati", j: "Sekretaris Bendahara" },
  { n: "Mauriz Cahya Arizati", j: "Sekretaris Eksternal" },
  { n: "Muhammad Farras Ridho", j: "Ketua Badan Advokasi" },
  { n: "Nadhira Rahma Putri", j: "Ketua Badan Legislasi" },
  { n: "Calista Aurelia", j: "Ketua Badan Anggaran" },
  { n: "Zefa Malkalendra Suryo", j: "Ketua BKSAP" },
  { n: "Khansa Maura Balqis", j: "Ketua Komisi 1" },
  { n: "Abdillah Senja Ramadhan", j: "Ketua Komisi 2" },
  { n: "Afiq Almu'tashim", j: "Ketua Komisi 3" },
  { n: "Sutan Sakti", j: "Ketua Komisi 4" },
];

const getInitials = (name: string) => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

export default function LeadershipPreview() {
  return (
    <section className="bg-perlemen-950 py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="font-heading text-xs uppercase tracking-[0.35em] text-gold-400/80">
            Pimpinan SMFT 2026
          </p>
          <h2 className="mt-4 font-heading text-4xl font-black tracking-tight text-white sm:text-5xl">
            Tim Pimpinan Terdepan
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-7 text-perlemen-300">
            Kartu pimpinan dirancang agar siap menampilkan foto dengan tampilan premium, elegan, dan modern.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {LEADERSHIP.map((leader, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.08 }}
              className="overflow-hidden rounded-[1.5rem] border border-gold-400/15 bg-perlemen-900/80 p-5 shadow-[0_18px_35px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40 hover:shadow-[0_20px_45px_rgba(212,175,55,0.18)]"
            >
              <div className="relative rounded-3xl border border-gold-400/20 bg-gradient-to-br from-perlemen-800 via-perlemen-900 to-black p-5">
                <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500" />
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-gold-400/30 bg-perlemen-800 text-2xl font-bold tracking-[0.16em] text-gold-300 shadow-[0_8px_30px_rgba(212,175,55,0.12)]">
                  {getInitials(leader.n)}
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="font-heading text-lg font-semibold text-white">{leader.n}</p>
                <p className="mt-2 font-body text-sm text-perlemen-300">{leader.j}</p>
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[11px] uppercase tracking-[0.3em] text-perlemen-400">
                <span className="rounded-full border border-perlemen-700 bg-white/5 px-2.5 py-1">Pimpinan</span>
                <span className="rounded-full border border-gold-400/20 bg-gold-400/10 px-2.5 py-1 text-gold-300">SMFT</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 text-center"
        >
          <a
            href="/struktur-organisasi"
            className="inline-flex items-center gap-2 border-b border-gold-400 font-semibold text-gold-400 transition-all duration-300 hover:gap-4"
          >
            Lihat Struktur Organisasi Lengkap →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
