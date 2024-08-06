const searchButton = document.getElementById('search-button');
const overlay = document.getElementById('modal-overlay');
const movieName = document.getElementById('movie-name');
const movieYear = document.getElementById('movie-year');
const key  = 'db1cfbf6';


searchButton.addEventListener('click', abrirModalAoClickarNoBotaoDeProcura);

async function abrirModalAoClickarNoBotaoDeProcura(){
    let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieName.value
        .split(' ')
        .join('+')}&${movieYear.value}
        `;
    const response = await (fetch(url));
    const dadosFilme = await response.json();
    const dadosFilmeNecessarios  = [dadosFilme.Title, dadosFilme.Year, dadosFilme.Plot, dadosFilme.Genre, dadosFilme.Poster];
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


    
    //console.log(movieName.value.split(" ").join('+'));
    //console.log("Ano: " + movieYear.value);
}





