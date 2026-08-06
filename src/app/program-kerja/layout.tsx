import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Program Kerja | Senat Mahasiswa FT UNDIP",
  description: "Daftar program kerja, agenda kegiatan, dan status progress dari Komisi serta Badan di bawah naungan Senat Mahasiswa Fakultas Teknik UNDIP.",
  openGraph: {
    title: "Program Kerja SMFT UNDIP",
    description: "Lihat daftar program kerja dan pergerakan Senat Mahasiswa FT UNDIP.",
    siteName: "SMFT UNDIP",
  },
};

export default function ProgramKerjaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}