(function () {
    const el = document.getElementById('map');
    if (!el || typeof L === 'undefined') return;

    // Координаты офиса (пример: Москва, Охотный ряд)
    const coords = [55.7577, 37.6150];     // замени на свои, если нужно
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

    const map = L.map(el, { scrollWheelZoom: false }).setView(coords, 14);

    L.tileLayer(tileUrl, {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    L.marker(coords).addTo(map)
        .bindPopup('<b>GastroFest</b><br>Москва, ул. Вкусная, 7')
        .openPopup();

    // Если карта иногда «обрезается» внутри скрытых табов/контейнеров:
    setTimeout(() => map.invalidateSize(), 300);
})();
