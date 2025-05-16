// Inspiré de : http://webtips.dev/draggable-html-elements
document.addEventListener("DOMContentLoaded", () => {
    const draggableElements = document.querySelectorAll('.draggable');

    const position = {
        x: 0,
        y: 0
    }

    draggableElements.forEach(function (element) {
        element.onmousedown = event => {
            position.x = event.clientX;
            position.y = event.clientY;
        
            document.onmousemove = documentEvent => {
                const x = position.x - documentEvent.clientX;
                const y = position.y - documentEvent.clientY;
                
                position.x = documentEvent.clientX;
                position.y = documentEvent.clientY;
        
                let newTop = element.offsetTop - y + 'px';
                let newLeft = element.offsetLeft - x + 'px'
                element.style = `grid-area: initial; top: ${newTop}; left: ${newLeft};` ;
            }
        
            document.onmouseup = () => {
                document.onmouseup = null;
                document.onmousemove = null;
            }
        }
    });
});