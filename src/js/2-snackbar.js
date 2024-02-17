import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener('submit', onSubmitForm)

function onSubmitForm(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const delay = formData.get('delay');
    const state = formData.get('state');


    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    promise.then((delay) => {
        return iziToast.success({
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topRight',
        });
    }).catch((delay) => {
        return iziToast.error({
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'topRight',
        });
    });

    form.reset()
}