/* ============================================
   Pickling Supply Co.
   Global JavaScript
   ============================================ */

// ---- Dark Mode Toggle ----
function initDarkMode() {
    const stored = localStorage.getItem('fw-dark-mode');
    if (stored === 'true') {
        document.documentElement.classList.add('dark');
    }
    document.querySelectorAll('.dark-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            localStorage.setItem('fw-dark-mode', isDark);
            updateDarkIcons();
        });
    });
    updateDarkIcons();
}

function updateDarkIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    document.querySelectorAll('.dark-toggle i').forEach(icon => {
        icon.className = isDark ? 'fas fa-sun text-yellow-400' : 'fas fa-moon';
    });
}

// ---- RTL Toggle ----
function initRTL() {
    const stored = localStorage.getItem('fw-rtl');
    if (stored === 'true') {
        document.documentElement.setAttribute('dir', 'rtl');
    }
    document.querySelectorAll('.rtl-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
            document.documentElement.setAttribute('dir', isRtl ? 'ltr' : 'rtl');
            localStorage.setItem('fw-rtl', !isRtl);
        });
    });
}

// ---- Mobile Nav Toggle ----
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ---- Active Nav Link ----
function initActiveNav() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-nav a:not(.btn)').forEach(link => {
        const href = link.getAttribute('href');
        if (href === current || (current === '' && href === 'index.html') || (current === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ---- Password Visibility Toggle ----
function initPasswordToggles() {
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.closest('.input-wrapper').querySelector('input');
            const icon = btn.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'fa-solid fa-eye-slash';
            } else {
                input.type = 'password';
                icon.className = 'fa-solid fa-eye';
            }
        });
    });
}

// ---- Sidebar Toggle (Dashboard) ----
function initSidebar() {
    const toggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('active');
    });

    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    }
}

// ---- Dashboard Tab Navigation ----
function initDashboardTabs() {
    const navLinks = document.querySelectorAll('.sidebar-nav a[data-section]');
    const sections = document.querySelectorAll('.dash-section');
    if (!navLinks.length || !sections.length) return;

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-section');

            // Update active nav
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show target section
            sections.forEach(s => s.classList.remove('active'));
            const targetSection = document.getElementById(target);
            if (targetSection) targetSection.classList.add('active');

            // Update topbar title
            const topTitle = document.querySelector('.topbar-left h1');
            if (topTitle) topTitle.textContent = link.textContent.trim();

            // Close mobile sidebar
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.querySelector('.sidebar-overlay');
            if (sidebar) sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
        });
    });
}

// ---- Accordion ----
function initAccordion() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const body = item.querySelector('.accordion-body');
            const isActive = item.classList.contains('active');

            // Close all
            item.closest('.accordion')?.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-body').style.maxHeight = '0';
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });
}

// ---- Filter Tabs ----
function initFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab');
    const items = document.querySelectorAll('[data-category]');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const filter = tab.getAttribute('data-filter');

            items.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = '';
                    item.style.animation = 'scaleIn 0.35s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ---- Scroll Animations ----
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ---- Animated Counters ----
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = 'true';
                const target = parseInt(entry.target.getAttribute('data-count'));
                const suffix = entry.target.getAttribute('data-suffix') || '';
                const prefix = entry.target.getAttribute('data-prefix') || '';
                let current = 0;
                const step = Math.ceil(target / 60);
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = prefix + current.toLocaleString() + suffix;
                }, 25);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

