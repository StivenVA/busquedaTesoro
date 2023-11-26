let map;
let properties = [
    {
        id: 1,
        nombre: "Estacion 1",
        estacion: 1,
        prueba: "algo",
        coords: {
            lat: 4.142425534240816,
            lng: -73.62653684081216,
        },
        enlace: "preguntas_1.html",
        pin: 111,
    },
    {
        id: 2,
        nombre: "Estacion 2",
        estacion: 2,
        prueba: "algomas",
        coords: {
            lat: 4.144227858494155,
            lng: -73.62672876632556,
        },
        enlace: "preguntas_2.html",
        pin: 222,
    },
    {
        id: 3,
        nombre: "Estacion 3",
        estacion: 3,
        prueba: "boton_malo",
        coords: {
            lat: 4.141574059821997,
            lng: -73.62760316643816,
        },
        enlace: "preguntas_3.html",
        pin: 333,
    },
    {
        id: 4,
        nombre: "Estacion 4",
        estacion: "Danesa",
        prueba: "boton_deberia_servir",
        coords: {
            lat: 4.1425037520165535,
            lng: -73.62079482668284,
        },
        enlace: "preguntas_4.html",
        pin: 444,
    },
    {
        id: 5,
        nombre: "Estacion 5",
        estacion: "cerca_papeleria",
        prueba: "boton_deberia_servir2",
        coords: {
            lat: 4.141439021049356,
            lng: -73.62524192925281,
        },
        enlace: "preguntas_5.html",
        pin: 555,
    },
];

const maxDistance = 0.8;
let userLocation = null;

function iniciarMap() {
    firstPositionMap();
    let infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");
    locationButton.id = "go-to-location-btn";
    locationButton.classList.add("btn");
    locationButton.innerText = "Mi ubicación";
    locationButton.addEventListener("click", goToUserLocation);
    document.getElementById("my-location-container").appendChild(locationButton);

    const verifyPINButton = document.getElementById("verify-pin-button");
    verifyPINButton.addEventListener("click", checkDistances);

    const addMarker = (properties) => {
        properties.forEach((propertie) => {
            const informationCard = createInfoWindow(propertie);
            const marker = new google.maps.Marker({
                position: propertie.coords,
                map,
                icon: "../icons/marker.svg",
            });

            const buttonId = `button${propertie.id}`;
            const button = document.createElement("button");
            button.id = buttonId;
            button.classList.add("btn");
            button.disabled = true;

            if (propertie.enlace) {
                button.setAttribute("target", "_blank");
                button.addEventListener("click", () => {
                    const stationId = button.dataset.id;
                    const stationName = button.dataset.nombre;
                    const stationNumber = button.dataset.estacion;

                    const enteredPIN = document.getElementById("pin-input").value;
                    const isPINCorrect = checkPIN(stationId, enteredPIN);

                    if (isPINCorrect) {
                        const destinationURL = propertie.enlace;
                        const confirmation = window.confirm("Acceso permitido. ¿Desea continuar?");
                        if (confirmation) {
                            window.location.href = destinationURL;
                        } else {
                            window.location.href = '../html/mapa.html';
                        }
                    }
                });
            } else {
                button.addEventListener("click", () => {
                    const stationId = button.dataset.id;
                    const stationName = button.dataset.nombre;
                    const stationNumber = button.dataset.estacion;
                    alert(`Botón ${stationNumber}: ${stationName} (ID: ${stationId})`);
                });
            }

            button.dataset.id = propertie.id;
            button.dataset.nombre = propertie.nombre;
            button.dataset.estacion = propertie.estacion;

            google.maps.event.addListener(marker, "click", () => {
                infoWindow.setContent(informationCard);
                infoWindow.open(map, marker);
                map.setCenter(propertie.coords);
                map.setZoom(19);
            });
            document.getElementById("buttons-container").appendChild(button);
        });
    };

    const getYourApproximateLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => {
                    userLocation = { lat: latitude, lng: longitude };
                    map.setCenter(userLocation);
                    map.setZoom(19);
                    new google.maps.Marker({
                        position: userLocation,
                        map: map,
                        icon: "../icons/user.svg",
                    });
                },
                () => {
                    alert("Tu navegador está bien, pero ocurrió un error al obtener tu ubicación");
                }
            );
        } else {
            alert("Tu navegador no cuenta con localización ");
        }
    };

    getYourApproximateLocation();
    addMarker(properties);

    setInterval(() => {
        checkDistances();
    }, 1000);
}

function goToUserLocation() {
    if (userLocation) {
        map.setCenter(userLocation);
        map.setZoom(19);
    } else {
        alert("No se pudo obtener la ubicación actual.");
    }
}


let unlockedStations = [];
const checkDistances = () => {
    if (userLocation) {
        properties.forEach((propertie) => {
            const distance = calculateDistance(
                userLocation.lat,
                userLocation.lng,
                propertie.coords.lat,
                propertie.coords.lng
            );
            const buttonId = `button${propertie.id}`;
            const button = document.getElementById(buttonId);

            if (button) {
                const stationId = parseInt(button.dataset.id);
                const enteredPIN = document.getElementById("pin-input").value;
                const isPINCorrect = checkPIN(stationId, enteredPIN);
                const isUnlocked = isStationUnlocked(stationId);

                button.disabled = distance > maxDistance || !isPINCorrect || isUnlocked;

                if (!button.disabled) {
                    button.addEventListener("click", () => {
                        unlockStation(stationId, enteredPIN);
                    });
                }
            }
        });
        const locationButton = document.createElement("button");
        locationButton.id = "go-to-location-btn";
        locationButton.classList.add("btn");
        locationButton.innerText = "Mi ubicación";
        locationButton.addEventListener("click", goToUserLocation);
        document.getElementById("my-location-container").appendChild(locationButton);
    }

};

const unlockStation = (stationId, enteredPIN) => {
    const isPINCorrect = checkPIN(stationId, enteredPIN);

    if (isPINCorrect) {
        unlockedStations.push(stationId);
        alert("¡unloc station 219 .");

        // Redirige a la prueba correspondiente en la misma ventana
        const destinationURL = properties.find((property) => property.id === stationId)?.enlace;
        if (destinationURL) {
            const confirmation = window.confirm("¿Dsegunda de unlock 219?");
            if (confirmation) {
                window.location.href = destinationURL;
            }
        }
    } else {
        alert("PIN incorrecto. Inténtelo de nuevo.");
    }
};

const isStationUnlocked = (stationId) => {
    return unlockedStations.includes(stationId);
};

const firstPositionMap = () => {
    const coords = { lat: 19.406940428320986, lng: -99.14819687896599 };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: coords,
    });
};

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

const createInfoWindow = (propertie) => {
    return `
  <div>
    <h3 class="text-reset py-1">${propertie.nombre}</h3>
    <div class="d-flex justify-content-space-between">
      <p><b>Estacion: </b>${propertie.estacion}</p>
    </div>
    <p><b>Prueba: </b>${propertie.prueba}</p>
  </div>
  `;
};

const checkPIN = (stationId, enteredPIN) => {
    const correctPIN = properties.find((property) => property.id === stationId)?.pin;
    return correctPIN && enteredPIN === correctPIN.toString();
};
