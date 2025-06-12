const notifications = [
  {
    id: 1,
    type: 'comment', // 'comment', 'found', 'claim'
    iconColor: 'bg-blue-500',
    // Gunakan tag <strong> untuk menebalkan nama
    text: '<strong>Sarah Putri Maharani</strong> mengomentari laporan Anda: "Dompet Kulit Coklat".',
    time: '15 menit yang lalu'
  },
  {
    id: 2,
    type: 'found',
    iconColor: 'bg-green-500',
    text: 'Laporan Anda untuk <strong>"Helm Fullface Putih"</strong> telah diverifikasi dan sekarang sudah tayang.',
    time: '1 jam yang lalu'
  },
  {
    id: 3,
    type: 'claim',
    iconColor: 'bg-orange-500',
    text: 'Seseorang mengklaim barang temuan Anda: <strong>"Kunci Motor Honda"</strong>. Segera cek detailnya.',
    time: '3 jam yang lalu'
  },
  {
    id: 4,
    type: 'comment',
    iconColor: 'bg-blue-500',
    text: '<strong>Admin FILOTI</strong> mengomentari laporan Anda: "Dompet Kulit Coklat".',
    time: 'Kemarin'
  },
];

// Fungsi untuk mendapatkan SVG ikon berdasarkan tipe notifikasi
function getNotificationIcon(type) {
  switch (type) {
    case 'comment':
      return `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>`;
    case 'found':
      return `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
    case 'claim':
      return `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>`;
    default:
      return '';
  }
}