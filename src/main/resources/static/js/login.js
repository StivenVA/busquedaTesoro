
document.getElementById("send").addEventListener("click",async (e)=>{
    e.preventDefault();

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let user = {};

    if (password.value!=="" && email.value!==""){
        user.email = email.value;
        user.password = password.value;
    }

    let request = await fetch("login",{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify(user)
    });

    if (request.status===404){
        alert("usuario o contraseña incorrectos");
        return;
    }

    let response = await request.json();

    window.localStorage.setItem("loc_id",response.locationId.locationId)
    window.localStorage.setItem("User_id",response.id);

    window.location = "../html/mapa.html";


})