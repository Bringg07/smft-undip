export interface Berita {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  author: string;
  content: string[];
}

// Data berita SMFT UNDIP — silakan perbarui konten di sini sesuai rilis resmi.
export const articles: Berita[] = [
  {
    id: 1,
    title: "Pelantikan Pengurus Baru Senat Mahasiswa",
    date: "25 Juli 2026",
    category: "Berita Utama",
    excerpt:
      "Senat Mahasiswa FT UNDIP resmi melantik pengurus periode 2026/2027 dengan semangat baru.",
    author: "Divisi Humas SMFT",
    content: [
      "Semarang — Senat Mahasiswa Fakultas Teknik Universitas Diponegoro resmi melantik jajaran pengurus baru Kabinet Langkah Karya periode 2026/2027. Pelantikan berlangsung khidmat di Aula Fakultas Teknik dengan dihadiri oleh jajaran dekanat, perwakilan organisasi kemahasiswaan, serta tamu undangan dari 12 Himpunan Mahasiswa Departemen.",
      "Dalam sambutannya, Ketua Senat terpilih menegaskan komitmen kabinet untuk menjalankan empat fungsi utama parlemen mahasiswa: legislasi, pengawasan, penganggaran, dan advokasi. “Kami hadir untuk menjadi parlemen yang bermakna, melangkah nyata, dan menghasilkan karya yang berdampak bagi seluruh mahasiswa Fakultas Teknik,” ujarnya.",
      "Setelah prosesi pelantikan, acara dilanjutkan dengan pemaparan program kerja unggulan Kabinet Langkah Karya untuk satu periode ke depan, mencakup penguatan kapasitas anggota, keterbukaan informasi publik, serta penguatan sinergi dengan seluruh ORMAWA di lingkungan Fakultas Teknik.",
    ],
  },
  {
    id: 2,
    title: "Dialog Terbuka: Aspirasi Mahasiswa Teknik",
    date: "20 Juli 2026",
    category: "Kegiatan",
    excerpt:
      "Sesi diskusi interaktif antara mahasiswa dan birokrasi fakultas terkait fasilitas kampus.",
    author: "Badan Advokasi",
    content: [
      "Badan Advokasi Senat Mahasiswa Fakultas Teknik menyelenggarakan Dialog Terbuka bertajuk “Suara Mahasiswa, Langkah Nyata”. Acara ini menjadi ruang bagi mahasiswa untuk menyampaikan aspirasi secara langsung mengenai fasilitas kampus, layanan akademik, dan kesejahteraan mahasiswa.",
      "Dialog yang berlangsung selama dua jam tersebut menghasilkan sejumlah rekomendasi yang akan ditindaklanjuti melalui mekanisme pengawasan serta koordinasi dengan pihak fakultas. Beberapa isu yang mengemuka antara lain perbaikan sarana laboratorium, aksesibilitas ruang kuliah, dan transparansi penggunaan dana kemahasiswaan.",
      "Senat berkomitmen untuk terus membuka kanal aspirasi, baik melalui dialog tatap muka, form aspirasi di website resmi, maupun melalui perwakilan senator di setiap komisi.",
    ],
  },
  {
    id: 3,
    title: "Penerimaan Staf Ahli Gelombang 2",
    date: "15 Juli 2026",
    category: "Pengumuman",
    excerpt:
      "Kesempatan bagi mahasiswa teknik untuk bergabung menjadi bagian dari kontributor parlemen.",
    author: "Badan Pengembangan Staff",
    content: [
      "Senat Mahasiswa Fakultas Teknik UNDIP membuka pendaftaran Staf Ahli Gelombang 2 untuk periode 2026/2027. Program ini ditujukan bagi mahasiswa aktif Fakultas Teknik yang ingin berkontribusi dalam kerja-kerja kelembagaan parlemen mahasiswa.",
      "Staf Ahli akan ditempatkan di berbagai badan dan komisi sesuai minat dan kompetensi, mulai dari Badan Legislasi, Badan Anggaran, Badan Advokasi, Badan BKSAP, hingga keempat komisi. Peserta akan mendapatkan pembekalan, pendampingan, dan kesempatan pengembangan kapasitas selama masa kepengurusan.",
      "Pendaftaran dibuka mulai 15 hingga 30 Juli 2026 melalui tautan resmi yang dibagikan oleh akun media sosial SMFT UNDIP. Informasi lebih lanjut dapat menghubungi Badan Pengembangan Staff.",
    ],
  },
  {
    id: 4,
    title: "Sosialisasi Rancangan Peraturan Senat tentang Etika Organisasi",
    date: "8 Juli 2026",
    category: "Legislasi",
    excerpt:
      "Senat menggelar sosialisasi rancangan peraturan untuk memperkuat tata kelola organisasi kemahasiswaan.",
    author: "Badan Legislasi",
    content: [
      "Badan Legislasi Senat Mahasiswa Fakultas Teknik menggelar sosialisasi Rancangan Peraturan Senat tentang Etika Organisasi Kemahasiswaan. Kegiatan ini bertujuan menjaring masukan dari seluruh ORMAWA sebelum rancangan peraturan dibahas lebih lanjut dalam rapat paripurna.",
      "Rancangan peraturan ini disusun sebagai landasan bersama dalam menjaga integritas, profesionalisme, dan tata kelola organisasi yang akuntabel di lingkungan Fakultas Teknik. Seluruh HMD, UPK, dan BEM FT diundang untuk memberikan tanggapan dan masukan.",
      "Badan Legislasi menargetkan rancangan peraturan ini dapat disahkan pada akhir periode melalui mekanisme pembahasan bertingkat yang transparan dan partisipatif.",
    ],
  },
  {
    id: 5,
    title: "SMFT UNDIP Gelar Rapat Paripurna Perdana",
    date: "1 Juli 2026",
    category: "Berita Utama",
    excerpt:
      "Rapat paripurna perdana menandai dimulainya masa kerja Kabinet Langkah Karya 2026/2027.",
    author: "Divisi Humas SMFT",
    content: [
      "Senat Mahasiswa Fakultas Teknik UNDIP menyelenggarakan Rapat Paripurna perdana sebagai penanda dimulainya masa kerja Kabinet Langkah Karya periode 2026/2027. Rapat dihadiri oleh seluruh senator, pimpinan badan, dan ketua komisi.",
      "Agenda utama rapat meliputi penetapan program kerja tahunan, pembentukan panitia kerja, serta penyesuaian mekanisme kerja antar badan dan komisi. Seluruh agenda dibahas secara demokratis dan menghasilkan keputusan yang mengikat seluruh jajaran.",
      "Melalui rapat ini, Senat menegaskan komitmennya untuk bekerja secara transparan dan responsif terhadap kebutuhan mahasiswa Fakultas Teknik.",
    ],
  },
  {
    id: 6,
    title: "Advokasi UKT: Pendampingan Pengajuan Keringanan Biaya",
    date: "25 Juni 2026",
    category: "Advokasi",
    excerpt:
      "Badan Advokasi membuka layanan pendampingan bagi mahasiswa yang mengajukan keringanan UKT.",
    author: "Badan Advokasi",
    content: [
      "Badan Advokasi Senat Mahasiswa Fakultas Teknik membuka layanan pendampingan bagi mahasiswa yang membutuhkan bantuan dalam pengajuan keringanan Uang Kuliah Tunggal (UKT) serta fasilitas kampus.",
      "Layanan ini hadir sebagai wujud fungsi advokasi senat dalam memperjuangkan kesejahteraan mahasiswa. Tim advokasi akan mendampingi proses administrasi, memberikan konsultasi, serta memastikan hak mahasiswa terpenuhi sesuai ketentuan yang berlaku.",
      "Mahasiswa yang membutuhkan pendampingan dapat menghubungi Badan Advokasi melalui kanal resmi SMFT UNDIP atau mengisi form aspirasi di website.",
    ],
  },
];
