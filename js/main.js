let ready = () => {
    console.log('DOM está listo')
}

let loaded = () => {
    console.log('Iframes e Images cargadas')
    let myform = document.getElementById('form');
    myform.addEventListener('submit', (eventSubmit) => {
        eventSubmit.preventDefault();
        let emailElement = document.getElementsByClassName('form-control form-control-lg')[0];
        let emailText = emailElement.value;
        if (emailText.length === 0) {
            emailElement.focus();
            emailElement.animate(
                [
                    { transform: "translateX(0)" },
                    { transform: "translateX(50px)" },
                    { transform: "translateX(-50px)" },
                    { transform: "translateX(0)" }
                ],
                {
                    duration: 400,
                    easing: "linear",
                }
            )
        }
    })
}

window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded);