# Senat Mahasiswa Fakultas Teknik UNDIP — Kabinet Langkah Karya

Website resmi SMFT UNDIP. Bagian ini berisi **landing page utuh** (Hero, Tentang, Visi, Misi,
Filosofi Kabinet, Nilai-Nilai, Filosofi Logo, Footer) sesuai identitas Perlemen `#0B1F3A` / Gold
`#D4AF37`, tipografi Cinzel + Cormorant Garamond + Inter, dan animasi Framer Motion.

## Cara menjalankan di VS Code

```bash
npm install
npm run dev
```

Buka http://localhost:3000

Untuk build production:

```bash
npm run build
npm run start
```

## Struktur folder

```
src/
  app/
    layout.tsx      # font Google + metadata
    page.tsx         # merangkai semua section
    globals.css      # noise texture, glass, gold gradient utilities
  components/
    ui/Navbar.tsx
    sections/
      Hero.tsx
      About.tsx
      Vision.tsx
      Mission.tsx
      CabinetPhilosophy.tsx
      Values.tsx
      LogoPhilosophy.tsx
      Footer.tsx
  lib/utils.ts       # helper cn() untuk className
```

## Status pengerjaan

✅ Selesai (sudah di-build & di-lint, siap jalan):
- Landing page lengkap sesuai brief (Hero, Tentang, Visi & Misi, Filosofi Kabinet,
  Nilai-Nilai, Filosofi Logo, Footer)
- Design system Tailwind (warna, tipografi, shadow, animasi)
- Navbar responsif + mobile menu

🚧 Belum dikerjakan (scope-nya besar — akan dibangun bertahap di sesi berikutnya):
- Halaman **Struktur Organisasi** (tree interaktif + search/filter + modal)
- Halaman **Program Kerja** (timeline per kategori & status)
- Halaman **Berita**, **Galeri** (masonry), **Dokumen** (kategori + download PDF)
- Halaman **Aspirasi Mahasiswa** (form + tracking status)
- Halaman **Kontak** (maps, sosmed)
- **Dashboard Admin** dengan NextAuth/Auth.js
- Schema **Prisma + PostgreSQL** untuk seluruh entitas (berita, program kerja, pengurus,
  dokumen, galeri, aspirasi)
- Integrasi upload file (Supabase Storage / Cloudinary)
- Deployment config untuk Vercel

Kenapa dipisah: setiap modul di atas (terutama dashboard admin + database + auth) adalah
proyek tersendiri yang butuh desain skema data, API routes, dan halaman CRUD yang solid.
Menaruh semuanya sekaligus akan menurunkan kualitas kode. Beri tahu modul mana yang mau
dikerjakan lebih dulu, saya lanjutkan dari fondasi ini.

## Catatan font

`layout.tsx` mengambil font Cinzel, Cormorant Garamond, dan Inter dari Google Fonts saat
build — pastikan koneksi internet aktif saat `npm run build` / `npm run dev` pertama kali
(font di-cache otomatis oleh `next/font`, jadi hanya perlu koneksi di awal).
