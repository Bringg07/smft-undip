"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Gunakan Link dari next/link

const links = [
  { label: "Beranda", href: "/#hero" },
  { label: "Tentang", href: "/#tentang" },
  { label: "Struktur", href: "/struktur-organisasi" },
  { label: "Program Kerja", href: "/program-kerja" },
  { label: "Berita", href: "/berita" },
  { label: "Galeri", href: "/galeri" },
  { label: "Dokumen", href: "/dokumen" },
  { label: "Kontak", href: "/kontak" },
  { label: "Aspirasi", href: "/#aspirasi" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "glass shadow-glass py-3" : "bg-transparent py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Link Logo kembali ke Home */}
        <Link href="/#hero" className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/senat.png"
              alt="Logo Senat"
              width={40}
              height={40}
              className="object-contain"
            />
            <Image
              src="/parlemen.png"
              alt="Logo Kabinet"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="leading-tight">
            <p className="font-heading text-xs tracking-[0.2em] text-gold-300">SMFT UNDIP</p>
            <p className="font-body text-[10px] tracking-wide text-white/50">Kabinet Langkah Karya</p>
          </div>
        </Link>

        {/* Menu Navigasi Desktop */}
        <ul className="hidden items-center gap-4 lg:flex xl:gap-5">
          {links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="group relative font-body text-[13px] text-white/70 transition-colors hover:text-gold-300 xl:text-sm"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/#tentang"
          className="hidden rounded-full border border-gold-400/60 bg-gold-400/10 px-5 py-2 font-body text-sm text-gold-200 transition-all hover:bg-gold-400 hover:text-perlemen-900 lg:inline-block"
        >
          Jelajahi Website
        </Link>

        {/* Tombol Mobile */}
        <button
          aria-label="Buka menu"
          className="text-gold-300 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Menu Mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass mx-4 mt-3 overflow-hidden rounded-2xl lg:hidden"
          >
            <ul className="flex flex-col gap-1 p-4">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 font-body text-sm text-white/80 hover:bg-gold-400/10 hover:text-gold-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}