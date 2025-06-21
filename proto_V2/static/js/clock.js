document.addEventListener("DOMContentLoaded", getTime());

function getTime() {
  let clock = document.querySelector("#clock .clock__time");
  let options = {
      timeZone: "Europe/Paris",
      hour: "numeric",
      minute: "numeric"
    },
    formatter = new Intl.DateTimeFormat([], options);
  let date = formatter.format(new Date());
  clock.innerHTML = date;
}

setInterval(() => {
  getTime();
}, 5000); // Pas optimal, mais c'est le plus simple et léger à implémenter. 