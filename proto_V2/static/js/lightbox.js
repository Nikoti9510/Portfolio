document.addEventListener("DOMContentLoaded", () => {

    const zoomContainers = document.querySelectorAll('.image__lightbox--img');

    zoomContainers.forEach(container => {
        const img = container.querySelector('img');
        let zoomed = false;
        let origin = { x: 50, y: 50 };

        container.addEventListener('click', (e) => {
            img.classList.toggle("zoomed");
            const rect = container.getBoundingClientRect();
            origin.x = ((e.clientX - rect.left) / rect.width) * 100;
            origin.y = ((e.clientY - rect.top) / rect.height) * 100;
            zoomed = !zoomed;

            img.style.cursor = zoomed ? 'zoom-out' : 'zoom-in';

            if (zoomed) {
                img.style.transformOrigin = `${origin.x}% ${origin.y}%`;
                img.style.transform = 'scale(1.75)';
            } else {
                img.style.transform = 'scale(1)';
                img.style.transformOrigin = 'center center';
            }
        });

        container.addEventListener('mousemove', (e) => {
            if (!zoomed) return;

            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            const offsetX = origin.x - x;
            const offsetY = origin.y - y;

            img.style.transformOrigin = `${origin.x}% ${origin.y}%`;
            img.style.transform = `scale(1.75) translateZ(1px) translate(${offsetX}%, ${offsetY}%)`;
        });
    });
});