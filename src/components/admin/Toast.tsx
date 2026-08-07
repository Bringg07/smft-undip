"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastMethods {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

interface ToastContextValue {
  toast: ToastMethods;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast harus dipakai di dalam <ToastProvider>");
  return ctx;
}

const styles: Record<ToastType, { icon: typeof Info; ring: string; iconColor: string }> = {
  success: { icon: CheckCircle2, ring: "border-emerald-400/40", iconColor: "text-emerald-400" },
  error: { icon: XCircle, ring: "border-rose-400/40", iconColor: "text-rose-400" },
  info: { icon: Info, ring: "border-gold-400/40", iconColor: "text-gold-300" },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const push = useCallback((type: ToastType, message: string) => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const value: ToastContextValue = {
    toast: {
      success: useCallback((m: string) => push("success", m), [push]),
      error: useCallback((m: string) => push("error", m), [push]),
      info: useCallback((m: string) => push("info", m), [push]),
    },
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex w-full max-w-sm flex-col gap-3 px-4">
        <AnimatePresence>
          {items.map((item) => {
            const { icon: Icon, ring, iconColor } = styles[item.type];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.22 }}
                className={`pointer-events-auto flex items-start gap-3 rounded-xl border ${ring} bg-perlemen-900/95 p-4 shadow-[0_15px_45px_rgba(0,0,0,0.55)] backdrop-blur-md`}
              >
                <Icon size={18} className={`mt-0.5 shrink-0 ${iconColor}`} />
                <p className="font-body text-sm leading-snug text-white/85">{item.message}</p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
