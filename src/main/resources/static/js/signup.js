document.getElementById("send").addEventListener("click",async (e)=>{
    e.preventDefault();

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const passwordConfirmation = document.getElementById("password_2");
    let id = "1006858866";

    let user = {};

    if (passwordConfirmation.value===password.value){
        user.email = email.value;
        user.password = password.value;
        user.id = id;
    }

    let request = await fetch("signup",{
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify(user)
    });

    email.value = "";
    password.value = "";
    passwordConfirmation.value = "";
})