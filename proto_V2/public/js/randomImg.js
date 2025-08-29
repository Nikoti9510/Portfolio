const randomImgArray = document.querySelectorAll('.faces--imgs img');
const maxValue = randomImgArray.length - 1;
let faces = document.querySelector('.faces')
let value = 0;
faces.addEventListener('click', () => {
    value = isNaN(value)
        ? 1
        : value < maxValue
            ? value + 1
            : (randomImgArray.item(maxValue)?.classList.remove('activeImg'), 0);
    randomImgArray.item(value - 1)?.classList.remove('activeImg');
    randomImgArray.item(value).classList.add('activeImg');
});