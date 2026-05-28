// ===== FERMENTATION WORKSHOP - SHARED COMPONENTS =====
// This file injects the shared premium navbar and footer across all pages

(function () {
    'use strict';

    // --- Configuration ---
    const BRAND_NAME = 'Ferment & Pickle';
    const BRAND_TAGLINE = 'Artisan Fermentation & Pickling Workshops';
    const CURRENT_YEAR = new Date().getFullYear();
    const PHONE = '+1 (555) 284-7392';
    const EMAIL = 'hello@fermentpickle.co';
    const ADDRESS = '42 Harvest Lane, Farmville';

    const NAV_LINKS = [
        { label: 'Home', href: 'index.html', icon: 'fa-home' },
        { label: 'Home 2', href: 'home2.html', icon: 'fa-door-open' },
        { label: 'Workshops', href: 'workshops.html', icon: 'fa-chalkboard-user' },
        { label: 'Recipes', href: 'recipes.html', icon: 'fa-book-open' },
        { label: 'Pricing', href: 'pricing.html', icon: 'fa-tags' },
        { label: 'Contact', href: 'contact.html', icon: 'fa-envelope' },
        { label: 'Dashboard', href: '#', icon: 'fa-gauge', dropdown: [
            { label: 'Student Dashboard', href: 'student-dashboard.html', icon: 'fa-user-graduate' },
            { label: 'Admin Dashboard', href: 'admin-dashboard.html', icon: 'fa-user-shield' }
        ] }
    ];

    const SOCIAL_LINKS = [
        { icon: 'fab fa-facebook-f', href: '#', hoverColor: 'hover:text-amber-600 dark:hover:text-amber-500', label: 'Facebook' },
        { icon: 'fab fa-instagram', href: '#', hoverColor: 'hover:text-pink-600 dark:hover:text-pink-500', label: 'Instagram' },
        { icon: 'fab fa-youtube', href: '#', hoverColor: 'hover:text-red-600 dark:hover:text-red-500', label: 'YouTube' },
        { icon: 'fab fa-pinterest-p', href: '#', hoverColor: 'hover:text-red-700 dark:hover:text-red-500', label: 'Pinterest' }
    ];

    const MASON_JAR_SVG = `<svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="transition-transform duration-500 group-hover:rotate-12">
        <rect x="28" y="8" width="44" height="8" rx="2" fill="#B5651D" opacity="0.7"/>
        <rect x="32" y="4" width="36" height="6" rx="2" fill="#B5651D"/>
        <rect x="25" y="16" width="50" height="80" rx="8" fill="#B5651D" opacity="0.15" stroke="#B5651D" stroke-width="2.5"/>
        <rect x="30" y="50" width="40" height="36" rx="3" fill="#B5651D" opacity="0.25"/>
        <circle cx="42" cy="62" r="4" fill="#6B8F71" opacity="0.6"/>
        <circle cx="55" cy="58" r="3" fill="#6B8F71" opacity="0.5"/>
        <circle cx="48" cy="72" r="3.5" fill="#6B8F71" opacity="0.55"/>
        <circle cx="38" cy="78" r="2.5" fill="#6B8F71" opacity="0.4"/>
        <circle cx="58" cy="70" r="3" fill="#6B8F71" opacity="0.45"/>
        <path d="M35 46 Q50 38 65 46" stroke="#B5651D" stroke-width="1.5" fill="none" opacity="0.5"/>
    </svg>`;

    // --- Get current page filename ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // --- Render Navbar ---
    function renderNavbar() {
        const navLinksDesktop = NAV_LINKS.map(link => {
            if (link.dropdown) {
                const isDropdownActive = link.dropdown.some(sub => sub.href === currentPage);
                const dropdownItems = link.dropdown.map(sub => {
                    const isSubActive = sub.href === currentPage;
                    return `<a href="${sub.href}" class="flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all duration-300 hover:bg-amber-50/50 dark:hover:bg-neutral-800 ${isSubActive ? 'text-amber-700 dark:text-amber-500 bg-amber-50/20 dark:bg-neutral-800/50' : 'text-neutral-700 dark:text-neutral-300 hover:text-amber-700 dark:hover:text-amber-500'}">
                        <i class="fas ${sub.icon} w-4 text-center opacity-60"></i> ${sub.label}
                    </a>`;
                }).join('');

                return `
                <div class="relative group py-2">
                    <button class="nav-link whitespace-nowrap text-xs xl:text-[13px] font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-1 group-hover:text-amber-700 dark:group-hover:text-amber-500 cursor-pointer ${isDropdownActive ? 'text-amber-700 dark:text-amber-500' : 'text-neutral-700 dark:text-neutral-300'}">
                        ${link.label} <i class="fas fa-chevron-down text-[9px] transition-transform duration-300 group-hover:rotate-180 opacity-60"></i>
                    </button>
                    <div class="absolute left-0 mt-2.5 w-52 bg-white dark:bg-neutral-900 border border-amber-100 dark:border-neutral-800 rounded-2xl shadow-xl py-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50 overflow-hidden">
                        ${dropdownItems}
                    </div>
                </div>`;
            }

            const isActive = link.href === currentPage || 
                             (currentPage === '' && link.href === 'index.html') ||
                             (currentPage === 'fermentation' && link.href === 'index.html');
            return `<a href="${link.href}" class="nav-link whitespace-nowrap text-xs xl:text-[13px] font-semibold tracking-wider uppercase transition-all duration-300 hover:text-amber-700 dark:hover:text-amber-500 relative group ${isActive ? 'text-amber-700 dark:text-amber-500' : 'text-neutral-700 dark:text-neutral-300'}">
                ${link.label}
                <span class="absolute -bottom-1 left-0 h-0.5 bg-amber-700 dark:bg-amber-500 transition-all duration-300 group-hover:w-full ${isActive ? 'w-full' : 'w-0'}"></span>
            </a>`;
        }).join('');

        const navLinksMobile = NAV_LINKS.map(link => {
            if (link.dropdown) {
                const isDropdownActive = link.dropdown.some(sub => sub.href === currentPage);
                const dropdownItems = link.dropdown.map(sub => {
                    const isSubActive = sub.href === currentPage;
                    return `<a href="${sub.href}" class="flex items-center py-3 pl-8 text-sm font-bold transition-all duration-300 ${isSubActive ? 'text-amber-700 dark:text-amber-500 bg-amber-50/30 dark:bg-amber-900/10' : 'text-neutral-600 dark:text-neutral-300 hover:text-amber-700 dark:hover:text-amber-500'}">
                        <i class="fas ${sub.icon} w-6 text-xs opacity-50 mr-1 rtl:mr-0 rtl:ml-1 text-center"></i> ${sub.label}
                    </a>`;
                }).join('');

                return `
                <div class="mobile-dropdown border-b border-neutral-100 dark:border-neutral-800">
                    <button class="js-mobile-dropdown-btn w-full flex items-center justify-between px-4 py-3.5 text-base font-bold text-neutral-700 dark:text-neutral-200 hover:text-amber-700 dark:hover:text-amber-500 transition-all duration-300 ${isDropdownActive ? 'text-amber-700 dark:text-amber-500 bg-amber-50/50 dark:bg-amber-900/10' : ''}">
                        <span class="flex items-center">
                            <i class="fas ${link.icon} w-6 text-sm opacity-50 mr-2 rtl:mr-0 rtl:ml-2 text-center"></i> ${link.label}
                        </span>
                        <i class="fas fa-chevron-down text-sm transition-transform duration-300 opacity-60"></i>
                    </button>
                    <div class="js-mobile-dropdown-menu hidden bg-neutral-50/30 dark:bg-neutral-900/20 py-1 border-t border-neutral-100 dark:border-neutral-800">
                        ${dropdownItems}
                    </div>
                </div>`;
            }

            const isActive = link.href === currentPage || 
                             (currentPage === '' && link.href === 'index.html');
            return `<a href="${link.href}" class="nav-link flex items-center px-4 py-3.5 text-base font-bold border-b border-neutral-100 dark:border-neutral-800 hover:text-amber-700 dark:hover:text-amber-500 transition-all duration-300 ${isActive ? 'text-amber-700 dark:text-amber-500 bg-amber-50/50 dark:bg-amber-900/10' : 'text-neutral-700 dark:text-neutral-200'}">
                <i class="fas ${link.icon} w-6 text-sm opacity-50 mr-2 rtl:mr-0 rtl:ml-2 text-center"></i> ${link.label}
            </a>`;
        }).join('');

        return `
        <nav id="main-nav" class="sticky top-0 z-50 bg-amber-50/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-amber-100 dark:border-neutral-800 transition-all duration-300">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 xl:px-6">
                <div class="flex justify-between items-center h-20">
                    <!-- Logo -->
                    <a href="index.html" class="flex items-center gap-2 group">
                        ${MASON_JAR_SVG}
                        <span class="font-bold text-xl tracking-tight text-neutral-950 dark:text-amber-100 group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors" style="font-family: 'Playfair Display', serif;">
                            ${BRAND_NAME}
                        </span>
                    </a>

                    <!-- Desktop Nav Links -->
                    <div id="desktop-links" class="hidden xl:flex items-center gap-3 xl:gap-5">
                        ${navLinksDesktop}
                    </div>

                    <!-- Right Side Actions -->
                    <div class="flex items-center gap-2 xl:gap-2.5">
                        <!-- RTL Toggle -->
                        <button id="dir-toggle" class="js-dir-toggle hidden xl:flex w-12 h-10 items-center justify-center rounded-xl bg-amber-100/40 dark:bg-neutral-800 border border-amber-200/50 dark:border-neutral-700 hover:border-amber-500/50 hover:bg-amber-50 dark:hover:bg-neutral-700 transition-all shadow-sm group" aria-label="Toggle text direction">
                            <span class="text-[10px] font-black text-neutral-700 dark:text-neutral-400 group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors uppercase">LTR</span>
                        </button>

                        <!-- Theme Toggle -->
                        <button id="theme-toggle-desktop" class="js-theme-toggle hidden xl:flex w-10 h-10 items-center justify-center rounded-xl bg-amber-100/40 dark:bg-neutral-800 border border-amber-200/50 dark:border-neutral-700 hover:border-amber-500/50 hover:bg-amber-50 dark:hover:bg-neutral-700 transition-all shadow-sm group" aria-label="Toggle theme">
                            <i class="fas fa-moon text-sm text-neutral-600 dark:text-neutral-400 group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors"></i>
                        </button>

                        <!-- Secondary CTA -->
                        <a href="recipes.html" class="hidden xl:inline-block border border-amber-700 text-amber-700 dark:text-amber-500 dark:border-amber-500 hover:bg-amber-700 hover:text-white dark:hover:bg-amber-600 dark:hover:text-white px-3 py-2 xl:px-4 xl:py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-sm whitespace-nowrap">
                            Browse Recipes
                        </a>

                        <!-- Enroll CTA -->
                        <a href="signup.html" class="hidden xl:inline-block bg-amber-700 text-white px-3 py-2 xl:px-4 xl:py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 shadow-lg shadow-amber-700/20 transition-all active:scale-95 btn-shine whitespace-nowrap">
                            Enroll Now
                        </a>

                        <!-- Mobile Menu Button -->
                        <button id="mobile-menu-btn" class="xl:hidden p-2 text-neutral-700 dark:text-neutral-300 focus:outline-none hover:bg-amber-100/50 dark:hover:bg-neutral-800 rounded-lg transition-colors" aria-label="Toggle menu">
                            <i class="fas fa-bars text-2xl" id="menu-icon"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div id="mobile-menu" class="hidden xl:hidden bg-amber-50/95 dark:bg-neutral-900 border-b border-amber-100 dark:border-neutral-800 transition-all duration-300 max-h-[85vh] overflow-y-auto">
                <div class="max-w-7xl mx-auto px-4 pt-4 pb-8">
                    <div class="grid grid-cols-1 gap-1 mb-6">
                        ${navLinksMobile}
                    </div>
                    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-amber-100 dark:border-neutral-850 pt-6">
                        <div class="flex gap-3 w-full sm:w-auto">
                            <button class="js-dir-toggle flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-100/40 dark:bg-neutral-800 border border-amber-200/50 dark:border-neutral-700 transition-all flex-1 sm:flex-none justify-center">
                                <i class="fas fa-exchange-alt text-sm"></i>
                                <span class="text-xs font-bold uppercase tracking-widest">LTR / RTL</span>
                            </button>
                            <button class="js-theme-toggle flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-100/40 dark:bg-neutral-800 border border-amber-200/50 dark:border-neutral-700 transition-all flex-1 sm:flex-none justify-center">
                                <i class="fas fa-moon text-sm"></i>
                                <span class="text-xs font-bold uppercase tracking-widest">Theme</span>
                            </button>
                        </div>
                        <div class="flex gap-2 w-full sm:w-auto">
                            <a href="recipes.html" class="flex-1 sm:flex-none text-center border border-amber-700 text-amber-700 dark:text-amber-500 dark:border-amber-500 hover:bg-amber-700 hover:text-white dark:hover:bg-amber-600 dark:hover:text-white px-5 py-3.5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all">
                                Browse Recipes
                            </a>
                            <a href="signup.html" class="flex-1 sm:flex-none text-center bg-amber-700 text-white px-5 py-3.5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 shadow-lg transition-all">
                                Enroll Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>`;
    }

    // --- Render Footer ---
    function renderFooter() {
        const socialLinksHtml = SOCIAL_LINKS.map(s => 
            `<a href="${s.href}" aria-label="${s.label}" class="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 ${s.hoverColor} hover:-translate-y-1 transition-all duration-300 border border-neutral-200 dark:border-neutral-700 hover:border-amber-500/30 hover:shadow-lg">
                <i class="${s.icon}"></i>
            </a>`
        ).join('');

        return `
        <footer class="bg-amber-50/40 dark:bg-neutral-950 border-t border-amber-100 dark:border-neutral-850 pt-16 pb-6 transition-colors duration-300">
            <div class="max-w-7xl mx-auto px-4">
                <!-- Main Footer Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <!-- Brand Column -->
                    <div class="lg:col-span-1 space-y-6">
                        <a href="index.html" class="flex items-center gap-2 group">
                            ${MASON_JAR_SVG}
                            <span class="font-bold text-xl tracking-tight text-neutral-900 dark:text-amber-100" style="font-family: 'Playfair Display', serif;">${BRAND_NAME}</span>
                        </a>
                        <p class="text-sm text-neutral-600 dark:text-neutral-450 leading-relaxed">
                            ${BRAND_TAGLINE}. Discover the science-backed, living world of home pickling and probiotic-rich ferments.
                        </p>
                        <div class="flex gap-3">
                            ${socialLinksHtml}
                        </div>
                    </div>

                    <!-- Quick Links -->
                    <div class="lg:pl-8">
                        <h4 class="font-bold mb-6 text-neutral-900 dark:text-white uppercase text-xs tracking-widest">Quick Links</h4>
                        <ul class="text-sm space-y-3 text-neutral-600 dark:text-neutral-400">
                            <li><a href="index.html" class="hover:text-amber-700 dark:hover:text-amber-500 hover:pl-2 transition-all duration-200 block">Home</a></li>
                            <li><a href="home2.html" class="hover:text-amber-700 dark:hover:text-amber-500 hover:pl-2 transition-all duration-200 block">Home 2 (Premium)</a></li>
                            <li><a href="workshops.html" class="hover:text-amber-700 dark:hover:text-amber-500 hover:pl-2 transition-all duration-200 block">Workshops</a></li>
                            <li><a href="recipes.html" class="hover:text-amber-700 dark:hover:text-amber-500 hover:pl-2 transition-all duration-200 block">Recipe Library</a></li>
                            <li><a href="pricing.html" class="hover:text-amber-700 dark:hover:text-amber-500 hover:pl-2 transition-all duration-200 block">Pricing Plans</a></li>
                        </ul>
                    </div>

                    <!-- Resources -->
                    <div>
                        <h4 class="font-bold mb-6 text-neutral-900 dark:text-white uppercase text-xs tracking-widest">Resources</h4>
                        <ul class="text-sm space-y-3 text-neutral-600 dark:text-neutral-400">
                            <li><a href="student-dashboard.html" class="hover:text-amber-700 dark:hover:text-amber-500 hover:pl-2 transition-all duration-200 block">Student Dashboard</a></li>
                            <li><a href="admin-dashboard.html" class="hover:text-amber-700 dark:hover:text-amber-500 hover:pl-2 transition-all duration-200 block">Admin Dashboard</a></li>
                            <li><a href="contact.html" class="hover:text-amber-700 dark:hover:text-amber-500 hover:pl-2 transition-all duration-200 block">Contact Us</a></li>
                            <li><a href="coming-soon.html" class="hover:text-amber-700 dark:hover:text-amber-500 hover:pl-2 transition-all duration-200 block">Coming Soon</a></li>
                            <li><a href="404.html" class="hover:text-amber-700 dark:hover:text-amber-500 hover:pl-2 transition-all duration-200 block">404 Page</a></li>
                        </ul>
                    </div>

                    <!-- Newsletter -->
                    <div class="bg-amber-100/30 dark:bg-neutral-900/50 p-6 rounded-2xl border border-amber-200/40 dark:border-neutral-800 transition-all hover:shadow-lg">
                        <h4 class="font-bold mb-2 text-neutral-900 dark:text-white">Stay Cultured 🫙</h4>
                        <p class="text-xs text-neutral-500 dark:text-neutral-400 mb-4">Subscribe for fermentation tips, microbial facts, and new recipes.</p>
                        <form id="newsletter-form" class="space-y-2">
                            <input type="email" required placeholder="Enter your email" 
                                class="w-full px-4 py-3 text-sm bg-white dark:bg-neutral-800 border border-neutral-250 dark:border-neutral-700 focus:border-amber-700 focus:ring-1 focus:ring-amber-700 dark:focus:border-amber-500 dark:focus:ring-amber-500 rounded-xl outline-none transition-all dark:text-white" />
                            <button type="submit" class="w-full bg-amber-700 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white text-sm font-bold py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-amber-700/20">
                                Subscribe
                            </button>
                        </form>
                        <p id="newsletter-success" class="hidden text-[10px] text-green-500 mt-2 font-bold animate-pulse text-center uppercase tracking-wider">Thanks for joining! 🥬</p>
                    </div>
                </div>

                <!-- Bottom Bar -->
                <div class="border-t border-amber-100 dark:border-neutral-850 pt-8 pb-4">
                    <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p class="text-[11px] uppercase tracking-[0.2em] text-neutral-450 dark:text-neutral-400">
                            &copy; ${CURRENT_YEAR} ${BRAND_NAME}. <span class="mx-1">|</span> Nurtured with 💚 & microbes.
                        </p>
                        <div class="flex items-center gap-6">
                            <a href="#" class="text-[10px] uppercase tracking-widest text-neutral-450 dark:text-neutral-400 hover:text-amber-700 dark:hover:text-amber-500 transition-colors">Privacy</a>
                            <a href="#" class="text-[10px] uppercase tracking-widest text-neutral-450 dark:text-neutral-400 hover:text-amber-700 dark:hover:text-amber-500 transition-colors">Terms</a>
                            <a href="#" class="text-[10px] uppercase tracking-widest text-neutral-450 dark:text-neutral-400 hover:text-amber-700 dark:hover:text-amber-500 transition-colors">${PHONE}</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <!-- Back to Top Button -->
        <button id="back-to-top" aria-label="Back to top" class="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-amber-700 text-white border-none cursor-pointer opacity-0 translate-y-5 transition-all duration-300 hover:bg-amber-800 shadow-lg hover:-translate-y-1 hover:scale-105 active:scale-95">
            <i class="fas fa-chevron-up"></i>
        </button>`;
    }

    // --- Inject Global Styles (Cache-proof Equal Heights) ---
    function injectGlobalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .card {
                display: flex !important;
                flex-direction: column !important;
                height: 100% !important;
                align-self: stretch !important;
            }
            .card > *:last-child {
                margin-top: auto !important;
            }
            .pricing-card {
                display: flex !important;
                flex-direction: column !important;
                height: 100% !important;
                align-self: stretch !important;
            }
            .pricing-card .btn {
                margin-top: auto !important;
            }
            .grid-2 {
                display: grid !important;
                grid-template-columns: repeat(2, 1fr) !important;
                gap: 24px !important;
                align-items: stretch !important;
            }
            .grid-3 {
                display: grid !important;
                grid-template-columns: repeat(3, 1fr) !important;
                gap: 24px !important;
                align-items: stretch !important;
            }
            .grid-4 {
                display: grid !important;
                grid-template-columns: repeat(4, 1fr) !important;
                gap: 24px !important;
                align-items: stretch !important;
            }
            /* Universal fix for transform/will-change breaking CSS grid stretch */
            .animate-on-scroll.visible {
                transform: none !important;
                will-change: auto !important;
            }
            @media (max-width: 1024px) {
                .grid-2 {
                    grid-template-columns: 1fr !important;
                }
                .grid-3 {
                    grid-template-columns: repeat(2, 1fr) !important;
                }
                .grid-4 {
                    grid-template-columns: repeat(2, 1fr) !important;
                }
            }
            @media (min-width: 769px) and (max-width: 1024px) {
                .grid-3 > *:last-child:nth-child(odd),
                .grid-4 > *:last-child:nth-child(odd) {
                    grid-column: 1 / span 2 !important;
                    max-width: calc(50% - 12px) !important;
                    width: 100% !important;
                    margin: 0 auto !important;
                }
            }
            @media (max-width: 768px) {
                .grid-3 {
                    grid-template-columns: 1fr !important;
                }
                .grid-4 {
                    grid-template-columns: 1fr !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // --- Initialize Shared Components ---
    function init() {
        injectGlobalStyles();

        // Inject navbar
        const navContainer = document.getElementById('navbar-container');
        if (navContainer) {
            navContainer.innerHTML = renderNavbar();
        }

        // Inject footer
        const footerContainer = document.getElementById('footer-container');
        if (footerContainer) {
            footerContainer.innerHTML = renderFooter();
        }

        // Initialize features
        initTheme();
        initDirection();
        initMobileMenu();
        initScrollEffects();
        initNewsletter();
        initScrollReveal();
        initMobileDropdowns();
    }

    // --- Mobile Navigation Dropdowns ---
    function initMobileDropdowns() {
        const dropdowns = document.querySelectorAll('.mobile-dropdown');
        dropdowns.forEach(dropdown => {
            const btn = dropdown.querySelector('.js-mobile-dropdown-btn');
            const menu = dropdown.querySelector('.js-mobile-dropdown-menu');
            if (btn && menu) {
                btn.addEventListener('click', () => {
                    const isHidden = menu.classList.toggle('hidden');
                    const chevron = btn.querySelector('.fa-chevron-down');
                    if (chevron) {
                        chevron.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
                    }
                });

                // Pre-expand if current page is inside the dropdown submenu
                const sublinks = menu.querySelectorAll('a');
                let hasActive = false;
                sublinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === currentPage) {
                        hasActive = true;
                    }
                });

                if (hasActive) {
                    menu.classList.remove('hidden');
                    const chevron = btn.querySelector('.fa-chevron-down');
                    if (chevron) {
                        chevron.style.transform = 'rotate(180deg)';
                    }
                }
            }
        });
    }

    // --- Theme Logic ---
    function initTheme() {
        const html = document.documentElement;
        const themeBtns = document.querySelectorAll('.js-theme-toggle');

        const setTheme = (isDark) => {
            if (isDark) {
                html.classList.add('dark');
                themeBtns.forEach(btn => {
                    const icon = btn.querySelector('i');
                    if (icon) icon.className = 'fas fa-sun text-sm text-yellow-400';
                    const span = btn.querySelector('span');
                    if (span) span.textContent = 'Light Mode';
                });
                localStorage.setItem('fw-dark-mode', 'true');
            } else {
                html.classList.remove('dark');
                themeBtns.forEach(btn => {
                    const icon = btn.querySelector('i');
                    if (icon) icon.className = 'fas fa-moon text-sm text-neutral-600 dark:text-neutral-400';
                    const span = btn.querySelector('span');
                    if (span) span.textContent = 'Dark Mode';
                });
                localStorage.setItem('fw-dark-mode', 'false');
            }
        };

        themeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                setTheme(!html.classList.contains('dark'));
            });
        });

        // Initialize from storage or system preference
        const storedTheme = localStorage.getItem('fw-dark-mode');
        if (storedTheme === 'true' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setTheme(true);
        } else {
            setTheme(false);
        }
    }

    // --- RTL/LTR Direction Logic ---
    function initDirection() {
        const html = document.documentElement;
        const dirBtns = document.querySelectorAll('.js-dir-toggle');

        const setDir = (dir) => {
            html.setAttribute('dir', dir);
            localStorage.setItem('fw-rtl', dir === 'rtl' ? 'true' : 'false');
            dirBtns.forEach(btn => {
                const span = btn.querySelector('span');
                if (span) {
                    span.textContent = dir === 'rtl' ? 'RTL' : 'LTR';
                } else {
                    btn.textContent = dir.toUpperCase();
                }
            });
        };

        dirBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const currentDir = html.getAttribute('dir') || 'ltr';
                setDir(currentDir === 'ltr' ? 'rtl' : 'ltr');
            });
        });

        // Initialize from storage
        if (localStorage.getItem('fw-rtl') === 'true') {
            setDir('rtl');
        } else {
            setDir('ltr');
        }
    }

    // --- Mobile Menu ---
    function initMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');

        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                const isHidden = mobileMenu.classList.toggle('hidden');
                if (menuIcon) {
                    menuIcon.className = isHidden ? 'fas fa-bars text-2xl' : 'fas fa-times text-2xl';
                }
            });
        }
    }

    // --- Scroll Effects ---
    function initScrollEffects() {
        const backToTop = document.getElementById('back-to-top');
        const nav = document.getElementById('main-nav');

        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;

            // Back to top visibility
            if (backToTop) {
                if (scrollTop > 400) {
                    backToTop.classList.remove('opacity-0', 'translate-y-5');
                    backToTop.classList.add('opacity-100', 'translate-y-0');
                } else {
                    backToTop.classList.remove('opacity-100', 'translate-y-0');
                    backToTop.classList.add('opacity-0', 'translate-y-5');
                }
            }

            // Navbar shadow on scroll
            if (nav) {
                if (scrollTop > 10) {
                    nav.classList.add('shadow-lg', 'bg-amber-50/95', 'dark:bg-neutral-900/95');
                } else {
                    nav.classList.remove('shadow-lg');
                }
            }
        });

        // Back to top click
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // --- Newsletter Form ---
    function initNewsletter() {
        const form = document.getElementById('newsletter-form');
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                const btn = this.querySelector('button');
                const success = document.getElementById('newsletter-success');

                btn.innerHTML = '<i class="fas fa-circle-notch animate-spin"></i> Subscribing...';

                setTimeout(() => {
                    this.classList.add('hidden');
                    if (success) success.classList.remove('hidden');
                }, 1500);
            });
        }
    }

    // --- Scroll Reveal ---
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        if (revealElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => observer.observe(el));
    }

    // --- DOM Ready ---
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
