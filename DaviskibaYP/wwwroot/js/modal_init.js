// modal open/close + tabs
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
        document.body.classList.add('noscroll'); // если хочешь блокировать прокрутку фона — добавь в CSS body.noscroll{overflow:hidden;}
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
