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

    if (request.status!==404){
        let response = await request.json();

        alert("usuario: "+ JSON.stringify(response));
    }
    else{
        alert("usuario o contraseña incorectos");
    }

    email.value = "";
    password.value = "";
})