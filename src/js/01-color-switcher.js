function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const body = document.querySelector('body');
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let colorChangeInterval = null;

const start = () => {
  colorChangeInterval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    btnStart.disabled = true;
    btnStop.disabled = false;
  }, 1000);
};

const stop = () => {
  clearInterval(colorChangeInterval);
  btnStop.disabled = true;
  btnStart.disabled = false;
};

btnStop.disabled = true;

btnStart.addEventListener('click', start);
btnStop.addEventListener('click', stop);
