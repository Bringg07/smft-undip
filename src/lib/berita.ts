export interface Berita {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  author: string;
  content: string[];
  image?: string | null;
}

// Data berita SMFT UNDIP — silakan perbarui konten di sini sesuai rilis resmi.
export const articles: Berita[] = [
  {
    id: 1,
    title: "Pelantikan Pengurus Baru Senat Mahasiswa",
    date: "25 Juli 2026",
    category: "Berita Utama",
    excerpt:
      "Kabinet Langkah Karya periode 2026/2027 resmi dilantik di Aula Fakultas Teknik, Sabtu (25/7).",
    author: "Divisi Humas SMFT",
    content: [
      "Pelantikan pengurus Senat Mahasiswa Fakultas Teknik UNDIP periode 2026/2027 berlangsung di Aula Fakultas Teknik pada Jumat, 25 Juli 2026. Hadir jajaran dekanat, perwakilan BEM FT, lima Unit Pengembangan Keilmuan, dan dua belas Himpunan Mahasiswa Departemen.",
      "Ketua Senat terpilih membacakan ikrar di hadapan para senator dan tamu undangan. Usai prosesi, rangkaian acara dilanjutkan dengan pemaparan program kerja kabinet — mulai dari penguatan kapasitas anggota, keterbukaan informasi publik, hingga penguatan sinergi dengan seluruh ORMAWA di lingkungan fakultas.",
      "Foto bersama dan ramah tamah menutup acara. Dokumentasi lengkap dapat dilihat di halaman galeri website SMFT UNDIP.",
    ],
  },
  {
    id: 2,
    title: "Dialog Terbuka: Aspirasi Mahasiswa Teknik",
    date: "20 Juli 2026",
    category: "Kegiatan",
    excerpt:
      "Sekitar 60 mahasiswa menyuarakan soal fasilitas lab dan aksesibilitas ruang kuliah dalam dialog terbuka bersama birokrasi fakultas.",
    author: "Badan Advokasi",
    content: [
      "Dialog Terbuka bertajuk \u201cSuara Mahasiswa, Langkah Nyata\u201d berlangsung dua jam di Ruang Serbaguna Gedung Dekanat pada Senin, 20 Juli 2026. Acara dihadiri sekitar 60 mahasiswa dari berbagai departemen.",
      "Isu yang mengemuka antara lain kondisi sarana laboratorium, aksesibilitas ruang kuliah, dan transparansi penggunaan dana kemahasiswaan. Perwakilan fakultas mencatat seluruh masukan dan berjanji menindaklanjutinya melalui mekanisme yang ada.",
      "Badan Advokasi akan memantau tindak lanjut tersebut dan melaporkan perkembangannya secara berkala. Aspirasi juga tetap dapat disampaikan lewat form di website ini atau langsung kepada senator di komisi masing-masing.",
    ],
  },
  {
    id: 3,
    title: "Penerimaan Staf Ahli Gelombang 2",
    date: "15 Juli 2026",
    category: "Pengumuman",
    excerpt:
      "Kesempatan bagi mahasiswa Teknik aktif untuk bergabung sebagai staf ahli di lima badan dan empat komisi.",
    author: "Badan Pengembangan Staff",
    content: [
      "Badan Pengembangan Staff membuka pendaftaran Staf Ahli gelombang kedua untuk periode 2026/2027. Kuota terbatas; pendaftaran berjalan mulai 15 Juli 2026 hingga kuota terpenuhi.",
      "Staf ahli ditempatkan sesuai minat dan kompetensi — mulai dari Badan Legislasi, Badan Anggaran, Badan Advokasi, Badan BKSAP, hingga keempat komisi. Seluruh peserta mendapat pembekalan dan pendampingan selama masa kepengurusan.",
      "Tautan pendaftaran dibagikan melalui akun Instagram @smftundip. Pertanyaan lebih lanjut dapat disampaikan langsung ke Badan Pengembangan Staff.",
    ],
  },
  {
    id: 4,
    title: "Sosialisasi Rancangan Peraturan Senat tentang Etika Organisasi",
    date: "8 Juli 2026",
    category: "Legislasi",
    excerpt:
      "Badan Legislasi menjaring masukan dari seluruh ORMAWA sebelum rancangan peraturan etika organisasi dibahas di rapat paripurna.",
    author: "Badan Legislasi",
    content: [
      "Rancangan Peraturan Senat tentang Etika Organisasi Kemahasiswaan mulai disosialisasikan kepada seluruh ORMAWA di lingkungan Fakultas Teknik pada Rabu, 8 Juli 2026.",
      "Badan Legislasi membuka sesi masukan secara langsung maupun tertulis selama dua pekan. Usulan yang masuk akan dibahas dalam rapat paripurna sebelum dokumen disahkan.",
      "Rancangan ini dimaksudkan sebagai landasan bersama dalam menjaga integritas dan profesionalisme tata kelola organisasi. Masukan dari HMD, UPK, dan BEM FT sangat menentukan arah final dokumen tersebut.",
    ],
  },
  {
    id: 5,
    title: "SMFT UNDIP Gelar Rapat Paripurna Perdana",
    date: "1 Juli 2026",
    category: "Berita Utama",
    excerpt:
      "Rapat paripurna perdana menetapkan program kerja tahunan dan mekanisme kerja antar badan serta komisi.",
    author: "Divisi Humas SMFT",
    content: [
      "Rapat Paripurna perdana Kabinet Langkah Karya digelar di Ruang Sidang Senat pada 1 Juli 2026, dihadiri seluruh senator, pimpinan badan, dan ketua komisi.",
      "Agenda rapat meliputi penetapan program kerja tahunan, pembentukan panitia kerja, dan penyesuaian mekanisme kerja antar badan dan komisi. Seluruh keputusan diambil secara demokratis dan mengikat semua jajaran.",
      "Rapat berikutnya dijadwalkan setiap awal bulan dan terbuka untuk diikuti para staf ahli.",
    ],
  },
  {
    id: 6,
    title: "Advokasi UKT: Pendampingan Pengajuan Keringanan Biaya",
    date: "25 Juni 2026",
    category: "Advokasi",
    excerpt:
      "Badan Advokasi membuka layanan pendampingan bagi mahasiswa yang mengurus keringanan UKT dan fasilitas kampus.",
    author: "Badan Advokasi",
    content: [
      "Badan Advokasi Senat Mahasiswa Fakultas Teknik membuka layanan pendampingan pengajuan keringanan Uang Kuliah Tunggal (UKT). Layanan berjalan setiap pekan di sekretariat senat atau melalui janji temu daring.",
      "Tim advokasi membantu proses administrasi dan memberikan konsultasi, serta memastikan hak mahasiswa terpenuhi sesuai ketentuan yang berlaku.",
      "Pendaftaran layanan dapat dilakukan melalui form aspirasi di website ini. Seluruh permohonan bersifat rahasia dan ditangani langsung oleh tim advokasi.",
    ],
  },
];
