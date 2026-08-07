/**
 * Utilitas upload sisi-klien.
 * Gambar dikompresi lewat <canvas> sebelum disimpan agar ukurannya kecil
 * (data URL tersimpan di PostgreSQL). File non-gambar (PDF dsb.) dibaca
 * langsung sebagai data URL tanpa kompresi.
 */

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error ?? new Error("Gagal membaca file"));
    reader.readAsDataURL(file);
  });
}

/** Kompres gambar (JPEG) agar lebar/tinggi maksimal `maxSize` px. */
export function compressImage(
  dataUrl: string,
  maxSize = 1100,
  quality = 0.72
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas tidak didukung di browser ini."));
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => reject(new Error("File yang dipilih bukan gambar yang valid."));
    img.src = dataUrl;
  });
}

/**
 * Ubah File terpilih menjadi data URL siap simpan.
 * - Gambar → dikompresi (JPEG), maks. `maxSize` px.
 * - Non-gambar (PDF, dsb.) → dibaca apa adanya.
 */
export async function fileToStoredDataUrl(
  file: File,
  maxSize = 1100,
  quality = 0.72
): Promise<string> {
  const raw = await fileToDataUrl(file);
  if (!file.type.startsWith("image/")) return raw;
  try {
    return await compressImage(raw, maxSize, quality);
  } catch {
    return raw; // gagal kompresi → pakai file asli
  }
}

/** Format tanggal untuk tampilan (mis. "7 Agustus 2026, 14:30"). */
export function formatTanggalWaktu(value: string | Date): string {
  const d = typeof value === "string" ? new Date(value) : value;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
