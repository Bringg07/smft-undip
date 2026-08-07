"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarClock } from "lucide-react";
import type { ProgramKerja } from "@/lib/program-kerja";

const statusStyles: Record<ProgramKerja["status"], string> = {
  Selesai: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  Berjalan: "border-gold-400/40 bg-gold-400/15 text-gold-300",
  Segera: "border-sky-400/30 bg-sky-400/10 text-sky-300",
};

export default function ProgramGrid({ programs }: { programs: ProgramKerja[] }) {
  const categories = ["Semua", ...Array.from(new Set(programs.map((p) => p.category)))];
  const [activeTab, setActiveTab] = useState("Semua");

  const filtered =
    activeTab === "Semua"
      ? programs
      : programs.filter((p) => p.category === activeTab);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`rounded-full border px-5 py-2 font-body text-sm transition-all duration-300 ${
              activeTab === cat
                ? "border-gold-400 bg-gold-400 text-parlemen-900 shadow-[0_0_25px_rgba(212,175,55,0.25)]"
                : "border-gold-400/30 text-gold-300 hover:border-gold-400 hover:bg-gold-400/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center font-body text-white/50">
          Belum ada program kerja pada kategori ini.
        </p>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((p, i) => (
              <motion.div
                key={`${activeTab}-${p.id}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="glass group relative overflow-hidden rounded-[1.75rem] p-7 transition-all duration-300 hover:border-gold-400/50 hover:shadow-gold-sm"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gold-400/10 blur-3xl transition-opacity group-hover:opacity-100" />

                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400">
                    {p.category}
                  </span>
                  <span
                    className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] ${statusStyles[p.status]}`}
                  >
                    {p.status}
                  </span>
                </div>

                <h3 className="mt-4 font-heading text-lg leading-snug text-white transition-colors group-hover:text-gold-300">
                  {p.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-white/60">
                  {p.desc}
                </p>

                {p.periode && (
                  <div className="mt-5 flex items-center gap-1.5 border-t border-gold-400/10 pt-4 text-[11px] uppercase tracking-[0.2em] text-parlemen-400">
                    <CalendarClock size={13} className="text-gold-400" />
                    {p.periode}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
