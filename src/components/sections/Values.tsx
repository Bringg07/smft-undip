"use client";

import { motion } from "framer-motion";

const values = [
  {
    number: "01",
    title: "Adaptif",
    body: "Mampu mengikuti perkembangan zaman dan kebutuhan mahasiswa.",
  },
  {
    number: "02",
    title: "Progresif",
    body: "Terus bergerak menuju perubahan yang lebih baik.",
  },
  {
    number: "03",
    title: "Akuntabel",
    body: "Bekerja secara profesional, transparan, dan bertanggung jawab.",
  },
  {
    number: "04",
    title: "Sinergis",
    body: "Membangun kolaborasi antar organisasi demi kemajuan bersama.",
  },
];

export default function Values() {
  return (
    <section className="bg-parlemen-950 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-28"
          >
            <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-300">
              Nilai-Nilai Kabinet
            </p>
            <h2 className="mt-4 font-heading text-2xl leading-snug text-white md:text-4xl">
              Nilai yang menjadi pegangan setiap langkah
            </h2>
            <p className="mt-5 font-body text-base leading-relaxed text-white/60">
              Empat nilai yang menjiwai seluruh aktivitas Kabinet Langkah Karya dalam menjalankan
              fungsi kelembagaan Senat Mahasiswa Fakultas Teknik.
            </p>
          </motion.div>

          <div className="divide-y divide-gold-400/10">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group flex items-start gap-6 py-8 transition-all duration-300 hover:pl-2"
              >
                <span className="font-heading text-3xl text-gold-400/40 transition-colors duration-300 group-hover:text-gold-300 md:text-4xl">
                  {v.number}
                </span>
                <div>
                  <h3 className="font-heading text-lg text-white md:text-xl">{v.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-white/60 md:text-base">
                    {v.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
