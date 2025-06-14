document.addEventListener("DOMContentLoaded", function () {
    
    const filterBtn = document.getElementById('filter-location-btn');
    const dropdown = document.getElementById('location-dropdown');
    const filterLabel = document.getElementById('filter-label');
    const itemsContainerHistory = document.getElementById('history-items-container');

    const allItemsData = loadItems('allItems', allItems);
    const itemsToDisplayHistory = allItemsData.filter(item => item.status === 'done');

    function createHistoryItem(item) {
        // Logika untuk badge "Done"
        const statusBadge = item.status === 'done' 
          ? `<div class="flex items-center space-x-2">
               <div class="w-3 h-3 bg-green-500 rounded-full"></div>
               <span class="text-sm font-medium text-green-600">Done</span>
             </div>`
          : ''; 

        return `
          <div class="bg-white rounded-lg shadow-sm p-4 lg:p-6 flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-6">
            <div class="flex items-start space-x-3 flex-1">
              <div class="w-10 h-10 ${item.avatarColor} rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white font-semibold text-sm">${item.initials || item.name.substring(0,2)}</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-1">
                    <div class="flex flex-wrap items-center gap-2">
                      <h3 class="font-semibold text-gray-800">${item.name}</h3>
                      <span class="text-sm text-gray-500">• ${item.timeAgo}</span>
                    </div>
                    ${statusBadge}
                </div>
                <p class="text-gray-800 font-medium">${item.title}</p>
                <p class="text-gray-600 text-sm mb-3">Item Type: ${item.itemType}</p>
                <a href="${item.detailsLink}?id=${item.id}" class="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800 transition-colors inline-block text-center">View Details</a>
              </div>
            </div>
          </div>`;
    }

    function renderItems(locationFilter = 'all') {
        if (!itemsContainerHistory) return;
        itemsContainerHistory.innerHTML = ''; 
        
        const itemsToRender = locationFilter === 'all'
          ? itemsToDisplayHistory
          : itemsToDisplayHistory.filter(item => 
          item.location.toLowerCase().includes(locationFilter.toLowerCase())
        );

        if (itemsToRender.length === 0) {
            itemsContainerHistory.innerHTML = '<p class="text-center text-gray-500 py-10">Tidak ada item yang cocok dengan filter ini.</p>';
            return;
        }

        itemsToRender.forEach(item => {
            itemsContainerHistory.innerHTML += createHistoryItem(item);
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