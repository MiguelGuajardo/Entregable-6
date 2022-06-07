let button__register = document.getElementById("btn__registrarse");
let button__login = document.getElementById("btn__iniciar-sesioon");
let button__registrarse = document.getElementById("button__registrarse");
let button__loguearse = document.getElementById("button__loguearse");

button__register.addEventListener("click", registrarse);
button__login.addEventListener("click", loguearse);

button__registrarse.addEventListener("click", registrarUsuario);
button__loguearse.addEventListener("click", loguearUsuario);

//----------Variables---------------

//------------Variables de login y register
let box__login_register = document.getElementById("box__login-register");
let formulario__login = document.getElementById("formulario__login");
let formulario__register = document.getElementById("formulario__register");
let box__dorso_login = document.getElementById("box__dorso-login");
let box__dorso_register = document.getElementById("box__dorso-register");



function loguearse(){
    formulario__register.style.display = "none";
    box__login_register.style.left = "10px";
    formulario__login.style.display = "block";
    box__dorso_login.style.opacity = "0";
    box__dorso_register.style.opacity = "1";
}
function registrarse(){
    formulario__register.style.display = "block";
    box__login_register.style.left = "410px";
    formulario__login.style.display = "none";
    box__dorso_login.style.opacity = "1";
    box__dorso_register.style.opacity = "0";
}
function loguearUsuario(){
    //------------Variables de Loguear Usuario
    let correo__login = document.getElementById("correo__log").value;
    let contraseña__login = document.getElementById("password__log").value;
    let correo__local = localStorage.getItem("correo");
    let contraseña__local = localStorage.getItem("contraseña");

    if(correo__login != correo__local || contraseña__login != contraseña__local){
        alert("Usuario o contraseña inexistente")
    }else{
        window.location = "anotador.html";
    } ;
}
function registrarUsuario(){
    //------------Variables de Registrar Usuario
let nombre__completo = document.getElementById("nombre__completo").value;
let correo = document.getElementById("correo").value;
let nombre__usuario = document.getElementById("nombre__usuario").value;
let contraseña__uno = document.getElementById("contraseña__uno").value;
let contraseña__dos = document.getElementById("contraseña__dos").value;

    if(contraseña__uno != contraseña__dos){
        alert("No coincide la contraseña")
    }else{
        localStorage.setItem("nombre__completo", nombre__completo)
        localStorage.setItem("correo", correo)
        localStorage.setItem("nombre__usuario", nombre__usuario)
        localStorage.setItem("contraseña", contraseña__uno)
    }
}
