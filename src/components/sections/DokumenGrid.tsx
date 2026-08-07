"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, FileDown, CalendarClock } from "lucide-react";

interface DokumenItem {
  id: number;
  judul: string;
  kategori: string;
  deskripsi: string | null;
  filename: string | null;
  file: string;
  createdAt: string | Date;
}

export default function DokumenGrid({ items }: { items: DokumenItem[] }) {
  const categories = ["Semua", ...Array.from(new Set(items.map((d) => d.kategori)))];
  const [active, setActive] = useState("Semua");

  const filtered =
    active === "Semua" ? items : items.filter((d) => d.kategori === active);

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full border px-5 py-2 font-body text-sm transition-all duration-300 ${
              active === cat
                ? "border-gold-400 bg-gold-400 text-parlemen-900 shadow-[0_0_25px_rgba(212,175,55,0.25)]"
                : "border-gold-400/30 text-gold-300 hover:border-gold-400 hover:bg-gold-400/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center font-body text-white/50">
          Belum ada dokumen pada kategori ini.
        </p>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid gap-6 md:grid-cols-2"
          >
            {filtered.map((d) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04 }}
                className="glass group flex flex-col rounded-[1.75rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-gold-sm"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-gold-400/30 bg-gold-400/10 text-gold-300 transition-colors group-hover:bg-gold-400/20">
                    <FileText size={26} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="rounded-full border border-gold-400/30 bg-gold-400/10 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-gold-300">
                      {d.kategori}
                    </span>
                    <h2 className="mt-2 font-heading text-lg leading-snug text-white">
                      {d.judul}
                    </h2>
                    {d.deskripsi && (
                      <p className="mt-2 font-body text-sm leading-relaxed text-white/60">
                        {d.deskripsi}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/40">
                      <CalendarClock size={12} className="text-gold-400" />
                      {d.filename ?? "Dokumen resmi"}
                    </div>
                  </div>
                </div>
                <a
                  href={d.file}
                  download={d.filename ?? "dokumen"}
                  className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-bold text-parlemen-950 transition-all hover:bg-gold-300"
                >
                  <FileDown size={15} />
                  Unduh Dokumen
                </a>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
