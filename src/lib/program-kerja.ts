export type ProgramStatus = "Selesai" | "Berjalan" | "Segera";

export interface ProgramKerja {
  id: number;
  title: string;
  category: string;
  status: ProgramStatus;
  desc: string;
  periode?: string;
}

// Data statis sebagai fallback (dipakai bila database belum dikonfigurasi)
// dan sebagai seed awal. Perbarui sesuai program kerja resmi.
export const programs: ProgramKerja[] = [
  { id: 1, title: "Seminar Keilmuan", category: "Komisi 1", status: "Selesai", desc: "Meningkatkan literasi akademik mahasiswa Teknik melalui seminar dan diskusi ilmiah.", periode: "Triwulan II" },
  { id: 2, title: "Pelatihan Advokasi Publik", category: "Komisi 2", status: "Berjalan", desc: "Penguatan kapasitas mahasiswa dalam menyampaikan aspirasi dan advokasi kebijakan.", periode: "Triwulan III" },
  { id: 3, title: "Pengawasan Anggaran ORMAWA", category: "Komisi 3", status: "Berjalan", desc: "Pengawasan penggunaan dana kemahasiswaan agar akuntabel dan transparan.", periode: "Berkala" },
  { id: 4, title: "Audit Kinerja Kelembagaan", category: "Komisi 4", status: "Segera", desc: "Evaluasi berkala kinerja badan dan komisi untuk menjaga kualitas kerja parlemen.", periode: "Triwulan IV" },
  { id: 5, title: "Advokasi UKT & Fasilitas", category: "Badan Advokasi", status: "Berjalan", desc: "Pendampingan terkait keringanan UKT, layanan akademik, dan fasilitas fakultas.", periode: "Sepanjang Tahun" },
  { id: 6, title: "Penyusunan Peraturan Senat", category: "Badan Legislasi", status: "Berjalan", desc: "Perumusan peraturan senat untuk memperkuat tata kelola organisasi kemahasiswaan.", periode: "Triwulan III" },
  { id: 7, title: "Transparansi Anggaran Senat", category: "Badan Anggaran", status: "Berjalan", desc: "Publikasi laporan keuangan dan pengelolaan anggaran yang akuntabel.", periode: "Berkala" },
  { id: 8, title: "Forum Parlemen Mahasiswa Nusantara", category: "Badan BKSAP", status: "Segera", desc: "Kolaborasi dan pertukaran gagasan antar parlemen mahasiswa di Indonesia.", periode: "Triwulan IV" },
  { id: 9, title: "Langkah Nyata", category: "Badan Pengembangan Staff", status: "Berjalan", desc: "Pelatihan soft skill dan kepemimpinan untuk seluruh staf senat.", periode: "Triwulan III" },
  { id: 10, title: "Klinik Legislasi Mahasiswa", category: "Komisi 1", status: "Selesai", desc: "Pendampingan penyusunan proposal program bagi HMD dan UPK.", periode: "Triwulan II" },
];

export const programCategories = [
  "Semua",
  "Komisi 1",
  "Komisi 2",
  "Komisi 3",
  "Komisi 4",
  "Badan Advokasi",
  "Badan Legislasi",
  "Badan Anggaran",
  "Badan BKSAP",
  "Badan Pengembangan Staff",
];
