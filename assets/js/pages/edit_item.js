document.addEventListener("DOMContentLoaded", function () {
    // Muat Navbar terlebih dahulu
    new NavbarLoader({ navbarPath: "../components/navbar.html", onLoad: () => {
        if (typeof FilotiNavbar !== "undefined") new FilotiNavbar();
    }}).loadNavbarSimple();

    // Pastikan variabel global allItems dari data.js benar-benar ada
    if (typeof allItems === 'undefined') {
        console.error("Kesalahan: Variabel 'allItems' tidak ditemukan. Pastikan data.js sudah dimuat sebelum edit_item.js.");
        document.getElementById('edit-content').innerHTML = '<p class="text-red-500 text-center">Gagal memuat data sumber.</p>';
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const itemId = parseInt(urlParams.get('id'));
    
    const allItemsFromStorage = loadItems('allItems', allItems);
    const itemToEdit = allItemsFromStorage.find(i => i.id === itemId);

    // Get form elements
    const form = document.getElementById('edit-form');
    const titleInput = document.getElementById('item-title');
    const descriptionInput = document.getElementById('item-description');
    const locationInput = document.getElementById('location');
    const markDoneBtn = document.getElementById('mark-done-btn');
    const claimerForm = document.getElementById('claimer-form');
    const confirmDoneBtn = document.getElementById('confirm-done-btn');
    const deleteBtn = document.getElementById('delete-btn'); // Ambil elemen delete di sini

    // Populate form with existing data
    if (itemToEdit) {
        titleInput.value = itemToEdit.title;
        descriptionInput.value = itemToEdit.description;
        locationInput.value = itemToEdit.location;
    } else {
        document.getElementById('edit-content').innerHTML = '<p class="text-center">Item tidak ditemukan.</p>';
        return;
    }

    // Handle "Update Informasi"
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const currentAllItems = loadItems('allItems', allItems);
        const itemIndex = currentAllItems.findIndex(i => i.id === itemId);
        if (itemIndex > -1) {
            currentAllItems[itemIndex].title = titleInput.value;
            currentAllItems[itemIndex].description = descriptionInput.value;
            currentAllItems[itemIndex].location = locationInput.value;
            saveItems('allItems', currentAllItems);
            alert('Informasi berhasil diperbarui!');
            window.location.href = itemToEdit.itemType === 'lost' ? 'lost_item.html' : 'find_item.html';
        }
    });

    // Handle "Tandai sebagai Selesai"
    markDoneBtn.addEventListener('click', function() {
        claimerForm.classList.toggle('hidden');
    });
    
    // Handle "Konfirmasi & Selesaikan"
    confirmDoneBtn.addEventListener('click', function() {
        const claimerName = document.getElementById('claimer-name').value.trim();
        if (!claimerName) {
            alert('Nama pengambil/penemu wajib diisi!');
            return;
        }
        
        const currentAllItems = loadItems('allItems', allItems);
        const itemIndex = currentAllItems.findIndex(i => i.id === itemId);
        if (itemIndex > -1) {
            currentAllItems[itemIndex].status = 'done';
            currentAllItems[itemIndex].claimer = {
                name: claimerName,
                proofImage: "https://placehold.co/600x400?text=Bukti+Diserahkan"
            };
            
            saveItems('allItems', currentAllItems);
            alert('Laporan berhasil diselesaikan dan dipindahkan ke histori.');
            window.location.href = 'history.html';
        }
    });
    
    deleteBtn.addEventListener('click', function() {
        const isConfirmed = window.confirm('Apakah Anda yakin ingin menghapus laporan ini secara permanen?');

        if (isConfirmed) {
            const currentAllItems = loadItems('allItems', allItems);
            const updatedItems = currentAllItems.filter(i => i.id !== itemId);
            
            saveItems('allItems', updatedItems);
            
            alert('Laporan berhasil dihapus.');
            window.location.href = 'index.html';
        }
    });
});