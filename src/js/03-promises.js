import { Notify } from 'notiflix/build/notiflix-notify-aio';

const Refs = {
  firstDelay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  createPromisesBtn: document.querySelector('form button')
}

Refs.createPromisesBtn.addEventListener("click", onCreatePromisesBtnClick);

function onCreatePromisesBtnClick(evt) {
  // Витягуємо введені в інпути значення
  evt.preventDefault();
  const step = Number(Refs.step.value);
  const amount = Number(Refs.amount.value);
  const firstDelay = Number(Refs.firstDelay.value);
  // console.log(step);
  // console.log(amount);
  // console.log(firstDelay);

  // На кожній ітерації вираховуємо номер промісу і його затримку
  for (let i = 0; i < amount; i+=1) {
    let position = i +1;
    let delay = firstDelay+(i * step);
    console.log('position', position);
    console.log('delay', delay);

    // Викликаємо createPromise на кожній ітерації з відповідною затримкою та 
    // відразу передаємо результати в then і catch.
    setTimeout(() => {
      createPromise(position, delay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
          // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
          // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        })
    }, delay);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  
  return new Promise((resolve, reject) => {
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
  })
}
