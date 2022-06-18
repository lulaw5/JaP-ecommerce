//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let form = document.getElementById('form');
    form.addEventListener('submit', function (evento) {
        evento.preventDefault();
        let usuario = document.getElementById('usuario').value;
        localStorage.setItem('usuario', usuario);
        window.location.href = 'index.html';
    })
});