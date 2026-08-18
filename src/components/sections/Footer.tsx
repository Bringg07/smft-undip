import { Instagram, Mail, MapPin, Phone, ArrowUpRight, Music2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/berita", label: "Berita" },
  { href: "/program-kerja", label: "Program Kerja" },
  { href: "/struktur-organisasi", label: "Struktur Organisasi" },
  { href: "/galeri", label: "Galeri" },
  { href: "/dokumen", label: "Dokumen" },
  { href: "/kontak", label: "Kontak" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gold-400/15 bg-parlemen-950 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Identitas */}
          <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
            <div className="flex items-center justify-center gap-4">
              <Image
                src="/senat.png"
                alt="Logo Senat"
                width={56}
                height={56}
                className="object-contain"
              />
              <Image
                src="/parlemen.png"
                alt="Logo Kabinet"
                width={56}
                height={56}
                className="object-contain"
              />
            </div>
            <div>
              <p className="font-heading text-sm tracking-[0.25em] text-gold-300">
                SENAT MAHASISWA FAKULTAS TEKNIK UNDIP
              </p>
              <p className="mt-1 font-body text-xs text-white/50">Kabinet Langkah Karya</p>
            </div>
            <div className="flex items-center gap-2 font-body text-xs text-white/40">
              <MapPin size={14} />
              <span>Fakultas Teknik, Universitas Diponegoro, Semarang</span>
            </div>
          </div>

          {/* Navigasi */}
          <div className="text-center md:text-left">
            <p className="font-heading text-xs uppercase tracking-[0.3em] text-gold-300">
              Navigasi
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 font-body text-sm text-white/60 transition-colors hover:text-gold-300"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak & Sosmed */}
          <div className="text-center md:text-left">
            <p className="font-heading text-xs uppercase tracking-[0.3em] text-gold-300">
              Hubungi Kami
            </p>
            <ul className="mt-4 space-y-2.5 font-body text-sm text-white/60">
              <li>
                <a href="mailto:smfakultasteknik@gmail.com" className="inline-flex items-center gap-2 transition-colors hover:text-gold-300">
                  <Mail size={14} /> smfakultasteknik@gmail.com
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/smftundip/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-gold-300">
                  <Instagram size={14} /> @smftundip
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@senat.ft.undip" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-gold-300">
                  <Music2 size={14} /> @senat.ft.undip
                </a>
              </li>
              <li>
                <a href="https://wa.me/628383443886" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-gold-300">
                  <Phone size={14} /> +62 838-3443-886
                </a>
              </li>
            </ul>
            <div className="mt-6 flex justify-center gap-5 text-white/60 md:justify-start">
              <a href="mailto:smfakultasteknik@gmail.com" aria-label="Email" className="transition-colors hover:text-gold-300">
                <Mail size={18} />
              </a>
              <a href="https://www.instagram.com/smftundip/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-colors hover:text-gold-300">
                <Instagram size={18} />
              </a>
              <a href="https://www.tiktok.com/@senat.ft.undip" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="transition-colors hover:text-gold-300">
                <Music2 size={18} />
              </a>
              <a href="https://wa.me/628383443886" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="transition-colors hover:text-gold-300">
                <Phone size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="divider-gold my-8 w-full max-w-xs mx-auto md:mx-0" />

        <p className="text-justify font-body text-xs text-white/40">
          © {new Date().getFullYear()} Senat Mahasiswa Fakultas Teknik Universitas Diponegoro.
          Hak cipta dilindungi undang-undang.
        </p>
      </div>
    </footer>
  );
}
