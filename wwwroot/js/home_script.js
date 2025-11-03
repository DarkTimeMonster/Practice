document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.services-carousel');
    const left = document.querySelector('.arrow.left');
    const right = document.querySelector('.arrow.right');

    if (!wrapper) return;

    const cardWidth = wrapper.querySelector('.service-card')?.offsetWidth || 300;
    left?.addEventListener('click', () => {
        wrapper.scrollBy({ left: -cardWidth - 18, behavior: 'smooth' });
    });
    right?.addEventListener('click', () => {
        wrapper.scrollBy({ left: cardWidth + 18, behavior: 'smooth' });
    });
});
