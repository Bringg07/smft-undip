"use client";

import { motion } from "framer-motion";

const cards = [
  {
    number: "01",
    title: "LANGKAH",
    body: "Wujud dari nilai Adaptif dan Progresif. Kabinet ini lahir dari keyakinan bahwa parlemen mahasiswa harus peka terhadap dinamika Fakultas Teknik, berani mengambil langkah strategis, dan terus bertumbuh melalui inovasi serta semangat perubahan.",
  },
  {
    number: "02",
    title: "KARYA",
    body: "Wujud dari nilai Akuntabilitas dan Sinergis. Setiap anggota diharapkan profesional dan menjunjung integritas, serta bekerja sama dengan seluruh ORMAWA, UPK, dan HMD di Fakultas Teknik demi hasil yang benar-benar dirasakan mahasiswa.",
  },
];

export default function CabinetPhilosophy() {
  return (
    <section id="filosofi" className="bg-parlemen-900 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-300">
            Filosofi Kabinet
          </p>
          <h2 className="mt-4 font-heading text-2xl leading-snug text-white md:text-4xl">
            Makna di balik nama Langkah Karya
          </h2>
          <div className="divider-gold my-6 w-24" />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, x: i === 0 ? -32 : 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="glass group rounded-[1.75rem] p-8 transition-all hover:shadow-gold-sm md:p-10"
            >
              <div className="flex items-center gap-4">
                <span className="font-heading text-sm tracking-[0.3em] text-gold-400/50">
                  {c.number}
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-gold-400/30 to-transparent" />
              </div>
              <h3 className="mt-6 font-heading text-3xl text-gold-gradient md:text-4xl">
                {c.title}
              </h3>
              <div className="divider-gold my-5 w-16" />
              <p className="font-body text-sm leading-relaxed text-white/70 md:text-base">
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
