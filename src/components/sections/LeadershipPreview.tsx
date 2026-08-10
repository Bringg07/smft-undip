"use client";

import { motion } from "framer-motion";
import type { Pengurus } from "@/lib/pengurus";

const getInitials = (name: string) => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

export default function LeadershipPreview({ pengurus }: { pengurus: Pengurus[] }) {
  return (
    <section className="bg-parlemen-950 py-20 text-white">
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
            Pimpinan Kabinet Langkah Karya
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-sm leading-7 text-parlemen-300">
            Salam hangat dari pimpinan Kabinet Langkah Karya periode 2026/2027.
          </p>
        </motion.div>

        {pengurus.length === 0 ? (
          <p className="py-16 text-center font-body text-white/50">
            Data pengurus sedang diperbarui oleh sekretariat. Silakan cek kembali nanti.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {pengurus.map((leader, i) => (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 5) * 0.08 }}
                className="overflow-hidden rounded-[1.5rem] border border-gold-400/15 bg-parlemen-900/80 p-5 shadow-[0_18px_35px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40 hover:shadow-[0_20px_45px_rgba(212,175,55,0.18)]"
              >
                <div className="relative rounded-3xl border border-gold-400/20 bg-gradient-to-br from-parlemen-800 via-parlemen-900 to-black p-5">
                  <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500" />
                  {leader.foto ? (
                    <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border-2 border-gold-400/30 shadow-[0_8px_30px_rgba(212,175,55,0.12)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={leader.foto}
                        alt={leader.nama}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-gold-400/30 bg-parlemen-800 text-2xl font-bold tracking-[0.16em] text-gold-300 shadow-[0_8px_30px_rgba(212,175,55,0.12)]">
                      {getInitials(leader.nama)}
                    </div>
                  )}
                </div>
                <div className="mt-6 text-center">
                  <p className="font-heading text-lg font-semibold text-white">{leader.nama}</p>
                  <p className="mt-2 font-body text-sm text-parlemen-300">{leader.jabatan}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

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
