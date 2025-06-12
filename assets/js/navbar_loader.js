/**
 * FILOTI Navbar Loader
 * Script untuk memuat navbar component ke dalam halaman
 */

class NavbarLoader {
    constructor(options = {}) {
        this.navbarPath = options.navbarPath || 'components/navbar.html';
        this.targetSelector = options.targetSelector || '#navbar-container';
        this.onLoad = options.onLoad || null;
        this.onError = options.onError || null;
    }

    async loadNavbar() {
        try {
            const response = await fetch(this.navbarPath);
            
            if (!response.ok) {
                throw new Error(`Failed to load navbar: ${response.status} ${response.statusText}`);
            }

            const html = await response.text();
            
            // Parse HTML to extract navbar content
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Extract navbar elements
            const desktopNav = doc.querySelector('nav');
            const mobileHeader = doc.querySelector('header');
            const sidebarOverlay = doc.querySelector('#sidebar-overlay');
            const styles = doc.querySelector('style');
            
            // Get target container
            const container = document.querySelector(this.targetSelector);
            if (!container) {
                throw new Error(`Target container '${this.targetSelector}' not found`);
            }

            // Add styles to head if not already present
            if (styles && !document.querySelector('style[data-navbar-styles]')) {
                const styleElement = document.createElement('style');
                styleElement.setAttribute('data-navbar-styles', 'true');
                styleElement.textContent = styles.textContent;
                document.head.appendChild(styleElement);
            }

            // Insert navbar elements
            container.innerHTML = '';
            if (desktopNav) container.appendChild(desktopNav.cloneNode(true));
            if (mobileHeader) container.appendChild(mobileHeader.cloneNode(true));
            if (sidebarOverlay) container.appendChild(sidebarOverlay.cloneNode(true));

            // Extract and execute script
            const script = doc.querySelector('script');
            if (script) {
                const scriptElement = document.createElement('script');
                scriptElement.textContent = script.textContent;
                document.body.appendChild(scriptElement);
            }

            // Call onLoad callback if provided
            if (this.onLoad && typeof this.onLoad === 'function') {
                this.onLoad();
            }

            console.log('Navbar loaded successfully');
            return true;

        } catch (error) {
            console.error('Error loading navbar:', error);
            
            // Call onError callback if provided
            if (this.onError && typeof this.onError === 'function') {
                this.onError(error);
            }
            
            return false;
        }
    }

    // Alternative method using innerHTML (simpler but less flexible)
    async loadNavbarSimple() {
        try {
            const response = await fetch(this.navbarPath);
            
            if (!response.ok) {
                throw new Error(`Failed to load navbar: ${response.status} ${response.statusText}`);
            }

            const html = await response.text();
            
            // Extract body content from navbar file
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const bodyContent = doc.body.innerHTML;
            
            // Get target container
            const container = document.querySelector(this.targetSelector);
            if (!container) {
                throw new Error(`Target container '${this.targetSelector}' not found`);
            }

            // Insert content
            container.innerHTML = bodyContent;

            // Add styles if not already present
            const styles = doc.querySelector('style');
            if (styles && !document.querySelector('style[data-navbar-styles]')) {
                const styleElement = document.createElement('style');
                styleElement.setAttribute('data-navbar-styles', 'true');
                styleElement.textContent = styles.textContent;
                document.head.appendChild(styleElement);
            }

            // Execute script
            const scripts = doc.querySelectorAll('script');
            scripts.forEach(script => {
                if (script.textContent.trim()) {
                    const scriptElement = document.createElement('script');
                    scriptElement.textContent = script.textContent;
                    document.body.appendChild(scriptElement);
                }
            });

            // Call onLoad callback if provided
            if (this.onLoad && typeof this.onLoad === 'function') {
                this.onLoad();
            }

            console.log('Navbar loaded successfully (simple method)');
            return true;

        } catch (error) {
            console.error('Error loading navbar:', error);
            
            // Call onError callback if provided
            if (this.onError && typeof this.onError === 'function') {
                this.onError(error);
            }
            
            return false;
        }
    }
}

// Auto-load navbar if container exists
document.addEventListener('DOMContentLoaded', function() {
    const navbarContainer = document.querySelector('#navbar-container');
    
    if (navbarContainer) {
        const loader = new NavbarLoader({
            onLoad: function() {
                // Navbar loaded successfully
                document.body.classList.add('navbar-loaded');
            },
            onError: function(error) {
                // Handle error
                console.warn('Navbar could not be loaded:', error.message);
                navbarContainer.innerHTML = '<div class="bg-red-100 text-red-700 p-4 text-center">Navigation could not be loaded</div>';
            }
        });
        
        // Try simple method first, fallback to complex method if needed
        loader.loadNavbarSimple();
    }
});

// Export for manual use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavbarLoader;
} else if (typeof window !== 'undefined') {
    window.NavbarLoader = NavbarLoader;
}