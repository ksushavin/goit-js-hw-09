import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const Refs = {
    inputPicker: document.querySelector("#datetime-picker"),
    startPickerBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
}

Refs.startPickerBtn.setAttribute("disabled", true);
Refs.startPickerBtn.addEventListener("click", onStartBtnClick);
let timerId = null; 
let selectedDate = new Date();

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose,
}

const flatpicker = flatpickr(Refs.inputPicker, options);

function onClose(selectedDates) {
    selectedDate = selectedDates[0];
    console.log('new selectedDate: ', selectedDate);
    
    if (selectedDate < options.defaultDate) {
        Notify.failure('Please choose a date in the future');
        return
    }
    Refs.startPickerBtn.removeAttribute("disabled");  
}

function onStartBtnClick(evt) {
    timerId = setInterval(timer, 1000);
    Refs.startPickerBtn.setAttribute("disabled", true);
    Refs.inputPicker.setAttribute("disabled", true);
}

function timer() {
    const delta = selectedDate - new Date();

    if (delta <= 0 ) {
        clearInterval(timerId);
        Refs.inputPicker.removeAttribute("disabled");
        return
    }
    const convertedTime = convertMs(delta);
    Refs.days.textContent = convertedTime.days;
    Refs.hours.textContent = convertedTime.hours;
    Refs.minutes.textContent = convertedTime.minutes;
    Refs.seconds.textContent = convertedTime.seconds;
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
    
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
