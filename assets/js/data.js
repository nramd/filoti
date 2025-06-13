const allItems = [
  // --- CONTOH DATA LOST & ACTIVE ---
  {
    id: 101,
    name: "User Pelapor 1",
    initials: "UP",
    avatarColor: "bg-orange-500",
    timeAgo: "2 hari yang lalu",
    location: "Gedung F",
    title: "Headphone Bluetooth Sony",
    itemType: "lost", // Tipe: 'lost' atau 'found'
    status: "active", // Status: 'active' atau 'done'
    miniDescription: "Kehilangan headphone bluetooth Sony WH-1000XM4 warna hitam.",
    description: "Kehilangan headphone bluetooth Sony WH-1000XM4 warna hitam, terakhir terlihat di ruang kelas F8. Kondisi masih sangat bagus.",
    image: "https://picsum.photos/seed/picsum/200/300",
    detailsLink: "lost_item_details.html",
    hasDetailsLink: true,
  },
  // --- CONTOH DATA FOUND & ACTIVE ---
  {
    id: 201,
    name: "User Penemu 1",
    initials: "UP",
    avatarColor: "bg-blue-600",
    timeAgo: "1 hari yang lalu",
    location: "Kantin",
    title: "Botol Minum Corkcicle",
    itemType: "found",
    status: "active",
    miniDescription: "Menemukan botol minum Corkcicle warna putih di meja kantin.",
    description: "Menemukan botol minum Corkcicle warna putih di meja kantin sekitar jam makan siang. Tidak ada goresan.",
    image: "https://picsum.photos/200/300?grayscale",
    detailsLink: "find_item_details.html",
    hasDetailsLink: true,
  },
  // --- CONTOH DATA HISTORY (DONE) ---
  {
    id: 301,
    name: "Jamal Musiala",
    status: "done",
    itemType: "found",
    avatarColor: "bg-blue-600",
    timeAgo: "1 minggu yang lalu",
    location: "GKM",
    title: "Kunci Motor Honda",
    description: "Temuan kunci motor merk honda di sekitar area gkm.",
    image: "https://picsum.photos/id/870/200/300?grayscale&blur=2",
    detailsLink: "history_details.html",
    claimer: { name: "Ahmad Dahlan", proofText: "Gantungan kuncinya ada goresan kecil." }
  }
];