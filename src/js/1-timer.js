import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinuts = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]')
const dateTime = document.querySelector("#datetime-picker")

const date = new Date()
const dateNow = date.getTime();
let timeTill = 0;
startBtn.setAttribute('disabled', true);

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < new Date()) {
            return iziToast.error({
                message: 'Please choose a date in the future',
                position: 'topRight',
            });
        }
        startBtn.removeAttribute('disabled');
        timeTill = selectedDates[0].getTime() - dateNow;

    },
};

flatpickr(dateTime, options)


const addLeadingZero = value => String(value).padStart(2, 0);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}




startBtn.addEventListener("click", onClickStart);

function onClickStart(event) {

    let timerId = setInterval(() => {
        const { days, hours, minutes, seconds } = convertMs(timeTill)

        if (timeTill < 1) {
            clearInterval(timerId);
            return
        }
        timeTill -= 1000

        dataDays.textContent = addLeadingZero(days);
        dataHours.textContent = addLeadingZero(hours);
        dataMinuts.textContent = addLeadingZero(minutes);
        dataSeconds.textContent = addLeadingZero(seconds);
        startBtn.setAttribute('disabled', true);
        dateTime.setAttribute('disabled', true);

    }, 1000)
}


