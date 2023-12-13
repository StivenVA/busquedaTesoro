async function showClue(code){

    let request = await fetch(`../users?clue=${code}&user=${window.localStorage.getItem("User_id")}`);

    let response;

    if (request.status === 400){
        Swal.fire({
            title: "Bad request",
            text: await request.text(),
            icon: "error",
        });
    }
    else if (request.status === 200){
        response = await request.json();

        Swal.fire({
            title: `Siguiente locacion en: ${response.clue.city}`,
            text: response.clue.description,
            confirmButtonText: "Ir al mapa"
        }).then(result=>{
            if (result.isConfirmed){
                window.location = "mapa.html";
            }
        })
    }

}

export default {showClue};

