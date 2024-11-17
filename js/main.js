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
            alert('Tu opinión ha sido enviada!');
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
            let gameCount = new Map();
            let monsterCount = new Map();
            for(key of Object.keys(data)){
                const { choices, monster } = data[key];
                let counter = monsterCount.get(monster);
                counter ? monsterCount.set(monster, counter + 1): monsterCount.set(monster, 1);
                counter = gameCount.get(`Monster Hunter ${choices}`);
                counter ? gameCount.set(`Monster Hunter ${choices}`, counter + 1): gameCount.set(`Monster Hunter ${choices}`, 1);
            }
            if(monsterCount.size > 0){
                let monsterTable = document.getElementById("monsters");
                monsterTable.innerHTML = "";
                let index = 0;
                let monsterList = [];
                for(let [monster, count] of monsterCount){
                    monsterList.push({monster : monster, count : count});
                }
                monsterList.sort((a, b) => b.count - a.count);
                for(let entry of monsterList){
                    index++;
                    let rowTemplate = `
                    <tr>
                        <th>${index}</th>
                        <td>${entry.monster}</td>
                        <td>${entry.count}</td>
                    </tr>`;                   
                    monsterTable.innerHTML += rowTemplate;
                }
            }
            if(gameCount.size > 0){
                let gameTable = document.getElementById("games");
                gameTable.innerHTML = "";
                let index = 0;
                let gameList = [];
                for(let [game, count] of gameCount){
                    gameList.push({game : game, count : count});
                }
                gameList.sort((a, b) => b.count - a.count);
                for(let entry of gameList){
                    index++;
                    let rowTemplate = `
                    <tr>
                        <th>${index}</th>
                        <td>${entry.game}</td>
                        <td>${entry.count}</td>
                    </tr>`;                   
                    gameTable.innerHTML += rowTemplate;
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
        let monsterElement = document.getElementById('form_monster');
        let monsterName = monsterElement.value;
        if (monsterName.length === 0) {
            monsterElement.focus();
            monsterElement.animate(
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

        let gameElement = document.getElementById("choices");
        let gameName = gameElement.value;
        if (gameName.length === 0) {
            gameElement.focus();
            gameElement.animate(
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
        sendData(data);
    })
}

window.addEventListener("DOMContentLoaded", ready);
window.addEventListener("load", loaded);