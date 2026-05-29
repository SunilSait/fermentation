/* ============================================
   Fermentation Workshop & Pickling Supply Co.
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
        <rect x="28" y="8" width="44" height="8" rx="2" fill="var(--logo-primary)" opacity="0.7"/>
        <rect x="32" y="4" width="36" height="6" rx="2" fill="var(--logo-primary)"/>
        <rect x="25" y="16" width="50" height="80" rx="8" fill="var(--logo-glass-fill)" stroke="var(--logo-primary)" stroke-width="2.5"/>
        <rect x="30" y="50" width="40" height="36" rx="3" fill="var(--logo-label-fill)"/>
        <circle cx="42" cy="62" r="4" fill="var(--logo-liquid-fill)" opacity="0.6"/>
        <circle cx="55" cy="58" r="3" fill="var(--logo-liquid-fill)" opacity="0.5"/>
        <circle cx="48" cy="72" r="3.5" fill="var(--logo-liquid-fill)" opacity="0.55"/>
        <circle cx="38" cy="78" r="2.5" fill="var(--logo-liquid-fill)" opacity="0.4"/>
        <circle cx="58" cy="70" r="3" fill="var(--logo-liquid-fill)" opacity="0.45"/>
        <path d="M35 46 Q50 38 65 46" stroke="var(--logo-primary)" stroke-width="1.5" fill="none" opacity="0.5"/>
    </svg>`;
}

// ---- Get Favicon SVG data URL ----
function getFaviconSVG() {
    return "data:image/svg+xml," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect x='28' y='8' width='44' height='8' rx='2' fill='%23B5651D' opacity='0.7'/><rect x='32' y='4' width='36' height='6' rx='2' fill='%23B5651D'/><rect x='25' y='16' width='50' height='80' rx='8' fill='%23B5651D' opacity='0.15' stroke='%23B5651D' stroke-width='2.5'/><rect x='30' y='50' width='40' height='36' rx='3' fill='%23B5651D' opacity='0.25'/><circle cx='42' cy='62' r='4' fill='%236B8F71' opacity='0.6'/><circle cx='55' cy='58' r='3' fill='%236B8F71' opacity='0.5'/><circle cx='48' cy='72' r='3.5' fill='%236B8F71' opacity='0.55'/></svg>`);
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

