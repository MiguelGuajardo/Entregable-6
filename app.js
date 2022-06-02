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
            <div class="card text-center mb-4">
                <div class="card-Body">
                    <strong>Date</strong>: ${nota.date}
                    <strong>NOTE</strong>: ${nota.text}
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
        if(div.name === "Eliminar"){
            div.parentElement.parentElement.remove();
            this.mostrarMensaje("Nota eliminada satisfactoriamente","success")
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
let DataDate = [];
let DataText = [];
// Eventos
    document.getElementById("annotation-form").addEventListener("submit", function (e) {
        const date = document.getElementById("date").value;
        const text = document.getElementById("text").value;
        //Agrego al Array
        

        DataDate.push(date);
        DataText.push(text);
        
        console.log(date);
        console.log(text);
        //LocalStorage
        for(let i = 0; i < DataDate.length; i++){
            localStorage.setItem("Fecha-"+[i],DataDate);
                
        }
        for(let i = 0; i < DataText.length; i++){
            localStorage.setItem("Nota-"+[i],DataText);

        }

        const nota = new Nota(date,text);
        const interfaz = new Intefaz();

            if(date === "" || text === ""){
                return interfaz.mostrarMensaje("No se puede agregar un campo de texto vacio, por favor completelo para poder agregar su nota. Gracias","danger");
            }
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
    