// При прокрутке добавляем класс .scrolled к шапке
(function () {
    const header = document.getElementById('siteHeader');
    const trigger = 30; // пикселей прокрутки до изменения
    function onScroll() {
        if (window.scrollY > trigger) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    document.addEventListener('scroll', onScroll, { passive: true });
    // Вызов сразу на случай загрузки с прокруткой
    onScroll();
})();

// Переключение вкладок Вход / Регистрация
(function () {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const panels = {
        login: document.getElementById('panel-login'),
        register: document.getElementById('panel-register')
    };
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const tab = btn.dataset.tab;
            Object.values(panels).forEach(p => p.classList.remove('active'));
            panels[tab]?.classList.add('active');
        });
    });
})();

// Плавный скролл по якорям меню
(function () {
    document.querySelectorAll('a[href*="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (!href || !href.includes('#')) return;
            const id = href.split('#')[1];
            const el = document.getElementById(id);
            if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.replaceState(null, '', `#${id}`);
            }
        });
    });
})();

// Табы вход/регистрация (надёжно с aria)
(function () {
    const tabs = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.auth-panel');
    function activate(key) {
        tabs.forEach(b => {
            const on = b.dataset.tab === key;
            b.classList.toggle('active', on);
            b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        panels.forEach(p => {
            const on = p.id === `panel-${key}`;
            p.classList.toggle('active', on);
            p.setAttribute('aria-hidden', on ? 'false' : 'true');
        });
    }
    tabs.forEach(b => b.addEventListener('click', () => activate(b.dataset.tab)));
    activate('login'); // дефолт
})();

// Если пришли с #message (после редиректа) — проскроллим к секции
(function () {
    if (location.hash) {
        const el = document.getElementById(location.hash.substring(1));
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
})();

// Smooth scroll with header offset; skip external paths
(function () {
    const header = document.getElementById('siteHeader');
    const getOffset = () => (header ? header.offsetHeight + 12 : 0);

    document.querySelectorAll('a[href*="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href') || "";
            if (!href.includes('#')) return;
            const [path, hash] = href.split('#');
            const samePage = !path || path === location.pathname || (link.pathname === location.pathname);
            if (!samePage) return;

            const target = document.getElementById(hash);
            if (!target) return;

            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.pageYOffset - getOffset();
            window.scrollTo({ top, behavior: 'smooth' });
            history.replaceState(null, '', `#${hash}`);
        });
    });

    window.addEventListener('load', () => {
        if (location.hash) {
            const el = document.getElementById(location.hash.substring(1));
            if (el) {
                const top = el.getBoundingClientRect().top + window.pageYOffset - getOffset();
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }
    });
})();
// === Auth modal open/close + tabs (центровка уже в CSS) ===
(function () {
    const modal = document.getElementById('authModal');
    if (!modal) return;

    const openBtns = document.querySelectorAll('.js-open-auth');
    const closeBtns = modal.querySelectorAll('.js-modal-close');
    const tabs = modal.querySelectorAll('.tab-btn');
    const panels = {
        login: modal.querySelector('#auth-login'),
        register: modal.querySelector('#auth-register')
    };

    function openModal() {
        modal.classList.add('open');
        document.body.classList.add('noscroll');
        switchTab('login');
    }
    function closeModal() {
        modal.classList.remove('open');
        document.body.classList.remove('noscroll');
    }
    function switchTab(key) {
        tabs.forEach(b => {
            const on = b.dataset.tab === key;
            b.classList.toggle('active', on);
            b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        Object.entries(panels).forEach(([k, el]) => {
            el.classList.toggle('active', k === key);
            el.setAttribute('aria-hidden', k === key ? 'false' : 'true');
        });
    }

    openBtns.forEach(b => b.addEventListener('click', e => { e.preventDefault(); openModal(); }));
    closeBtns.forEach(b => b.addEventListener('click', closeModal));
    modal.addEventListener('click', e => { if (e.target.classList.contains('modal-backdrop')) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
    tabs.forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));
})();

// === Auth modal open/close + tabs ===
(function () {
    const modal = document.getElementById('authModal');
    if (!modal) return;

    const openBtns = document.querySelectorAll('.js-open-auth');
    const closeBtns = modal.querySelectorAll('.js-modal-close');
    const tabs = modal.querySelectorAll('.tab-btn');
    const panels = {
        login: modal.querySelector('#auth-login'),
        register: modal.querySelector('#auth-register')
    };

    function openModal() {
        modal.classList.add('open');
        document.body.classList.add('noscroll');
        switchTab('login');
    }
    function closeModal() {
        modal.classList.remove('open');
        document.body.classList.remove('noscroll');
    }
    function switchTab(key) {
        tabs.forEach(b => {
            const on = b.dataset.tab === key;
            b.classList.toggle('active', on);
            b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
        Object.entries(panels).forEach(([k, el]) => {
            el.classList.toggle('active', k === key);
            el.setAttribute('aria-hidden', k === key ? 'false' : 'true');
        });
    }

    openBtns.forEach(b => b.addEventListener('click', e => { e.preventDefault(); openModal(); }));
    closeBtns.forEach(b => b.addEventListener('click', closeModal));
    modal.addEventListener('click', e => { if (e.target.classList.contains('modal-backdrop')) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
    tabs.forEach(b => b.addEventListener('click', () => switchTab(b.dataset.tab)));
})();
