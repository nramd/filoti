document.addEventListener("DOMContentLoaded", function () {
    // Fungsi untuk membuat satu elemen item
    function createItemFound(item) {
        const buttonHTML = item.hasDetailsLink
          ? `<a href="${item.detailsLink}?id=${item.id}" class="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800 transition-colors inline-block text-center">View Details</a>`
          : `<button class="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800 transition-colors">View Details</button>`;

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

    // Ambil container dan render semua item dari `foundItems` (yang ada di find_data.js)
    // Kita cek dulu apakah foundItems dan container ada, untuk mencegah error
    const itemsToDisplay = loadItems('foundItems', foundItems);

    // Ganti variabel yang di-loop menjadi `itemsToDisplay`
    if (typeof itemsToDisplay !== 'undefined' && document.getElementById("found-items-container")) {
        const container = document.getElementById("found-items-container");
        container.innerHTML = ''; 
    
        itemsToDisplay.forEach((item) => {
        container.innerHTML += createItemFound(item);
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