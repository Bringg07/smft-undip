"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import ScrollToTop from "@/components/ui/ScrollToTop";
import LoadingScreen from "@/components/ui/LoadingScreen"; // Import komponen baru

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Loading singkat hanya saat pertama kali buka, agar tidak membuat pengunjung menunggu
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  // Registrasi Service Worker (PWA) — hanya di produksi agar tidak mengganggu development
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <NextTopLoader color="#d4af37" height={3} showSpinner={false} />
            {children}
            <ScrollToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}