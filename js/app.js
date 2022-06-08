let personal__notes = document.getElementById("personal__notes");
let usuario__name = localStorage.getItem("nombre__usuario");

personal__notes.innerHTML = ` 
    <h2 class="navbar-brand">
        PERSONAL-NOTES DE ${usuario__name}
    </h2>
    <button href="#" id="cerrar_sesion" class="btn btn alert-dark">Cerrar sesión</button>
`

let cerrar_sesion = document.getElementById("cerrar_sesion") ;
cerrar_sesion.addEventListener("click", ()=>{
    window.location = "index.html"; 
});

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
                    <input type="button" id="Eliminar" name="Eliminar" value="Eliminar" class="btn btn-dark">
            </div>
        `;
        noteList.appendChild(div);

    }
    borrarTextoDeInput(){
        document.getElementById("annotation-form").reset();
    }
    borrarNota(div){
        div.name === "Eliminar" && div.parentElement.parentElement.remove();
        this.mostrarMensaje("Nota eliminada satisfactoriamente","success")
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
let DataDatos = []
// Eventos
    document.getElementById("annotation-form").addEventListener("submit", function (e) {
        const date = document.getElementById("date").value;
        const text = document.getElementById("text").value;
        //Agrego al Array
        

        DataDatos.push(JSON.stringify({Date: date,Nota: text}));
        console.table(DataDatos);
        //LocalStorage

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
