window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(21, 101, 192, 0.9)';
        header.style.transition = '0.4s';
    } else {
        header.style.background = 'linear-gradient(180deg, #e3f2fd, #ffffff)';
    }
});
