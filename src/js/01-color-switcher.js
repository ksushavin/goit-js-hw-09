
bodyRef = document.querySelector("body");
startBtnRef = document.querySelector('button[data-start]');
stopBtnRef = document.querySelector('button[data-stop]');

startBtnRef.addEventListener("click", onStartBtnClick);
stopBtnRef.addEventListener("click", onStopBtnClick);
let timerId = null;

function onStartBtnClick() {
    timerId = setInterval(changeBodyBg, 1000);
    startBtnRef.setAttribute("disabled", true);
    stopBtnRef.removeAttribute("disabled");
};

function onStopBtnClick() {
    clearInterval(timerId);
    startBtnRef.removeAttribute("disabled");
    stopBtnRef.setAttribute("disabled", true);
};

function changeBodyBg() {
    bodyRef.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}