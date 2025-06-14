document.addEventListener("DOMContentLoaded", function () {
    function createNotificationElement(notification) {
        const iconSVG = getNotificationIcon(notification.type);

        return `
            <div class="flex items-start space-x-4 p-4 border-b border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                <div class="w-10 h-10 ${notification.iconColor} rounded-full flex-shrink-0 flex items-center justify-center text-white">
                    ${iconSVG}
                </div>
                <div class="flex-1">
                    <p class="text-gray-800">${notification.text}</p>
                    <p class="text-sm text-gray-500 mt-1">${notification.time}</p>
                </div>
            </div>
        `;
    }

    if (typeof notifications !== 'undefined' && document.getElementById("notifications-container")) {
        const container = document.getElementById("notifications-container");
        container.innerHTML = ''; // Kosongkan container

        if (notifications.length > 0) {
            notifications.forEach((notif) => {
                container.innerHTML += createNotificationElement(notif);
            });
        } else {
            // Tampilkan pesan jika tidak ada notifikasi
            container.innerHTML = `
                <div class="text-center py-16">
                    <p class="text-gray-500">Tidak ada notifikasi saat ini.</p>
                </div>
            `;
        }
    }

    if (typeof NavbarLoader !== 'undefined') {
        const loader = new NavbarLoader({
          navbarPath: "../components/navbar.html",
          onLoad: function () {
            if (typeof FilotiNavbar !== "undefined") new FilotiNavbar();
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