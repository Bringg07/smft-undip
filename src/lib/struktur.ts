export interface AnggotaStruktur {
  id: number;
  unit: string;
  nama: string;
  peran: string; // Senator | Staff Ahli
  urutan: number;
}

export const strukturUnits = [
  "Badan BKSAP",
  "Badan Advokasi",
  "Badan Legislasi",
  "Badan Anggaran",
  "Badan Pengembangan Staff",
  "Badan Kehormatan Senator",
  "Komisi 1",
  "Komisi 2",
  "Komisi 3",
  "Komisi 4",
];

// Data statis fallback + seed awal (sama dengan halaman publik sebelumnya).
// Dikelola dari /admin/struktur bila database aktif.
export const anggotaStrukturList: AnggotaStruktur[] = [
  // Badan BKSAP
  { id: 1, unit: "Badan BKSAP", nama: "Natania Nazwa Areka", peran: "Senator", urutan: 1 },
  { id: 2, unit: "Badan BKSAP", nama: "Ratu Dealova Valenci", peran: "Senator", urutan: 2 },
  { id: 3, unit: "Badan BKSAP", nama: "Benedictus Ryan Aretha Sudaryunanto", peran: "Senator", urutan: 3 },
  { id: 4, unit: "Badan BKSAP", nama: "Salman Daffa Alfarizi", peran: "Senator", urutan: 4 },
  { id: 5, unit: "Badan BKSAP", nama: "Arkan Nafi Nurcahyo", peran: "Senator", urutan: 5 },
  { id: 6, unit: "Badan BKSAP", nama: "Ranayla Thalita Ayu Danieardhy", peran: "Staff Ahli", urutan: 6 },
  { id: 7, unit: "Badan BKSAP", nama: "Ziddan Aly", peran: "Staff Ahli", urutan: 7 },
  { id: 8, unit: "Badan BKSAP", nama: "Muhammad Naufal Khanief Abdillah", peran: "Staff Ahli", urutan: 8 },
  { id: 9, unit: "Badan BKSAP", nama: "Rayyan Ardhi Wardhana", peran: "Staff Ahli", urutan: 9 },
  { id: 10, unit: "Badan BKSAP", nama: "Rajwa Bahajata Nafaratrie Isra", peran: "Staff Ahli", urutan: 10 },
  { id: 11, unit: "Badan BKSAP", nama: "Dwi Intan Septiani", peran: "Staff Ahli", urutan: 11 },

  // Badan Advokasi
  { id: 12, unit: "Badan Advokasi", nama: "Novia Nur Aini", peran: "Senator", urutan: 1 },
  { id: 13, unit: "Badan Advokasi", nama: "Paquita Ratu Saffana", peran: "Senator", urutan: 2 },
  { id: 14, unit: "Badan Advokasi", nama: "Hendra Pramadhi", peran: "Senator", urutan: 3 },
  { id: 15, unit: "Badan Advokasi", nama: "Dafa Briangga", peran: "Senator", urutan: 4 },
  { id: 16, unit: "Badan Advokasi", nama: "Calista Aurelia", peran: "Staff Ahli", urutan: 5 },
  { id: 17, unit: "Badan Advokasi", nama: "Iswatun Nurfiana", peran: "Staff Ahli", urutan: 6 },
  { id: 18, unit: "Badan Advokasi", nama: "Raihan Islamy Setiabudi", peran: "Staff Ahli", urutan: 7 },
  { id: 19, unit: "Badan Advokasi", nama: "Alizaki Santoso", peran: "Staff Ahli", urutan: 8 },
  { id: 20, unit: "Badan Advokasi", nama: "Athiyah Ramadhani", peran: "Staff Ahli", urutan: 9 },

  // Badan Legislasi
  { id: 21, unit: "Badan Legislasi", nama: "Bima Cakti Yudhanegara", peran: "Senator", urutan: 1 },
  { id: 22, unit: "Badan Legislasi", nama: "Tabita Grizelda Brali Hutasoit", peran: "Senator", urutan: 2 },
  { id: 23, unit: "Badan Legislasi", nama: "Alul Fahmi Akbar", peran: "Senator", urutan: 3 },
  { id: 24, unit: "Badan Legislasi", nama: "Suryanudin Ihsan", peran: "Staff Ahli", urutan: 4 },
  { id: 25, unit: "Badan Legislasi", nama: "Kayla Azzahra", peran: "Staff Ahli", urutan: 5 },
  { id: 26, unit: "Badan Legislasi", nama: "Muhammad Rizqullah Fairuzein", peran: "Staff Ahli", urutan: 6 },
  { id: 27, unit: "Badan Legislasi", nama: "Riadi Yuniar Hermansyah", peran: "Staff Ahli", urutan: 7 },
  { id: 28, unit: "Badan Legislasi", nama: "Muhammad Alfis Al Khaririy", peran: "Staff Ahli", urutan: 8 },

  // Badan Anggaran
  { id: 29, unit: "Badan Anggaran", nama: "Nathaniel Bramantya Marsha Aksatriya", peran: "Senator", urutan: 1 },
  { id: 30, unit: "Badan Anggaran", nama: "Raihan Khairull Khashib", peran: "Senator", urutan: 2 },
  { id: 31, unit: "Badan Anggaran", nama: "Anisa Mufidah", peran: "Senator", urutan: 3 },
  { id: 32, unit: "Badan Anggaran", nama: "Anindhiyo Ghani Kurniawan", peran: "Senator", urutan: 4 },
  { id: 33, unit: "Badan Anggaran", nama: "Evi Kusuma Wardani", peran: "Senator", urutan: 5 },
  { id: 34, unit: "Badan Anggaran", nama: "Muhammad Irsyad Novradi", peran: "Staff Ahli", urutan: 6 },
  { id: 35, unit: "Badan Anggaran", nama: "Dora Oktaviana BR Hutasoit", peran: "Staff Ahli", urutan: 7 },
  { id: 36, unit: "Badan Anggaran", nama: "Siti Khadijah Aulia Robby", peran: "Staff Ahli", urutan: 8 },
  { id: 37, unit: "Badan Anggaran", nama: "Aqela Sabrina Azzahra", peran: "Staff Ahli", urutan: 9 },
  { id: 38, unit: "Badan Anggaran", nama: "Zahra As Syifa Adhwiyan", peran: "Staff Ahli", urutan: 10 },

  // Badan Pengembangan Staff
  { id: 39, unit: "Badan Pengembangan Staff", nama: "Halisya Keiza Alifia Elandi", peran: "Senator", urutan: 1 },

  // Badan Kehormatan Senator
  { id: 40, unit: "Badan Kehormatan Senator", nama: "Cristian Duta Dungdungon Sihotang", peran: "Senator", urutan: 1 },

  // Komisi 1
  { id: 41, unit: "Komisi 1", nama: "Halisya Keiza Alifia Elandi", peran: "Senator", urutan: 1 },
  { id: 42, unit: "Komisi 1", nama: "Novia Nur Aini", peran: "Senator", urutan: 2 },
  { id: 43, unit: "Komisi 1", nama: "Nathaniel Bramantya Marsha Aksatriya", peran: "Senator", urutan: 3 },
  { id: 44, unit: "Komisi 1", nama: "Salman Daffa Alfarizi", peran: "Senator", urutan: 4 },
  { id: 45, unit: "Komisi 1", nama: "Alul Fahmi Akbar", peran: "Senator", urutan: 5 },
  { id: 46, unit: "Komisi 1", nama: "Nailah Syarifatul Faiqoh", peran: "Staff Ahli", urutan: 6 },
  { id: 47, unit: "Komisi 1", nama: "A'idah Inas Labibah", peran: "Staff Ahli", urutan: 7 },
  { id: 48, unit: "Komisi 1", nama: "Hamdan Yafi Niam", peran: "Staff Ahli", urutan: 8 },
  { id: 49, unit: "Komisi 1", nama: "Nadia Rahma Azizah", peran: "Staff Ahli", urutan: 9 },
  { id: 50, unit: "Komisi 1", nama: "Rieski Riestianti", peran: "Staff Ahli", urutan: 10 },

  // Komisi 2
  { id: 51, unit: "Komisi 2", nama: "Benedictus Ryan Aretha Sudaryunanto", peran: "Senator", urutan: 1 },
  { id: 52, unit: "Komisi 2", nama: "Raihan Khairull Khashib", peran: "Senator", urutan: 2 },
  { id: 53, unit: "Komisi 2", nama: "Tabita Grizelda Brali Hutasoit", peran: "Senator", urutan: 3 },
  { id: 54, unit: "Komisi 2", nama: "Anindhiyo Ghani Kurniawan", peran: "Senator", urutan: 4 },
  { id: 55, unit: "Komisi 2", nama: "Dafa Briangga", peran: "Senator", urutan: 5 },
  { id: 56, unit: "Komisi 2", nama: "Dennise Ivena Novelitha", peran: "Staff Ahli", urutan: 6 },
  { id: 57, unit: "Komisi 2", nama: "Alifia Elfara", peran: "Staff Ahli", urutan: 7 },
  { id: 58, unit: "Komisi 2", nama: "Rezuel Marpaung", peran: "Staff Ahli", urutan: 8 },
  { id: 59, unit: "Komisi 2", nama: "Brello Aryaputra Kencana", peran: "Staff Ahli", urutan: 9 },
  { id: 60, unit: "Komisi 2", nama: "Ririn Indah Cahyani", peran: "Staff Ahli", urutan: 10 },
  { id: 61, unit: "Komisi 2", nama: "Muhammad Fakhri Rafif", peran: "Staff Ahli", urutan: 11 },

  // Komisi 3
  { id: 62, unit: "Komisi 3", nama: "Bima Cakti Yudhanegara", peran: "Senator", urutan: 1 },
  { id: 63, unit: "Komisi 3", nama: "Natania Nazwa Areka", peran: "Senator", urutan: 2 },
  { id: 64, unit: "Komisi 3", nama: "Ratu Dealova Valenci", peran: "Senator", urutan: 3 },
  { id: 65, unit: "Komisi 3", nama: "Paquita Ratu Saffana", peran: "Senator", urutan: 4 },
  { id: 66, unit: "Komisi 3", nama: "Evi Kusuma Wardani", peran: "Senator", urutan: 5 },
  { id: 67, unit: "Komisi 3", nama: "Khanifiatus Istianah", peran: "Staff Ahli", urutan: 6 },
  { id: 68, unit: "Komisi 3", nama: "Rifa Puspitasari", peran: "Staff Ahli", urutan: 7 },
  { id: 69, unit: "Komisi 3", nama: "Athiya Najwa Mazida", peran: "Staff Ahli", urutan: 8 },
  { id: 70, unit: "Komisi 3", nama: "Revo Satrio Aji", peran: "Staff Ahli", urutan: 9 },
  { id: 71, unit: "Komisi 3", nama: "Wildah Rizka Vania Zaen", peran: "Staff Ahli", urutan: 10 },

  // Komisi 4
  { id: 72, unit: "Komisi 4", nama: "Anisa Mufidah", peran: "Senator", urutan: 1 },
  { id: 73, unit: "Komisi 4", nama: "Hendra Pramadhi", peran: "Senator", urutan: 2 },
  { id: 74, unit: "Komisi 4", nama: "Cristian Duta Dungdungon Sihotang", peran: "Senator", urutan: 3 },
  { id: 75, unit: "Komisi 4", nama: "David Felipe Barrichello", peran: "Staff Ahli", urutan: 4 },
  { id: 76, unit: "Komisi 4", nama: "Rahma Mutiara Trisyani", peran: "Staff Ahli", urutan: 5 },
  { id: 77, unit: "Komisi 4", nama: "Zahra Amalia Nirmala Putri", peran: "Staff Ahli", urutan: 6 },
  { id: 78, unit: "Komisi 4", nama: "Nayla Maulidina Dhiahana Khairunnisa", peran: "Staff Ahli", urutan: 7 },
  { id: 79, unit: "Komisi 4", nama: "Khoirotun Hisan", peran: "Staff Ahli", urutan: 8 },
  { id: 80, unit: "Komisi 4", nama: "Dainty Rahma Suny", peran: "Staff Ahli", urutan: 9 },
];
