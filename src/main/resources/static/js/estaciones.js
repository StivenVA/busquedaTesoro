
let properties = [
    {
        id: 1,
        estacion: 1,
        enlace: "preguntas_1.html",
    },
    {
        id: 2,
        estacion: 2,
        enlace: "preguntas_2.html",
    },
    {
        id: 3,
        estacion: 3,
        enlace: "preguntas_3.html",
    },
    {
        id: 4,
        estacion: 4,
        enlace: "preguntas_4.html",
    },
    {
        id: 5,
        estacion: 5,
        enlace: "preguntas_5.html",
    },
    {
        id: 6,
        estacion: 6,
        enlace: "preguntas_6.html",
    },
    {
        id: 7,
        estacion: 7,
        enlace: "preguntas_7.html",
    },
    {
        id: 8,
        estacion: 8,
        enlace: "preguntas_8.html",
    },
    {
        id: 9,
        estacion: 9,
        enlace: "preguntas_9.html",
    },
    {
        id: 10,
        estacion: 10,
        enlace: "preguntas_10.html",
    },
];

window.addEventListener("DOMContentLoaded",()=>{

    let locationsUnlocked = parseInt(window.localStorage.getItem("loc_id"));

    if (locationsUnlocked!==0){
        for (let i = 1; i<=locationsUnlocked+1; i++) {
            document.getElementById(`button${i}`).disabled = false;
        }
    }
    else{
        document.getElementById(`button1`).disabled = false;
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const dynamicButtonsContainer = document.getElementById("dynamic-buttons-container");

    properties.forEach((propertie) => {
        const buttonId = `button${propertie.id}`;
        const button = document.createElement("button");
        button.id = buttonId;
        button.classList.add("btn");
        button.disabled = true;
        button.textContent = `Estacion ${propertie.id}`;

        button.addEventListener("click",()=>{
            window.location = propertie.enlace;
        })

        dynamicButtonsContainer.appendChild(button);
    });

});