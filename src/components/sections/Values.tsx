"use client";

import { motion } from "framer-motion";
import { Compass, TrendingUp, ShieldCheck, Users } from "lucide-react";

const values = [
  { icon: Compass, title: "Adaptif", body: "Mampu mengikuti perkembangan zaman dan kebutuhan mahasiswa." },
  { icon: TrendingUp, title: "Progresif", body: "Terus bergerak menuju perubahan yang lebih baik." },
  { icon: ShieldCheck, title: "Akuntabel", body: "Bekerja secara profesional, transparan, dan bertanggung jawab." },
  { icon: Users, title: "Sinergis", body: "Membangun kolaborasi antar organisasi demi kemajuan bersama." },
];

export default function Values() {
  return (
    <section className="bg-perlemen-950 py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center font-heading text-xs uppercase tracking-[0.4em] text-gold-300"
        >
          Nilai-Nilai Kabinet
        </motion.p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass group rounded-xl2 p-8 text-center transition-all hover:shadow-gold-sm"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10 text-gold-300 transition-transform group-hover:scale-110">
                <v.icon size={26} />
              </div>
              <h3 className="mt-5 font-heading text-lg text-white">{v.title}</h3>
              <p className="mt-2 font-body text-sm text-white/60">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
