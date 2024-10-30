const database_url = 'https://landing-b540a-default-rtdb.firebaseio.com/coleccion.json'

let sendData = (data) => {

    fetch(database_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json();
        })
        .then(result => {
            alert('Agradeciendo tu preferencia, nos mantenemos actualizados y enfocados en atenderte como mereces');
            form.reset();
            getData();
        })
        .catch(error => {
            alert('Hubo un problema, intentalo de nuevo!');
            console.log(error);
        })
}

let getData = async () => {
    try {
        const response = await fetch(database_url, {
            method: "GET"
        });
        if(!response.ok){
            alert("No se pudo recuperar la información del servidor.");
        }
        const data = await response.json();
        if(data != null){
            let subscriberCount = new Map();
            for(key of Object.keys(data)){
                const { saved, email } = data[key];
                date = saved.split(",")[0];
                let counter = subscriberCount.get(date);
                counter ? subscriberCount.set(date, counter + 1): subscriberCount.set(date, 1);
            }
            if(subscriberCount.size > 0){
                let subscriberTable = document.getElementById("subscribers");
                subscriberTable.innerHTML = "";
                let index = 0;
                for(let [date, count] of subscriberCount){
                    index++;
                    let rowTemplate = `
                    <tr>
                        <th>${index}</th>
                        <td>${date}</td>
                        <td>${count}</td>
                    </tr>`;                   
                    subscriberTable.innerHTML += rowTemplate;
                }
            }
        }
    }
    catch(error){
        console.log(error);
        alert("Ha ocurrido un error");
    }
}

let ready = () => {
    getData();
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
            return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        data['saved'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' });
        sendData(data);
    })
}

window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded);