/**
 * Memuat item dari localStorage. Jika tidak ada, gunakan data default.
 * @param {string} storageKey - Kunci untuk localStorage (misal: 'lostItems').
 * @param {Array} defaultItems - Array data default dari file (misal: lostItems dari lost_data.js).
 * @returns {Array} - Array item dari localStorage atau default.
 */
function loadItems(storageKey, defaultItems) {
  const itemsFromStorage = localStorage.getItem(storageKey);
  if (itemsFromStorage) {
    return JSON.parse(itemsFromStorage);
  } else {
    return defaultItems;
  }
}

/**
 * Menyimpan array item ke localStorage.
 * @param {string} storageKey - Kunci untuk localStorage.
 * @param {Array} items - Array item yang akan disimpan.
 */
function saveItems(storageKey, items) {
  localStorage.setItem(storageKey, JSON.stringify(items));
}