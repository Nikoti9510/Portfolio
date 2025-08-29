document.addEventListener("DOMContentLoaded", () => {
    const randomImgArray = document.querySelectorAll('.faces--imgs img');
    function randomImg(min, max) {
        let rand = Math.floor(Math.random() * (max - min + 1)) + min;
        randomImgArray[rand].style.setProperty('opacity', '1');
    }
});