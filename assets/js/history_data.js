const historyItems = [
  {
    id: 301, // Gunakan ID yang berbeda untuk menghindari konflik
    originalId: 1, // Bisa merujuk ke ID asli barangnya
    name: "Jamal Musiala", // Yang melaporkan
    status: "done",
    itemType: "Found Item", // Tipe laporan asli
    avatarColor: "bg-blue-600",
    timeAgo: "1 hari yang lalu",
    location: "GKM",
    title: "Kunci Motor Honda",
    description: "Temuan kunci motor merk honda di sekitar area gkm. Kunci tersebut berwarna hitam dengan gantungan kunci berwarna merah.",
    image: "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/9/13/4e035343-6c61-4c6e-981f-4d57574518e2.jpg",
    detailsLink: "history_details.html",
    // Informasi tambahan untuk bukti
    claimer: {
        name: "Ahmad Dahlan",
        proofText: "Gantungan kuncinya ada goresan kecil di dekat logo sayap Hondanya. Saya yang punya.",
        proofImage: "https://placehold.co/600x400?text=Bukti+Foto+(Opsional)"
    }
  },
  {
    id: 302,
    originalId: 2,
    name: "Sarah Putri Maharani",
    status: "done",
    itemType: "Lost Item",
    avatarColor: "bg-orange-500",
    timeAgo: "3 hari yang lalu",
    location: "Edutech",
    title: "Dompet Kulit Coklat",
    description: "Kehilangan dompet kulit coklat tua di sekitar area Gedung Kreatifitas Mahasiswa (GKM) lantai 3.",
    image: "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//102/MTA-30852924/oem_dompet-pria-kulit-asli-garut-model-3-dimensi-original-bonus-box_full01.jpg",
    detailsLink: "history_details.html",
    claimer: {
        name: "Budi Perkasa",
        proofText: "Saya menemukan dompet ini di dekat tangga darurat lantai 3. Isinya masih lengkap sesuai deskripsi.",
        proofImage: "https://placehold.co/600x400?text=Bukti+Foto+(Opsional)"
    }
  }
];