"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GaleriItem {
  id: number;
  judul: string;
  gambar: string;
}

export default function GaleriGrid({ items }: { items: GaleriItem[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i + items.length - 1) % items.length)),
    [items.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length]
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, prev, next]);

  const active = index !== null ? items[index] : null;

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
        {items.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setIndex(i)}
            className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[1.75rem] border border-gold-400/15 transition-all duration-300 hover:border-gold-400/50 hover:shadow-gold-sm"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.gambar}
              alt={item.judul}
              loading="lazy"
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-3 pt-10 text-left">
              <span className="font-heading text-sm text-white">{item.judul}</span>
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
              aria-label="Tutup"
            >
              <X size={20} />
            </button>

            {items.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 md:left-6"
                  aria-label="Sebelumnya"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 md:right-6"
                  aria-label="Berikutnya"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            <motion.figure
              key={active.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="max-h-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.gambar}
                alt={active.judul}
                className="max-h-[78vh] w-auto rounded-xl border border-gold-400/20 object-contain"
              />
              <figcaption className="mt-4 text-center">
                <p className="font-heading text-base text-white">{active.judul}</p>
                <p className="mt-1 font-body text-xs text-white/40">
                  {index !== null ? index + 1 : 0} / {items.length}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
