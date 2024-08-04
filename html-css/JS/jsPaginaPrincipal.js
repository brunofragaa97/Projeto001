const searchButton = document.getElementById('search-button');
const overlay = document.getElementById('modal-overlay');

function abrirModalAoClickarNoBotaoDeProcura(){
    overlay.classList.add('abrirModal');
}

searchButton.addEventListener('click', abrirModalAoClickarNoBotaoDeProcura);



