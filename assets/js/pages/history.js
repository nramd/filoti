document.addEventListener("DOMContentLoaded", function () {
    
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
                <p class="text-gray-600 text-sm mb-3">Tipe Laporan: ${item.itemType}</p>
                <a href="${item.detailsLink}?id=${item.id}" class="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-800 transition-colors inline-block text-center">View Details</a>
              </div>
            </div>
          </div>`;
    }

    const itemsToDisplay = loadItems('historyItems', historyItems);

    if (typeof itemsToDisplay !== 'undefined' && document.getElementById("history-items-container")) {
        const container = document.getElementById("history-items-container");
        container.innerHTML = ''; 
        itemsToDisplay.forEach((item) => {
            container.innerHTML += createHistoryItem(item);
        });
    }

    if (typeof NavbarLoader !== 'undefined') {
        const loader = new NavbarLoader({
          navbarPath: "../components/navbar.html",
          onLoad: function () {
            if (typeof FilotiNavbar !== "undefined") new FilotiNavbar();
          }
        });
        loader.loadNavbarSimple();
    }
});