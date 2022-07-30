import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
// Бібліотека повідомлень користувачу
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const Refs = {
    inputPicker: document.querySelector("#datetime-picker"),
    startPickerBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
}
console.log(Refs.days);

// По дефолту робимо кнопку неактивною
Refs.startPickerBtn.setAttribute("disabled", true);

// Створюємо глобально змінну вибранної дати і присвоюємо їй довільне значення. 
//В функції onClose в цю змінну запишеться значення вибраної дати
let selectedDate = new Date();
console.log('default selectedDate: ', selectedDate);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose,
}

const flatpicker = flatpickr(Refs.inputPicker, options);

// Метод onClose() из обьекта параметров вызывается каждый раз при закрытии элемента интерфейса который создает flatpickr. Именно в нём стоит обрабатывать дату выбранную пользователем. Параметр selectedDates это массив выбранных дат, поэтому мы берем первый элемент.
function onClose(selectedDates) {
    selectedDate = selectedDates[0];
    console.log('new selectedDate: ', selectedDate);
    
    if (selectedDate < options.defaultDate) {
        Notify.failure('Please choose a date in the future');
        return
    }
    Refs.startPickerBtn.removeAttribute("disabled");
    Refs.startPickerBtn.addEventListener("click", onStartBtnClick);  
}

// Функія таймер - вираховує різницю часу, конвертує її та виводить на сторінку
function timer() {
    const delta = selectedDate - new Date();
    const convertedTime = convertMs(delta);

    Refs.days.textContent = convertedTime.days;
    Refs.hours.textContent = convertedTime.hours;
    Refs.minutes.textContent = convertedTime.minutes;
    Refs.seconds.textContent = convertedTime.seconds;

    // console.log(new Date());
    // console.log(delta);
    // console.log(convertMs(delta));
}

// При кліку на кнопку задаємо інтервал виконання функції timer
function onStartBtnClick(evt) {
    const timerId = setInterval(timer, 1000); 
}

// Додає перед одинарним числом
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

// Конвертація мс в читабельний формат
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}