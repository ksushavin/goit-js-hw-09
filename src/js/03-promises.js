import { Notify } from 'notiflix/build/notiflix-notify-aio';

const Refs = {
  firstDelay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  createPromisesBtn: document.querySelector('form button')
}

Refs.createPromisesBtn.addEventListener("click", onCreatePromisesBtnClick);

function onCreatePromisesBtnClick(evt) {
  evt.preventDefault();
  const step = Number(Refs.step.value);
  const amount = Number(Refs.amount.value);
  const firstDelay = Number(Refs.firstDelay.value);
  let delay = firstDelay;

  for (let i = 1; i <= amount; i+=1) {
    let position = i;
    
    createPromise(position, delay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
        })
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
          resolve ({
          position,
          delay
          })
      } else {
        reject ({
        position,
        delay
        })
      }
    }, delay);
  })
}
