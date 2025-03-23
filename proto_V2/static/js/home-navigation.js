document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("#nav > a").forEach(elem => {
        elem.addEventListener(
            "click",
            function (event) {
                event.preventDefault();
                const url = event.target.href;
                const direction = event.target.dataset.direction;
                const head = document.querySelector('head');
                const style = document.createElement('style');
                head.appendChild(style);

                if (direction) {
                    let keyframes;
                    switch (direction) {
                        case "top":
                            keyframes = ':root { --transfromStartSlideOut: translateY(0%); --transfromEndSlideOut: translateY(-100%); }';
                            style.appendChild(document.createTextNode(keyframes));
                            break;

                        case "bottom":
                            keyframes = ':root { }';
                            style.appendChild(document.createTextNode(keyframes));
                            break;

                        case "left":
                            keyframes = ':root { }';
                            style.appendChild(document.createTextNode(keyframes));
                            break;

                        case "right":
                            keyframes = ':root { }';
                            style.appendChild(document.createTextNode(keyframes));
                            break;
                    }
                }
                window.location.href = url;
            }
        );
    });
});