document.getElementById("send").addEventListener("click",async (e)=>{
    e.preventDefault();

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const passwordConfirmation = document.getElementById("passwordConfirm");
    const id = document.getElementById("id");
    const name = document.getElementById("name");
    const phone = document.getElementById("telephone");

    let user = {};

    if (passwordConfirmation.value===password.value){
        user.email = email.value;
        user.password = password.value;
        user.id = id.value;
        user.phone = phone.value;
        user.name = name.value;
    }

    let request = await fetch("../signup",{
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
    name.value = "";
    id.value="";
    phone.value="";
})