"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";

// Waktu idle sebelum sesi dianggap "menganggur" (15 menit)
const IDLE_LIMIT_MS = 15 * 60 * 1000;
// Hitung mundur peringatan sebelum logout otomatis (60 detik)
const WARNING_SECONDS = 60;

const ACTIVITY_EVENTS: (keyof WindowEventMap)[] = [
  "mousemove",
  "mousedown",
  "keydown",
  "touchstart",
  "wheel",
  "scroll",
];

export default function SessionTimeout() {
  const [warned, setWarned] = useState(false);
  const [countdown, setCountdown] = useState(WARNING_SECONDS);
  const idleTimer = useRef<number | null>(null);
  const warnedRef = useRef(false);

  // Setel ulang timer idle; jika ada aktivitas saat peringatan, batalkan logout.
  const resetIdle = useCallback(() => {
    if (warnedRef.current) {
      warnedRef.current = false;
      setWarned(false);
      setCountdown(WARNING_SECONDS);
    }
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => {
      warnedRef.current = true;
      setWarned(true);
    }, IDLE_LIMIT_MS);
  }, []);

  // Pasang pendengar aktivitas di seluruh halaman admin
  useEffect(() => {
    ACTIVITY_EVENTS.forEach((event) =>
      window.addEventListener(event, resetIdle, { passive: true })
    );
    resetIdle();
    return () => {
      ACTIVITY_EVENTS.forEach((event) =>
        window.removeEventListener(event, resetIdle)
      );
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, [resetIdle]);

  // Logout resmi via next-auth (menangani CSRF & menghapus cookie sesi)
  const doSignOut = useCallback(() => {
    signOut({ callbackUrl: "/admin/login", redirect: true });
  }, []);

  // Hitung mundur 1 detik selama peringatan tampil
  useEffect(() => {
    if (!warned) return;

    const interval = window.setInterval(() => {
      setCountdown((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [warned]);

  // Saat hitung mundur habis → logout otomatis
  useEffect(() => {
    if (warned && countdown === 0) {
      doSignOut();
    }
  }, [warned, countdown, doSignOut]);

  if (!warned) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Peringatan sesi berakhir"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-parlemen-950/80 p-6 backdrop-blur-sm"
    >
      <div className="glass w-full max-w-md rounded-[1.75rem] p-8 text-center md:p-10">
        <p className="font-heading text-xs uppercase tracking-[0.3em] text-gold-300">
          Sesi Akan Berakhir
        </p>
        <h2 className="mt-3 font-heading text-2xl text-white">
          Anda Tidak Aktif
        </h2>
        <p className="mt-3 font-body text-sm leading-relaxed text-white/70">
          Sesi akan berakhir otomatis dalam{" "}
          <span className="font-bold text-gold-300">{countdown} detik</span>{" "}
          karena tidak ada aktivitas. Gerakkan mouse atau ketik untuk tetap
          masuk.
        </p>
        <button
          onClick={resetIdle}
          className="mt-6 rounded-full bg-gold-400 px-8 py-3 font-body text-sm font-medium text-parlemen-950 transition-all hover:bg-gold-300"
        >
          Tetap Masuk
        </button>
      </div>
    </div>
  );
}
