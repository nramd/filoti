document.addEventListener("DOMContentLoaded", function () {

    const filterBtn = document.getElementById('filter-location-btn');
    const dropdown = document.getElementById('location-dropdown');
    const filterLabel = document.getElementById('filter-label');
    const itemsContainerLost = document.getElementById('lost-items-container');

    const allItemsFromStorage = loadItems('allItems', allItems);
    const activeLostItems = allItemsFromStorage.filter(item => item.itemType === 'lost' && item.status === 'active');

    function createItemLost(item) {
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

    function renderItems(locationFilter = 'all') {
        if (!itemsContainerLost) return;
        itemsContainerLost.innerHTML = ''; 

        const itemsToRender = locationFilter === 'all'
          ? activeLostItems
          : activeLostItems.filter(item => 
          item.location.toLowerCase().includes(locationFilter.toLowerCase())
        );

        if (itemsToRender.length === 0) {
            itemsContainerLost.innerHTML = '<p class="text-center text-gray-500 py-10">Tidak ada item yang cocok dengan filter ini.</p>';
            return;
        }

        itemsToRender.forEach(item => {
            itemsContainerLost.innerHTML += createItemLost(item);
        });
    }

    function populateLocationFilter() {
        if (!dropdown || typeof locations === 'undefined') return;
        dropdown.innerHTML = ''; 
        const allOption = document.createElement('a');
        allOption.href = '#';
        allOption.className = 'block px-4 py-3 text-gray-700 hover:bg-blue-50 font-semibold';
        allOption.textContent = 'Tampilkan Semua Lokasi';
        allOption.dataset.location = 'all';
        dropdown.appendChild(allOption);
        locations.forEach(loc => {
            const option = document.createElement('a');
            option.href = '#';
            option.className = 'block px-4 py-3 text-gray-700 hover:bg-blue-50';
            option.textContent = loc.name;
            option.dataset.location = loc.name;
            dropdown.appendChild(option);
        });
    }

    if(filterBtn) {
        filterBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('hidden');
        });
    }
    window.addEventListener('click', () => {
        if (dropdown && !dropdown.classList.contains('hidden')) {
            dropdown.classList.add('hidden');
        }
    });
    if(dropdown) {
        dropdown.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedLocation = e.target.dataset.location;
            if (selectedLocation) {
                renderItems(selectedLocation);
                filterLabel.textContent = selectedLocation === 'all' ? 'Filter by Location' : selectedLocation;
                dropdown.classList.add('hidden');
            }
        });
    }

    populateLocationFilter();
    renderItems();
    
    // Inisialisasi Navbar
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
        loader.loadNavbar();
    }
});