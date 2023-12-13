let map;
const maxDistance = 0.8;
let userLocation = null;
//
let ubications = [
    {
        id:1,
        lat: 3.5426036901021205,
        lng:-73.7068887579774
    },{
        id:2,
        lat: 3.5539444933132858,
        lng: -73.71303408993533
    },
    {
        id:3,
        lat: 4.2866459768536105,
        lng: -73.5854203071232
    },
    {
        id:4,
        lat: 4.257540591844404,
        lng:-73.56743739178074
    },
    {
        id:5,
        lat: 4.125358127033722,
        lng:-73.57477722513634
    },
    {
        id:6,
        lat: 4.122234006641089,
        lng:-73.64221554760327
    },
    {
        id:7,
        lat: 4.267983283785695,
        lng:-73.48828507643793
    },
    {
        id:8,
        lat: 4.26959147693378,
        lng:-73.49083194752804
    },
    {
        id:9,
        lat: 3.9911047692555024,
        lng:-73.75700809733144
    },
    {
        id:10,
        lat:3.993751040501378,
        lng:-73.77269577643976
    }
]



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

    }

};

function iniciarMap() {

    let infoWindow = new google.maps.InfoWindow();

    const coords = { lat: 19.406940428320986, lng: -99.14819687896599 };
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 6,
        center: coords,
    });

    let currentLocation = parseInt(window.localStorage.getItem("loc_id"));

    if (currentLocation!==0){
        for (let i = 0; i < currentLocation; i++) {
            generateMarker(ubications[i].lat,ubications[i].lng);
        }
    }

    createMyUbicationButton();
    getYourApproximateLocation();
}

const createMyUbicationButton = () => {
    const locationButton = document.createElement("a");
    locationButton.id = "go-to-location-btn";
    locationButton.innerText = "Mi ubicación";
    locationButton.addEventListener("click", ()=>{
        if (userLocation) {
            map.setCenter(userLocation);
            map.setZoom(19);
        } else {
            alert("No se pudo obtener la ubicación actual.");
        }
    });
    locationButton.insertAdjacentHTML("afterbegin", "<i class=\"fa-solid fa-street-view\"></i>");
    document.getElementById("menu").appendChild(locationButton);

    if (parseInt(window.localStorage.getItem("loc_id"))===0 && !window.localStorage.getItem("enter")){
        let confirmation = confirm("Bienvenido a tu aventura, pasate por nuestras estaciones para que descubras tu primera pista");

        if (confirmation){
            window.location = "preguntas_1.html";
            window.localStorage.setItem("enter",true);
        }
    }
};

let generateMarker = (lat,lng)=>{
    let marcador = new google.maps.Marker({
        position: new google.maps.LatLng(lat,lng),
        map,
        animation:google.maps.Animation.DROP,
        icon:{
            url:"../icons/bandera.png",
            scaledSize: new google.maps.Size(50, 50)
        }
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

const checkPIN = async () => {

    let pinInput = document.getElementById("pin-input").value.toUpperCase();

    let request = await fetch(`../users/update/?code=${pinInput}&userId=${window.localStorage.getItem("User_id")}`);
    if (request.status===400){
        alert(await request.text());
        return ;
    }
    let response = await request.json();
    window.localStorage.setItem("loc_id",response.id);
    console.log(response.id);
    if (response.id!==10) window.location = `preguntas_${response.id+1}.html`;
    else Swal.fire({
        title: 'Juego completado',
        text: "¡Felicidades por terminar el juego!, muchisimas gracias por jugar.",
        icon: "../img/completed.png",
        confirmButtonText: "Aceptar",

    })
};

document.getElementById("verify-pin-button").addEventListener("click",checkPIN);
document.getElementById("cerrar-sesion").addEventListener("click", ()=>{
    window.localStorage.removeItem("loc_id");
    window.localStorage.removeItem("User_id");
    window.localStorage.removeItem("enter");
})
