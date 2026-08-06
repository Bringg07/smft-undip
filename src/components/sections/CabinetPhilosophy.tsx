"use client";

import { motion } from "framer-motion";

const cards = [
  {
    title: "LANGKAH",
    body: "Implementasi dari nilai Adaptif dan Progresif — Parlemen Kabinet Langkah Karya diharapkan mampu beradaptasi dengan dinamika Fakultas Teknik, terus berkembang, serta bertumbuh menuju masa depan yang lebih baik melalui inovasi, keberanian mengambil langkah strategis, dan semangat perubahan.",
  },
  {
    title: "KARYA",
    body: "Implementasi dari nilai Akuntabilitas dan Sinergis — seluruh anggota Parlemen Kabinet Langkah Karya diharapkan memiliki sikap profesional, bertanggung jawab, menjunjung integritas, serta mengoptimalkan komunikasi dan kolaborasi bersama seluruh ORMAWA, UPK, dan HMD di Fakultas Teknik demi menghasilkan dampak nyata bagi mahasiswa.",
  },
];

export default function CabinetPhilosophy() {
  return (
    <section id="filosofi" className="bg-perlemen-900 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-heading text-xs uppercase tracking-[0.4em] text-gold-300"
        >
          Filosofi Kabinet Langkah Karya
        </motion.p>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="glass shadow-glass group rounded-xl2 p-10 transition-transform hover:-translate-y-1"
            >
              <h3 className="font-heading text-3xl text-gold-gradient md:text-4xl">{c.title}</h3>
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
