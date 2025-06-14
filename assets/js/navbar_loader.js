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
            
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const bodyContent = doc.body.innerHTML;
            
            // Get target container
            const container = document.querySelector(this.targetSelector);
            if (!container) {
                throw new Error(`Target container '${this.targetSelector}' not found`);
            }

            // Masukkan content
            container.innerHTML = bodyContent;

            const styles = doc.querySelector('style');
            if (styles && !document.querySelector('style[data-navbar-styles]')) {
                const styleElement = document.createElement('style');
                styleElement.setAttribute('data-navbar-styles', 'true');
                styleElement.textContent = styles.textContent;
                document.head.appendChild(styleElement);
            }

            // Eksekusi script
            const scripts = doc.querySelectorAll('script');
            scripts.forEach(script => {
                if (script.textContent.trim()) {
                    const scriptElement = document.createElement('script');
                    scriptElement.textContent = script.textContent;
                    document.body.appendChild(scriptElement);
                }
            });

            if (this.onLoad && typeof this.onLoad === 'function') {
                this.onLoad();
            }

            console.log('Navbar loaded successfully (simple method)');
            return true;

        } catch (error) {
            console.error('Error loading navbar:', error);
            
            if (this.onError && typeof this.onError === 'function') {
                this.onError(error);
            }
            
            return false;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const navbarContainer = document.querySelector('#navbar-container');
    
    if (navbarContainer) {
        const loader = new NavbarLoader({
            onLoad: function() {
                document.body.classList.add('navbar-loaded');
            },
            onError: function(error) {
                // Handle error
                console.warn('Navbar could not be loaded:', error.message);
                navbarContainer.innerHTML = '<div class="bg-red-100 text-red-700 p-4 text-center">Navigation could not be loaded</div>';
            }
        });
        
        loader.loadNavbar();
    }
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavbarLoader;
} else if (typeof window !== 'undefined') {
    window.NavbarLoader = NavbarLoader;
}