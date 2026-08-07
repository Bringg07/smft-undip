import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Perkiraan ukuran byte dari sebuah data URL (bagian base64).
 * Dipakai untuk membatasi ukuran upload di sisi server.
 */
export function dataUrlByteSize(dataUrl: string): number {
  const idx = dataUrl.indexOf(",");
  const b64 = idx === -1 ? dataUrl : dataUrl.slice(idx + 1);
  const padding = b64.endsWith("==") ? 2 : b64.endsWith("=") ? 1 : 0;
  return Math.floor((b64.length * 3) / 4) - padding;
}
