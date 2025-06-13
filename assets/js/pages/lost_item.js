document.addEventListener("DOMContentLoaded", function () {
    // Fungsi untuk membuat satu elemen item
    function createItemLost(item) {
        // Di dalam fungsi createItemLost/Found
        const buttonHTML = `
          <div class="flex items-center space-x-2">
            <a href="${item.detailsLink}?id=${item.id}" class="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800">View Details</a>
            <a href="edit_item.html?id=${item.id}" class="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm hover:bg-gray-300">Edit</a>
          </div>
        `;

        return `
          <div class="bg-white rounded-lg shadow-sm p-4 lg:p-6 flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
            <div class="flex items-start space-x-3 flex-1">
              <div class="w-10 h-10 ${item.avatarColor} rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white font-semibold text-sm">${item.initials}</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-2 mb-1">
                  <h3 class="font-semibold text-gray-800">${item.name}</h3>
                  <span class="text-sm text-gray-500">• ${item.timeAgo}</span>
                  <span class="text-sm text-gray-500">• ${item.location}</span>
                </div>
                <p class="text-gray-600 text-sm mb-3">${item.miniDescription}</p>
                ${buttonHTML}
              </div>
            </div>
            <div class="w-48 lg:w-24 h-36 lg:h-16 flex-shrink-0 m-12">
              <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover rounded-lg bg-gray-200" />
            </div>
          </div>`;
    }

    // Ambil container dan render semua item dari `allItems` (yang ada di data.js)
    // Kita cek dulu apakah allItems dan container ada, untuk mencegah error
    const allItemsData = loadItems('allItems', allItems);
    // Filter hanya item yang 'lost' dan 'active'
    const itemsToDisplay = allItemsData.filter(item => item.itemType === 'lost' && item.status === 'active');

    // Ganti variabel yang di-loop menjadi `itemsToDisplay`
    if (typeof itemsToDisplay !== 'undefined' && document.getElementById("lost-items-container")) {
        const container = document.getElementById("lost-items-container");
        container.innerHTML = ''; 
    
        itemsToDisplay.forEach((item) => {
        container.innerHTML += createItemLost(item);
        });
    }
    
    if (typeof NavbarLoader !== 'undefined') {
        const loader = new NavbarLoader({
          navbarPath: "../components/navbar.html",
          onLoad: function () {
            if (typeof FilotiNavbar !== "undefined") {
              new FilotiNavbar();
            }
            document.body.classList.add("navbar-loaded");
          },
          onError: function(error) {
            console.error('Gagal memuat navbar:', error);
            const navbarContainer = document.querySelector('#navbar-container');
            if (navbarContainer) {
              navbarContainer.innerHTML = '<div class="bg-red-100 text-red-700 p-4 text-center">Navigation could not be loaded</div>';
            }
          }
        });
        loader.loadNavbarSimple();
    }
});