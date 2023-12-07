
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
];

window.addEventListener("DOMContentLoaded",()=>{

    let locationsUnlocked = parseInt(window.localStorage.getItem("loc_id"));

    if (locationsUnlocked!==0){
        for (let i = 1; i<=locationsUnlocked; i++) {
            document.getElementById(`button${i}`).disabled = false;
        }
    }
    else{
        document.getElementById(`button1`).disabled = false;
    }
});

const createStations = (propertie) => {
    return `
  <div>
    <h3 class="text-reset py-1">${propertie.nombre}</h3>
    <div class="d-flex justify-content-space-between">
      <p><b>Estacion: </b>${propertie.estacion}</p>
    </div>
  </div>
  `;
};

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