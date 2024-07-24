import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

const { form, delay, step, amount } = refs;

form.addEventListener('submit', promiseGenerator);

function promiseGenerator(event) {
  event.preventDefault();

  if (delay.value < 1 || step.value < 1 || step.value < 1) {
    Notify.failure(`Please input a positive value`);
    form.reset();
    return;
  }

  let delayValue = Number(delay.value);
  for (let positionValue = 1; positionValue <= amount.value; positionValue++) {
    createPromise(positionValue, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`Fullfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ posiiton, delay }) => {
        Notify.failure(`Rejected promise ${posiiton} in ${delay}ms`);
      });
    delayValue += Number(step.value);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}
