import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gold-400/15 bg-perlemen-950 py-14">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          
          {/* Bagian Logo Footer */}
          <div className="flex items-center justify-center gap-4">
            <Image
              src="/senat.png"
              alt="Logo Senat"
              width={60}
              height={60}
              className="object-contain"
            />
            <Image
              src="/parlemen.png"
              alt="Logo Kabinet"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>

          <div>
            <p className="font-heading text-sm tracking-[0.25em] text-gold-300">
              SENAT MAHASISWA FAKULTAS TEKNIK UNDIP
            </p>
            <p className="mt-1 font-body text-xs text-white/50">Kabinet Langkah Karya</p>
          </div>

          <div className="flex gap-5 text-white/60">
            <a href="mailto:smft@undip.ac.id" aria-label="Email" className="hover:text-gold-300">
              <Mail size={18} />
            </a>
            <a href="https://www.instagram.com/smftundip/" aria-label="Instagram" className="hover:text-gold-300">
              <Instagram size={18} />
            </a>
            <a href="https://wa.me/6280000000000" aria-label="WhatsApp" className="hover:text-gold-300">
              <Phone size={18} />
            </a>
          </div>

          <div className="flex items-center gap-2 font-body text-xs text-white/40">
            <MapPin size={14} />
            <span>Fakultas Teknik, Universitas Diponegoro, Semarang</span>
          </div>

          <div className="divider-gold w-full max-w-xs" />

          <p className="font-body text-xs text-white/40">
            © {new Date().getFullYear()} Senat Mahasiswa Fakultas Teknik Universitas Diponegoro.
            Seluruh hak cipta dilindungi.
          </p>

          <Link
            href="/admin"
            className="font-body text-[11px] uppercase tracking-[0.25em] text-white/30 transition-colors hover:text-gold-300"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}