"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { strukturUnits } from "@/lib/struktur";
import type { AnggotaStruktur } from "@/lib/struktur";

const getInitials = (name: string) => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const getRoleBadgeClass = (role: string) => {
  switch (role) {
    case "Senator":
      return "border-gold-400/40 bg-gold-400/15 text-gold-300";
    case "Staff Ahli":
      return "border-perlemen-400/30 bg-perlemen-400/10 text-perlemen-300";
    default:
      return "border-gold-400/20 bg-gold-400/10 text-gold-300/95";
  }
};

export default function StrukturGrid({ anggota }: { anggota: AnggotaStruktur[] }) {
  const [unit, setUnit] = useState(strukturUnits[0] ?? "Badan BKSAP");
  const currentMembers = anggota.filter((a) => a.unit === unit);

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-3">
        {strukturUnits.map((key) => (
          <button
            key={key}
            onClick={() => setUnit(key)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold tracking-[0.18em] transition-all duration-300 ${
              unit === key
                ? "border-gold-400 bg-gold-400 text-perlemen-950 shadow-[0_0_25px_rgba(212,175,55,0.25)]"
                : "border-gold-400/20 bg-white/5 text-gold-400 hover:border-gold-400 hover:bg-gold-400/10"
            }`}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-center gap-3 text-[11px] uppercase tracking-[0.3em] text-perlemen-400">
        <span className="rounded-full border border-gold-400/30 bg-gold-400/10 px-3 py-1 text-gold-300">
          Senator
        </span>
        <span className="rounded-full border border-perlemen-400/30 bg-perlemen-400/10 px-3 py-1 text-perlemen-300">
          Staff Ahli
        </span>
      </div>

      {currentMembers.length === 0 ? (
        <p className="py-16 text-center font-body text-white/50">
          Belum ada anggota pada unit ini.
        </p>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={unit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
          >
            {currentMembers.map((person, i) => (
              <motion.div
                key={`${unit}-${person.id}-${person.nama}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.25 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group relative overflow-hidden rounded-[1.45rem] border border-gold-400/20 bg-gradient-to-br from-perlemen-900 via-perlemen-900 to-black p-5 shadow-[0_18px_55px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/60 hover:shadow-[0_0_35px_rgba(212,175,55,0.22)]"
              >
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500" />
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold-400/10 blur-3xl" />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gold-400/10 to-transparent" />
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-gold-400/30 bg-gradient-to-br from-gold-400/20 to-perlemen-800 text-sm font-bold tracking-[0.2em] text-gold-300">
                    {getInitials(person.nama)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold text-white">{person.nama}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.24em] ${getRoleBadgeClass(person.peran)}`}
                      >
                        {person.peran}
                      </span>
                      {person.peran === "Senator" && (
                        <span className="text-[10px] uppercase tracking-[0.24em] text-gold-400/70">
                          Leadership
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between text-[11px] text-perlemen-300">
                  <span className="rounded-full border border-gold-400/20 bg-gold-400/10 px-2.5 py-1 font-medium tracking-[0.18em] text-gold-300/95">
                    {person.unit}
                  </span>
                  <span className="rounded-full bg-white/5 px-2.5 py-1 text-perlemen-400 transition-colors group-hover:text-gold-300">
                    #{i + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
