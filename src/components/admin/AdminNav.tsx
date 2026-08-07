"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Newspaper,
  ClipboardList,
  MessageSquareText,
  Users,
  Network,
  Images,
  FileText,
  KeyRound,
  LogOut,
  Home,
  ShieldCheck,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/berita", label: "Berita", icon: Newspaper },
  { href: "/admin/program-kerja", label: "Program", icon: ClipboardList },
  { href: "/admin/aspirasi", label: "Aspirasi", icon: MessageSquareText },
  { href: "/admin/pengurus", label: "Pengurus", icon: Users },
  { href: "/admin/struktur", label: "Struktur", icon: Network },
  { href: "/admin/galeri", label: "Galeri", icon: Images },
  { href: "/admin/dokumen", label: "Dokumen", icon: FileText },
  { href: "/admin/pengaturan", label: "Pengaturan", icon: KeyRound },
];

export default function AdminNav({ email }: { email?: string | null }) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-gold-400/20 bg-perlemen-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <Link href="/admin" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10">
            <ShieldCheck size={18} className="text-gold-300" />
          </span>
          <span>
            <span className="block font-heading text-sm tracking-[0.15em] text-white">
              DASHBOARD ADMIN
            </span>
            <span className="block text-[10px] uppercase tracking-[0.25em] text-gold-300">
              SMFT UNDIP
            </span>
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-2">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/admin" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                title={link.label}
                className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-all ${
                  active
                    ? "bg-gold-400 text-perlemen-950"
                    : "border border-gold-400/30 text-gold-300 hover:bg-gold-400/10"
                }`}
              >
                <link.icon size={14} />
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            );
          })}
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-full border border-perlemen-700 px-3 py-2 text-xs text-white/60 transition-colors hover:text-white"
            title="Lihat website"
          >
            <Home size={14} />
            <span className="hidden sm:inline">Website</span>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-1.5 rounded-full border border-rose-400/40 px-3 py-2 text-xs text-rose-300 transition-colors hover:bg-rose-400/10"
            title="Keluar"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </nav>
      </div>
      {email && (
        <p className="border-t border-white/5 px-6 py-1.5 text-center text-[10px] uppercase tracking-[0.3em] text-white/30">
          Masuk sebagai {email}
        </p>
      )}
    </header>
  );
}
