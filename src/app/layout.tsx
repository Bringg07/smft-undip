import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout"; // Kita buat wrapper client
import { SITE_URL } from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Senat Mahasiswa Fakultas Teknik UNDIP | Kabinet Langkah Karya",
    template: "%s | SMFT UNDIP",
  },
  description:
    "Parlemen Bermakna, Langkah Nyata, Karya Berdampak. Website resmi Senat Mahasiswa Fakultas Teknik Universitas Diponegoro, Kabinet Langkah Karya.",
  manifest: "/manifest.json",
  applicationName: "SMFT UNDIP",
  keywords: [
    "SMFT UNDIP",
    "Senat Mahasiswa Fakultas Teknik",
    "Universitas Diponegoro",
    "Kabinet Langkah Karya",
    "parlemen mahasiswa",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "SMFT UNDIP",
    title: "Senat Mahasiswa Fakultas Teknik UNDIP | Kabinet Langkah Karya",
    description:
      "Parlemen Bermakna, Langkah Nyata, Karya Berdampak. Website resmi Senat Mahasiswa Fakultas Teknik Universitas Diponegoro.",
    images: [
      {
        url: "/parlemen.png",
        width: 512,
        height: 512,
        alt: "Logo SMFT UNDIP",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Senat Mahasiswa Fakultas Teknik UNDIP | Kabinet Langkah Karya",
    description:
      "Parlemen Bermakna, Langkah Nyata, Karya Berdampak.",
    images: ["/parlemen.png"],
  },
  icons: {
    icon: "/senat.png",
    apple: "/senat.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090B",
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