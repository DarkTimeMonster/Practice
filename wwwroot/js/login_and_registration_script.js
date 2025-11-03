document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.querySelector('.auth-modal-overlay');
    const openLogin = document.getElementById('open-login');
    const openRegister = document.getElementById('open-register');
    const closeBtns = document.querySelectorAll('.auth-close');

    if (openLogin) openLogin.addEventListener('click', () => {
        overlay.classList.add('active');
        document.querySelector('.auth-modal').classList.remove('register-mode');
    });
    if (openRegister) openRegister.addEventListener('click', () => {
        overlay.classList.add('active');
        document.querySelector('.auth-modal').classList.add('register-mode');
    });

    closeBtns.forEach(b => b.addEventListener('click', () => overlay.classList.remove('active')));
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('active');
    });

    // переключение внутри модалки (если есть кнопки)
    document.addEventListener('click', (e) => {
        if (e.target.matches('.to-register')) {
            document.querySelector('.auth-modal').classList.add('register-mode');
        }
        if (e.target.matches('.to-login')) {
            document.querySelector('.auth-modal').classList.remove('register-mode');
        }
    });
});
