let usuario__name = localStorage.getItem("nombre__usuario");
let nombreUsuario = document.getElementById("nombreUsuario");
nombreUsuario.innerText="PERSONAL-NOTES DE" + usuario__name;
let borrarNotas = document.getElementById("BorrarNotas");
borrarNotas.addEventListener("click", ()=>{
    localStorage.removeItem("DataDatos");
    location.reload();
});
let cerrar_sesion = document.getElementById("cerrar_sesion") ;
cerrar_sesion.addEventListener("click", ()=>{
    Swal.fire({
        text:"Esta seguro de salir de la sesion",
        confirmButtonText: "Cerrar sesion",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
    }).then((result)=>{
        if(result.isConfirmed){
            window.location = "index.html";
        }else{
            location.reload();
        }
    })
});

document.addEventListener("DOMContentLoaded", ()=>{
    let noteList = document.getElementById("note-list")
    let myObjArray = JSON.parse(localStorage.getItem("DataDatos"));
    myObjArray.forEach(arrayElement => {
        const div = document.createElement("div");
    div.innerHTML = `
        <div class="card text-center mb-4 pt-3">
            <div class="card-Body">
            <p class="border d-inline p-2 mt-3 bg-dark text-light">
            <span id="valorDate">` + arrayElement.Date + `</span>
            </p>
            <p class="mt-3 font-italic fs-2">
            <span id="valorNote">` + arrayElement.Note + `</span>
            </p>
                </div>
        </div>
    `;
    noteList.appendChild(div);
    })});

class Nota{
    constructor(date,text){
        this.date = date;
        this.text = text;
    }
}
class Intefaz{
    agregarNota(nota){
        const noteList =  document.getElementById("note-list");
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="card text-center mb-4 pt-3">
                <div class="card-Body">
                <p class="border d-inline p-2 mt-3 bg-dark text-light">
                ${nota.date}
                </p>
                <p class="mt-3 font-italic fs-2">
                ${nota.text}
                </p>
                    </div>
            </div>
        `;
        noteList.appendChild(div);


    }
    borrarTextoDeInput(){
        document.getElementById("annotation-form").reset();
    }
    borrarNota(div){
        if(div.name === "Marcar"){
            div.parentElement.parentElement.remove();
            this.mostrarMensaje("Nota marcada satisfactoriamente","success");
        } 
    }
    mostrarMensaje(mensaje, clase){
        const mensajeContainer = document.createElement("div");
        mensajeContainer.className = `alert alert-`+clase;
        mensajeContainer.appendChild(document.createTextNode(mensaje));
        //Lo que voy a mostrar en el html
        const container = document.querySelector(".container");
        const app = document.getElementById("Aplicacion");
        container.insertBefore(mensajeContainer,app);
        //evento remover con temporizador
        setTimeout(removerTimeOut,3000);
    }
}
// Eventos
    document.getElementById("annotation-form").addEventListener("submit", function (e) {
        const date = document.getElementById("date").value;
        const text = document.getElementById("text").value;
        //Agrego en un objeto
        let myObj = {Date : date, Note : text};
        let myObjJSON = JSON.stringify(myObj);
        //Agrego a un Array
        let myArray = JSON.parse(localStorage.getItem("DataDatos")) || [];
        myArray.push(myObj);
            //Convierto el myArray a JSON
        let myArrayJSON = JSON.stringify(myArray);
        //LocalStorage
        localStorage.setItem("DataDatos", myArrayJSON);

        const nota = new Nota(date,text);
        const interfaz = new Intefaz();

            (date === "" || text === "") && interfaz.mostrarMensaje("No se puede agregar un campo de texto vacio, por favor completelo para poder agregar su nota. Gracias","danger");

        interfaz.agregarNota(nota);
        interfaz.borrarTextoDeInput();
        interfaz.mostrarMensaje("Nota agregada satisfactoriamente","success");
        e.preventDefault();
    });

    document.getElementById("note-list").addEventListener("click", function(e){
        const interfaz = new Intefaz();
        interfaz.borrarNota(e.target);
    })

    //functions
    function removerTimeOut(){
        document.querySelector(".alert").remove();
    }