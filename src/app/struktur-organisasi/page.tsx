"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";

// Data Lengkap Gabungan (Senator + Staff Ahli)
// Catatan: Keterangan rangkap jabatan (ex: - Komisi X) ditambahkan untuk Senator sesuai PDF.
const STRUKTUR = {
  "Badan BKSAP": [
    { name: "Natania Nazwa Areka", role: "Senator" },
    { name: "Ratu Dealova Valenci", role: "Senator" },
    { name: "Benedictus Ryan Aretha Sudaryunanto", role: "Senator" },
    { name: "Salman Daffa Alfarizi", role: "Senator" },
    { name: "Arkan Nafi Nurcahyo", role: "Senator" },
    { name: "Ranayla Thalita Ayu Danieardhy", role: "Staff Ahli" },
    { name: "Ziddan Aly", role: "Staff Ahli" },
    { name: "Muhammad Naufal Khanief Abdillah", role: "Staff Ahli" },
    { name: "Rayyan Ardhi Wardhana", role: "Staff Ahli" },
    { name: "Rajwa Bahajata Nafaratrie Isra", role: "Staff Ahli" },
    { name: "Dwi Intan Septiani", role: "Staff Ahli" }
  ],
  "Badan Advokasi": [
    { name: "Novia Nur Aini", role: "Senator" },
    { name: "Paquita Ratu Saffana", role: "Senator" },
    { name: "Hendra Pramadhi", role: "Senator" },
    { name: "Dafa Briangga", role: "Senator" },
    { name: "Calista Aurelia", role: "Staff Ahli" },
    { name: "Iswatun Nurfiana", role: "Staff Ahli" },
    { name: "Raihan Islamy Setiabudi", role: "Staff Ahli" },
    { name: "Alizaki Santoso", role: "Staff Ahli" },
    { name: "Athiyah Ramadhani", role: "Staff Ahli" }
  ],
  "Badan Legislasi": [
    { name: "Bima Cakti Yudhanegara", role: "Senator" },
    { name: "Tabita Grizelda Brali Hutasoit", role: "Senator" },
    { name: "Alul Fahmi Akbar", role: "Senator" },
    { name: "Suryanudin Ihsan", role: "Staff Ahli" },
    { name: "Kayla Azzahra", role: "Staff Ahli" },
    { name: "Muhammad Rizqullah Fairuzein", role: "Staff Ahli" },
    { name: "Riadi Yuniar Hermansyah", role: "Staff Ahli" },
    { name: "Muhammad Alfis Al Khaririy", role: "Staff Ahli" }
  ],
  "Badan Anggaran": [
    { name: "Nathaniel Bramantya Marsha Aksatriya", role: "Senator" },
    { name: "Raihan Khairull Khashib", role: "Senator" },
    { name: "Anisa Mufidah", role: "Senator" },
    { name: "Anindhiyo Ghani Kurniawan", role: "Senator" },
    { name: "Evi Kusuma Wardani", role: "Senator" },
    { name: "Muhammad Irsyad Novradi", role: "Staff Ahli" },
    { name: "Dora Oktaviana BR Hutasoit", role: "Staff Ahli" },
    { name: "Siti Khadijah Aulia Robby", role: "Staff Ahli" },
    { name: "Aqela Sabrina Azzahra", role: "Staff Ahli" },
    { name: "Zahra As Syifa Adhwiyan", role: "Staff Ahli" }
  ],
  "Badan Pengembangan Staff": [
    { name: "Halisya Keiza Alifia Elandi", role: "Senator" }
  ],
  "Badan Kehormatan Senator": [
    { name: "Cristian Duta Dungdungon Sihotang", role: "Senator" }
  ],
  "Komisi 1": [
    { name: "Halisya Keiza Alifia Elandi", role: "Senator" },
    { name: "Novia Nur Aini", role: "Senator" },
    { name: "Nathaniel Bramantya Marsha Aksatriya", role: "Senator" },
    { name: "Salman Daffa Alfarizi", role: "Senator" },
    { name: "Alul Fahmi Akbar", role: "Senator" },
    { name: "Nailah Syarifatul Faiqoh", role: "Staff Ahli" },
    { name: "A'idah Inas Labibah", role: "Staff Ahli" },
    { name: "Hamdan Yafi Niam", role: "Staff Ahli" },
    { name: "Nadia Rahma Azizah", role: "Staff Ahli" },
    { name: "Rieski Riestianti", role: "Staff Ahli" }
  ],
  "Komisi 2": [
    { name: "Benedictus Ryan Aretha Sudaryunanto", role: "Senator" },
    { name: "Raihan Khairull Khashib", role: "Senator" },
    { name: "Tabita Grizelda Brali Hutasoit", role: "Senator" },
    { name: "Anindhiyo Ghani Kurniawan", role: "Senator" },
    { name: "Dafa Briangga", role: "Senator" },
    { name: "Dennise Ivena Novelitha", role: "Staff Ahli" },
    { name: "Alifia Elfara", role: "Staff Ahli" },
    { name: "Rezuel Marpaung", role: "Staff Ahli" },
    { name: "Brello Aryaputra Kencana", role: "Staff Ahli" },
    { name: "Ririn Indah Cahyani", role: "Staff Ahli" },
    { name: "Muhammad Fakhri Rafif", role: "Staff Ahli" }
  ],
  "Komisi 3": [
    { name: "Bima Cakti Yudhanegara", role: "Senator" },
    { name: "Natania Nazwa Areka", role: "Senator" },
    { name: "Ratu Dealova Valenci", role: "Senator" },
    { name: "Paquita Ratu Saffana", role: "Senator" },
    { name: "Evi Kusuma Wardani", role: "Senator" },
    { name: "Khanifiatus Istianah", role: "Staff Ahli" },
    { name: "Rifa Puspitasari", role: "Staff Ahli" },
    { name: "Athiya Najwa Mazida", role: "Staff Ahli" },
    { name: "Revo Satrio Aji", role: "Staff Ahli" },
    { name: "Wildah Rizka Vania Zaen", role: "Staff Ahli" }
  ],
  "Komisi 4": [
    { name: "Anisa Mufidah", role: "Senator" },
    { name: "Hendra Pramadhi", role: "Senator" },
    { name: "Cristian Duta Dungdungon Sihotang", role: "Senator" },
    { name: "David Felipe Barrichello", role: "Staff Ahli" },
    { name: "Rahma Mutiara Trisyani", role: "Staff Ahli" },
    { name: "Zahra Amalia Nirmala Putri", role: "Staff Ahli" },
    { name: "Nayla Maulidina Dhiahana Khairunnisa", role: "Staff Ahli" },
    { name: "Khoirotun Hisan", role: "Staff Ahli" },
    { name: "Dainty Rahma Suny", role: "Staff Ahli" }
  ]
};

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

