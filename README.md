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

## Dashboard Admin & Database (Fase 2)

Website kini dilengkapi **dashboard admin** untuk mengelola berita dan program kerja
langsung dari browser, tanpa menyentuh kode.

### Cara setup (sekali saja)

1. Buat database PostgreSQL gratis — pilih salah satu:
   - **[Neon](https://neon.tech)** → Connection Details → Prisma, isi `DATABASE_URL`.
   - **[Supabase](https://supabase.com)** → Project Settings → Database → Connection
     string: salin **Transaction** (port 6543) ke `DATABASE_URL` (tambah
     `?pgbouncer=true&connection_limit=1`), dan **Direct** (port 5432) ke `DIRECT_URL`.
2. Isi `DATABASE_URL`, `DIRECT_URL` (jika ada), `AUTH_SECRET`, `ADMIN_EMAIL`,
   `ADMIN_PASSWORD` di file `.env` (lihat `.env.example`).
3. Terapkan skema database:
   ```bash
   npm run db:migrate      # prisma migrate deploy
   npm run db:seed         # buat akun admin + data awal
   ```
4. Jalankan website: `npm run dev`, lalu buka `/admin` dan login dengan email/password
   dari `ADMIN_EMAIL`/`ADMIN_PASSWORD`.

### Struktur fitur

- `/admin` — dashboard (ringkasan konten)
- `/admin/berita` — tambah / ubah / hapus berita
- `/admin/program-kerja` — tambah / ubah / hapus program kerja
- API: `/api/berita`, `/api/program-kerja` (GET publik, mutasi hanya untuk admin)
- Auth: NextAuth v5 (credentials) + bcrypt; halaman `/admin` dilindungi middleware
- Data layer di `src/lib/data.ts` — otomatis fallback ke data statis bila database
  belum dikonfigurasi, jadi website tetap bisa di-build/ditampilkan tanpa DB.

### Perintah database

```bash
npm run db:generate   # generate Prisma Client
npm run db:migrate    # terapkan migration ke database
npm run db:seed       # isi data awal
npm run db:studio     # buka Prisma Studio (UI untuk lihat/edit data)
```

## Status pengerjaan

✅ Selesai (sudah di-build & di-lint, siap jalan):
- Landing page lengkap sesuai brief (Hero, Tentang, Visi & Misi, Filosofi Kabinet,
  Nilai-Nilai, Filosofi Logo, Footer)
- Design system Tailwind (warna, tipografi, shadow, animasi)
- Navbar responsif + mobile menu
- Halaman Struktur Organisasi, Program Kerja, Berita (index + detail), **Galeri**
  (masonry + lightbox), **Dokumen** (kategori + unduh), **Kontak** (maps + sosmed)
- Dashboard admin: CRUD berita & program kerja, **kelola aspirasi** (baca/tandai/hapus),
  **kelola pengurus** (foto + urutan), **galeri** (upload/hapus), **dokumen** (upload/hapus),
  **ganti password**, pencarian data, notifikasi toast
- **Upload file** langsung (gambar dikompresi otomatis di browser, PDF maks 5 MB) —
  disimpan sebagai data URL di PostgreSQL; untuk skala besar disarankan pindah ke
  Supabase Storage / Cloudinary
- **Aspirasi mahasiswa** tersimpan di database dan dikelola dari panel admin
- Keamanan: rate-limit login (anti brute-force) & anti-spam pada form aspirasi
- **PWA**: manifest + service worker (bisa di-install & offline dasar)
- SEO (metadata, OpenGraph, sitemap, robots)

🚧 Ide pengembangan berikutnya:
- Pindah penyimpanan file ke layanan eksternal (Supabase Storage / Cloudinary)
- Deployment config untuk Vercel
- Multi admin (tambah/kelola akun dari dashboard)

## Catatan font

`layout.tsx` mengambil font Cinzel, Cormorant Garamond, dan Inter dari Google Fonts saat
build — pastikan koneksi internet aktif saat `npm run build` / `npm run dev` pertama kali
(font di-cache otomatis oleh `next/font`, jadi hanya perlu koneksi di awal).
