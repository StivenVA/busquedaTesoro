let map;
const maxDistance = 0.8;
let userLocation = null;

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
})

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

function iniciarMap() {

    let infoWindow = new google.maps.InfoWindow();

    const coords = { lat: 19.406940428320986, lng: -99.14819687896599 };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: coords,
    });

    createMyUbicationButton();
    getYourApproximateLocation();
    setInterval(() => {
        createMyUbicationButton();
    }, 1000);
}

const createMyUbicationButton = () => {
    const locationButton = document.createElement("button");
    locationButton.id = "go-to-location-btn";
    locationButton.classList.add("btn");
    locationButton.innerText = "Mi ubicación";
    locationButton.addEventListener("click", ()=>{
        if (userLocation) {
            map.setCenter(userLocation);
            map.setZoom(19);
        } else {
            alert("No se pudo obtener la ubicación actual.");
        }
    });

    document.getElementById("my-location-container").appendChild(locationButton);
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

const checkPIN = async () => {

    let pinInput = document.getElementById("pin-input").value.toUpperCase();

    let request = await fetch(`../users?code=${pinInput}&userId=${window.localStorage.getItem("User_id")}`);
    if (request.status===400){
        alert(await request.text());
        return ;
    }
    let response = await request.json();
    window.localStorage.setItem("loc_id",response.id)
    window.location = `preguntas_${response.id}.html`;

};

document.getElementById("verify-pin-button").addEventListener("click",checkPIN);