export default function StrukturOrganisasi() {
  const [unit, setUnit] = useState("Badan BKSAP");
  const currentMembers = STRUKTUR[unit as keyof typeof STRUKTUR] ?? [];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.15),_transparent_35%),linear-gradient(135deg,_#09090b,_#18181b_55%,_#27272a)] pt-32 pb-20">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative mb-10 overflow-hidden rounded-[2rem] border border-gold-400/25 bg-black/25 px-8 py-10 text-center shadow-[0_25px_90px_rgba(0,0,0,0.4)] backdrop-blur-md sm:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.2),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.08),_transparent_25%)]" />
          <div className="absolute left-1/2 top-0 h-24 w-24 -translate-x-1/2 rounded-full bg-gold-400/15 blur-3xl" />
          <div className="relative">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.45em] text-gold-400/95">
              Profil Kepengurusan
            </p>
            <h1 className="font-heading text-4xl font-black tracking-[0.02em] text-white sm:text-5xl">
              Struktur Organisasi
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-perlemen-300 sm:text-base">
              Susunan kepengurusan disajikan dengan nuansa formal, berkelas, dan simetris seperti profil dewan eksekutif.
            </p>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {Object.keys(STRUKTUR).map((key) => (
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
                key={`${unit}-${person.name}`}
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
                    {getInitials(person.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-semibold text-white">{person.name}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.24em] ${getRoleBadgeClass(person.role)}`}>
                        {person.role}
                      </span>
                      {person.role === "Senator" && (
                        <span className="text-[10px] uppercase tracking-[0.24em] text-gold-400/70">
                          Leadership
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between text-[11px] text-perlemen-300">
                  <span className="rounded-full border border-gold-400/20 bg-gold-400/10 px-2.5 py-1 font-medium tracking-[0.18em] text-gold-300/95">
                    {unit}
                  </span>
                  <span className="rounded-full bg-white/5 px-2.5 py-1 text-perlemen-400 transition-colors group-hover:text-gold-300">
                    #{i + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </main>
  );
}