// ---- Mason Jar SVG Logo ----
function getMasonJarSVG(size = 36) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="46" stroke="var(--logo-primary)" stroke-width="1.5" stroke-opacity="0.25" fill="none"/>
        <circle cx="50" cy="50" r="42" stroke="var(--logo-primary)" stroke-width="0.75" stroke-dasharray="3 3" stroke-opacity="0.4" fill="none"/>
        <path d="M38 18h24v4H38z" fill="var(--logo-primary)" rx="1"/>
        <path d="M35 22h30v5a2 2 0 0 1-2 2H37a2 2 0 0 1-2-2v-5z" fill="var(--logo-primary)"/>
        <line x1="40" y1="24" x2="40" y2="28" stroke="var(--cream, #FAF6F0)" stroke-width="0.75" opacity="0.6"/>
        <line x1="45" y1="24" x2="45" y2="28" stroke="var(--cream, #FAF6F0)" stroke-width="0.75" opacity="0.6"/>
        <line x1="50" y1="24" x2="50" y2="28" stroke="var(--cream, #FAF6F0)" stroke-width="0.75" opacity="0.6"/>
        <line x1="55" y1="24" x2="55" y2="28" stroke="var(--cream, #FAF6F0)" stroke-width="0.75" opacity="0.6"/>
        <line x1="60" y1="24" x2="60" y2="28" stroke="var(--cream, #FAF6F0)" stroke-width="0.75" opacity="0.6"/>
        <path d="M 35 29 C 32 35, 26 38, 26 48 L 26 84 C 26 89, 30 92, 36 92 L 64 92 C 70 92, 74 89, 74 84 L 74 48 C 74 38, 68 35, 65 29 Z" fill="var(--logo-glass-fill)" stroke="var(--logo-primary)" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M 30 46 L 30 82" stroke="var(--cream, #FAF6F0)" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/>
        <line x1="64" y1="46" x2="70" y2="46" stroke="var(--logo-primary)" stroke-width="1.5" opacity="0.5" stroke-linecap="round"/>
        <line x1="66" y1="54" x2="70" y2="54" stroke="var(--logo-primary)" stroke-width="1.2" opacity="0.5" stroke-linecap="round"/>
        <line x1="64" y1="62" x2="70" y2="62" stroke="var(--logo-primary)" stroke-width="1.5" opacity="0.5" stroke-linecap="round"/>
        <line x1="66" y1="70" x2="70" y2="70" stroke="var(--logo-primary)" stroke-width="1.2" opacity="0.5" stroke-linecap="round"/>
        <line x1="64" y1="78" x2="70" y2="78" stroke="var(--logo-primary)" stroke-width="1.5" opacity="0.5" stroke-linecap="round"/>
        <rect x="29" y="38" width="42" height="6" rx="2" fill="var(--logo-primary)" opacity="0.12"/>
        <rect x="29" y="38" width="42" height="6" rx="2" fill="none" stroke="var(--logo-primary)" stroke-width="1" stroke-dasharray="2 2" opacity="0.5"/>
        <rect x="36" y="54" width="28" height="20" rx="3" fill="var(--cream, #FAF6F0)" stroke="var(--logo-primary)" stroke-width="1.2" opacity="0.9"/>
        <path d="M 50 60 L 51.5 63.5 L 55 63.5 L 52 65.5 L 53.5 69 L 50 67 L 46.5 69 L 48 65.5 L 45 63.5 L 48.5 63.5 Z" fill="var(--logo-primary)" opacity="0.8"/>
    </svg>`;
}

// ---- Get Favicon SVG data URL ----
function getFaviconSVG() {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='none'%3E%3Ccircle cx='50' cy='50' r='46' stroke='%23B5651D' stroke-width='1.5' stroke-opacity='0.25' fill='none'/%3E%3Ccircle cx='50' cy='50' r='42' stroke='%23B5651D' stroke-width='0.75' stroke-dasharray='3 3' stroke-opacity='0.4' fill='none'/%3E%3Cpath d='M38 18h24v4H38z' fill='%23B5651D' rx='1'/%3E%3Cpath d='M35 22h30v5a2 2 0 0 1-2 2H37a2 2 0 0 1-2-2v-5z' fill='%23B5651D'/%3E%3Cline x1='40' y1='24' x2='40' y2='28' stroke='%23FAF6F0' stroke-width='0.75' opacity='0.6'/%3E%3Cline x1='45' y1='24' x2='45' y2='28' stroke='%23FAF6F0' stroke-width='0.75' opacity='0.6'/%3E%3Cline x1='50' y1='24' x2='50' y2='28' stroke='%23FAF6F0' stroke-width='0.75' opacity='0.6'/%3E%3Cline x1='55' y1='24' x2='55' y2='28' stroke='%23FAF6F0' stroke-width='0.75' opacity='0.6'/%3E%3Cline x1='60' y1='24' x2='60' y2='28' stroke='%23FAF6F0' stroke-width='0.75' opacity='0.6'/%3E%3Cpath d='M35 29 C 32 35, 26 38, 26 48 L 26 84 C 26 89, 30 92, 36 92 L 64 92 C 70 92, 74 89, 74 84 L 74 48 C 74 38, 68 35, 65 29 Z' fill='%23B5651D' fill-opacity='0.12' stroke='%23B5651D' stroke-width='2.5' stroke-linejoin='round'/%3E%3Cpath d='M30 46 L 30 82' stroke='%23FAF6F0' stroke-width='1.5' stroke-linecap='round' opacity='0.3'/%3E%3Cline x1='64' y1='46' x2='70' y2='46' stroke='%23B5651D' stroke-width='1.5' opacity='0.5' stroke-linecap='round'/%3E%3Cline x1='66' y1='54' x2='70' y2='54' stroke='%23B5651D' stroke-width='1.2' opacity='0.5' stroke-linecap='round'/%3E%3Cline x1='64' y1='62' x2='70' y2='62' stroke='%23B5651D' stroke-width='1.5' opacity='0.5' stroke-linecap='round'/%3E%3Cline x1='66' y1='70' x2='70' y2='70' stroke='%23B5651D' stroke-width='1.2' opacity='0.5' stroke-linecap='round'/%3E%3Cline x1='64' y1='78' x2='70' y2='78' stroke='%23B5651D' stroke-width='1.5' opacity='0.5' stroke-linecap='round'/%3E%3Crect x='29' y='38' width='42' height='6' rx='2' fill='%23B5651D' opacity='0.12'/%3E%3Crect x='29' y='38' width='42' height='6' rx='2' fill='none' stroke='%23B5651D' stroke-width='1' stroke-dasharray='2 2' opacity='0.5'/%3E%3Crect x='36' y='54' width='28' height='20' rx='3' fill='%23FAF6F0' stroke='%23B5651D' stroke-width='1.2' opacity='0.9'/%3E%3Cpath d='M 50 60 L 51.5 63.5 L 55 63.5 L 52 65.5 L 53.5 69 L 50 67 L 46.5 69 L 48 65.5 L 45 63.5 L 48.5 63.5 Z' fill='%23B5651D' opacity='0.8'/%3E%3C/svg%3E";
}

// ---- Navbar Scroll Effect ----
function initNavScroll() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            nav.style.boxShadow = '0 2px 20px rgba(44,36,24,0.08)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });
}

// ---- Dynamic Bubbles Generator ----
function initDynamicBubbles() {
    const containers = document.querySelectorAll('.bubbles-container');
    containers.forEach(container => {
        container.innerHTML = '';
        const count = parseInt(container.getAttribute('data-bubble-count')) || 12;
        for (let i = 0; i < count; i++) {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            const size = Math.random() * 12 + 6;
            const left = Math.random() * 100;
            const duration = Math.random() * 6 + 5;
            const delay = Math.random() * 6;
            
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${left}%`;
            bubble.style.animationDuration = `${duration}s`;
            bubble.style.animationDelay = `${delay}s`;
            
            container.appendChild(bubble);
        }
    });
}

// ---- Init Everything ----
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initRTL();
    initMobileNav();
    initActiveNav();
    initPasswordToggles();
    initSidebar();
    initDashboardTabs();
    initAccordion();
    initFilterTabs();
    initScrollAnimations();
    initCounters();
    initNavScroll();
    initDynamicBubbles();
});

