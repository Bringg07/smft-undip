import type { Metadata } from "next";
import { Mail, MapPin, Phone, Instagram, Clock } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi Senat Mahasiswa Fakultas Teknik Universitas Diponegoro: alamat, email, media sosial, dan lokasi sekretariat.",
};

const kontak = [
  {
    icon: MapPin,
    label: "Alamat",
    value: "Sekretariat Senat Mahasiswa Fakultas Teknik UNDIP, Jl. Prof. Soedarto, Tembalang, Semarang 50275",
    href: "https://maps.google.com/?q=Fakultas+Teknik+Universitas+Diponegoro+Tembalang",
  },
  {
    icon: Mail,
    label: "Email",
    value: "smft@undip.ac.id",
    href: "mailto:smft@undip.ac.id",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@smftundip",
    href: "https://www.instagram.com/smftundip/",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+62 838-3443-886",
    href: "https://wa.me/628383443886",
  },
];

export default function KontakPage() {
  return (
    <main className="min-h-screen bg-parlemen-950">
      <Navbar />
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gold-glow animate-pulse-glow transform-gpu" />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32">
          <div className="mb-14 text-center">
            <p className="font-heading text-xs uppercase tracking-[0.4em] text-gold-300">
              Hubungi Kami
            </p>
            <h1 className="mt-4 font-heading text-4xl text-white md:text-5xl">
              Kontak <span className="text-gold-gradient">SMFT UNDIP</span>
            </h1>
            <div className="divider-gold mx-auto mt-6 w-24" />
            <p className="mx-auto mt-4 max-w-xl font-body text-sm text-white/60 md:text-base">
              Mampir ke sekretariat kami atau hubungi kanal di bawah — tim kami siap
              menampung aspirasi, menjawab pertanyaan, maupun membahas kerja sama.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              {kontak.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="glass group flex items-start gap-4 rounded-[1.75rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-gold-sm"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10 text-gold-300 transition-colors group-hover:bg-gold-400/20">
                    <item.icon size={20} />
                  </span>
                  <div>
                    <p className="font-heading text-xs uppercase tracking-[0.25em] text-gold-300">
                      {item.label}
                    </p>
                    <p className="mt-2 font-body text-sm leading-relaxed text-white/80">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}

              <div className="glass flex items-start gap-4 rounded-[1.75rem] p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10 text-gold-300">
                  <Clock size={20} />
                </span>
                <div>
                  <p className="font-heading text-xs uppercase tracking-[0.25em] text-gold-300">
                    Jam Sekretariat
                  </p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-white/80">
                    Senin – Jumat, 09.00 – 16.00 WIB
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.75rem] border border-gold-400/20">
              <iframe
                title="Lokasi Fakultas Teknik UNDIP"
                src="https://www.google.com/maps?q=Fakultas%20Teknik%20Universitas%20Diponegoro%20Tembalang&z=15&output=embed"
                className="h-full min-h-[420px] w-full grayscale-[30%] contrast-[1.05]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
