function login() {
  const nombre = document.getElementById("user").value;
  const correo = document.getElementById("email").value;
  const contraseña = document.getElementById("password").value;

  // Validaciones

  const soloLetras = /^[A-Za-z]+$/;
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!soloLetras.test(nombre)) {
    alert("Nombre invalido");
    document.getElementById("user").value = "";
  } else if (nombre.length < 3) {
    alert("Nombre invalido. Demasiado corto");
    document.getElementById("user").value = "";
  } else if (nombre.length > 25) {
    alert("Nombre invalido. Demasiado largo");
    document.getElementById("user").value = "";
  } else if (!regexCorreo.test(correo)) {
    alert("Correo electrónico inválido.");
    document.getElementById("email").value = "";
  } else if (correo.length < 5) {
    alert("Correo invalido. Demasiado corto");
    document.getElementById("email").value = "";
  } else if (contraseña.length < 6 || contraseña.length > 30) {
    alert("Ingrese una contraseña valida (de 6 a 30 caracteres)");
    document.getElementById("password").value = "";
  } else {
    // Store the user's name in local storage
    localStorage.setItem("nombreUsuario", nombre);
    window.location = "Menu.html";
  }
}
