import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout"; // Kita buat wrapper client

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Senat Mahasiswa Fakultas Teknik UNDIP | Kabinet Langkah Karya",
  description:
    "Parlemen Bermakna, Langkah Nyata, Karya Berdampak. Website resmi Senat Mahasiswa Fakultas Teknik Universitas Diponegoro, Kabinet Langkah Karya.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${cinzel.variable} ${cormorant.variable} ${inter.variable}`}>
      <body className="bg-perlemen-950 font-body antialiased" suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}