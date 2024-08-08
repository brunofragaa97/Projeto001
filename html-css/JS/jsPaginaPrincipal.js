const searchButton = document.getElementById('search-button');
const overlay = document.getElementById('modal-overlay');
const movieName = document.getElementById('movie-name');
const movieYear = document.getElementById('movie-year');
const key  = 'db1cfbf6';


searchButton.addEventListener('click', abrirModalAoClickarNoBotaoDeProcura);

async function abrirModalAoClickarNoBotaoDeProcura(){
    let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieName.value
        .split(' ')
        .join('+')}&y${movieYear.value}
        `;
    const response = await (fetch(url));
    const dadosFilme = await response.json();
    const dadosFilmeNecessarios  = [dadosFilme.Title, dadosFilme.Year, dadosFilme.Plot, dadosFilme.Genre, dadosFilme.Poster, dadosFilme.Actors];
    console.log ("Dados: ", dadosFilmeNecessarios);
    console.log ("Dados completos: " , dadosFilme); 
    overlay.classList.add('abrirModal');
    //altera o titulo do filme quando abre o modal
    const tituloDoFilme = document.getElementById('movie-title');
    tituloDoFilme.innerHTML = dadosFilmeNecessarios[0];
    //altera a imagem do filme
    const posterFilme = document.getElementById('movie-poster');
    posterFilme.src = dadosFilmeNecessarios[4];
    //alteera a desccriçãao do  fiilme
    const descricaoFilme = document.getElementById('movie-plot');
    descricaoFilme.innerHTML = dadosFilmeNecessarios[2];
    //altera os atores do filme
    const atoresFilme = document.getElementById('movie-actors');
    atoresFilme.innerHTML = dadosFilmeNecessarios[5];
    //altera o genero do filme
    const generoFilme = document.getElementById('movie-genre');
    generoFilme.innerHTML = dadosFilmeNecessarios[3];


    
    //console.log(movieName.value.split(" ").join('+'));
    //console.log("Ano: " + movieYear.value);
}
//INTELIGENCIA PARA ALTERAR TEMA PARA DARK
const alterarTema = document.getElementById('alterar-tema');
const mudarCabecalho = document.getElementById('corcabecalho1');
let op = 1;

alterarTema.addEventListener('click', alterarAcorDoCabecalho);
function  alterarAcorDoCabecalho(){
    if (op === 1) {
       // mudarCabecalho.classList.remove('corcabecalho1');
        mudarCabecalho.classList.add('corcabecalho2');
        op = 2; // Atualiza op para 2
    } else {
        mudarCabecalho.classList.remove('corcabecalho2');
       // mudarCabecalho.classList.add('corcabecalho1');
        op = 1; // Atualiza op para 1
    }
}
