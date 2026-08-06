import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Berita & Update | Senat Mahasiswa FT UNDIP",
  description: "Informasi terbaru, kegiatan, dan pengumuman resmi dari Senat Mahasiswa Fakultas Teknik Universitas Diponegoro.",
};

export default function BeritaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}