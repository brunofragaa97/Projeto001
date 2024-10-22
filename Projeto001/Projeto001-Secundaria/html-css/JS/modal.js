const background = document.getElementById('modal-background');



function backgroundClickHundler(){
    overlay.classList.remove('abrirModal');
}
background.addEventListener('click', backgroundClickHundler);


