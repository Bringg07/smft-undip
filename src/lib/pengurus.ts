export interface Pengurus {
  id: number;
  nama: string;
  jabatan: string;
  kategori: string; // Pimpinan | Sekretariat | Bendahara | Badan | Komisi
  urutan: number;
  foto?: string | null;
}

export const pengurusCategories = [
  "Pimpinan",
  "Sekretariat",
  "Bendahara",
  "Badan",
  "Komisi",
];

// Data statis fallback + seed awal (sama dengan kartu pimpinan di beranda).
// Dikelola dari /admin/pengurus bila database aktif.
export const pengurusList: Pengurus[] = [
  { id: 1, nama: "Nur Muhammad Rauf", jabatan: "Ketua Senat", kategori: "Pimpinan", urutan: 1 },
  { id: 2, nama: "Andra Aryasatya Ramadhan", jabatan: "Wakil Ketua 1", kategori: "Pimpinan", urutan: 2 },
  { id: 3, nama: "Kemal Ghifariwarman J.", jabatan: "Wakil Ketua 2", kategori: "Pimpinan", urutan: 3 },
  { id: 4, nama: "Alexsandria Nurintan R.", jabatan: "Sekretaris Jendral", kategori: "Sekretariat", urutan: 4 },
  { id: 5, nama: "Mauriz Cahya Arizati", jabatan: "Sekretaris Eksternal", kategori: "Sekretariat", urutan: 5 },
  { id: 6, nama: "Naura Refa Adalati", jabatan: "Sekretaris Bendahara", kategori: "Sekretariat", urutan: 6 },
  { id: 7, nama: "Omar Rafizki Pradana", jabatan: "Bendahara Eksternal", kategori: "Bendahara", urutan: 7 },
  { id: 8, nama: "Muhammad Farras Ridho", jabatan: "Ketua Badan Advokasi", kategori: "Badan", urutan: 8 },
  { id: 9, nama: "Nadhira Rahma Putri", jabatan: "Ketua Badan Legislasi", kategori: "Badan", urutan: 9 },
  { id: 10, nama: "Calista Aurelia", jabatan: "Ketua Badan Anggaran", kategori: "Badan", urutan: 10 },
  { id: 11, nama: "Zefa Malkalendra Suryo", jabatan: "Ketua BKSAP", kategori: "Badan", urutan: 11 },
  { id: 12, nama: "Khansa Maura Balqis", jabatan: "Ketua Komisi 1", kategori: "Komisi", urutan: 12 },
  { id: 13, nama: "Abdillah Senja Ramadhan", jabatan: "Ketua Komisi 2", kategori: "Komisi", urutan: 13 },
  { id: 14, nama: "Afiq Almu'tashim", jabatan: "Ketua Komisi 3", kategori: "Komisi", urutan: 14 },
  { id: 15, nama: "Sutan Sakti", jabatan: "Ketua Komisi 4", kategori: "Komisi", urutan: 15 },
];
