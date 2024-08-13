const searchButton = document.getElementById('search-button');
const overlay = document.getElementById('modal-overlay');
const movieName = document.getElementById('movie-name');
const movieYear = document.getElementById('movie-year');
const key  = 'db1cfbf6';


searchButton.addEventListener('click', abrirModalAoClickarNoBotaoDeProcura);

async function abrirModalAoClickarNoBotaoDeProcura(){
    try{
        let url = `http://www.omdbapi.com/?apikey=${key}&t=${movieNameParameterGenerator()}${movieYearParameterGenerator()}`;
        const response = await (fetch(url));
        const dadosFilme = await response.json();
        const dadosFilmeNecessarios  = [dadosFilme.Title, dadosFilme.Year, dadosFilme.Plot, dadosFilme.Genre, dadosFilme.Poster, dadosFilme.Actors];
        console.log ("Dados: ", dadosFilmeNecessarios);
        console.log ("Dados completos: " , dadosFilme); 
        if(dadosFilme.Error){
            throw new Error("Filme não encontrado");
        }
        overlay.classList.add('abrirModal');
        //altera o titulo do filme quando abre o modal
        const tituloDoFilme = document.getElementById('movie-title');
        tituloDoFilme.innerHTML = dadosFilmeNecessarios[0];
        //altera o ano do filme
        const anoFilme = document.getElementById('ano-filme');
        anoFilme.innerHTML = dadosFilmeNecessarios[1];
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
    }
    catch (error){
        notie.alert({type: 'error', text: error.message });
    }
}   
function movieNameParameterGenerator(){
    if (movieName.value === ''){
        throw new Error ('Os nome do filme deve ser informado');
    }
    return movieName.value.split(' ').join('+');
}
function movieYearParameterGenerator(){
    if (movieYear.value === ''){
        return '';
    }
    if (movieYear.value.length !== 4 || Number.isNaN(Number(movieYear.value))){
        throw new Error('Ano do filme inválido.')
    }
    return `&y=${movieYear.value}`
}
    //console.log(movieName.value.split(" ").join('+'));
    //console.log("Ano: " + movieYear.value);

                                //INTELIGENCIA PARA ALTERAR TEMA PARA DARK

const alterarTemaCheckbox = document.getElementById('alterar-tema-checkbox');
const mudarCabecalho = document.getElementById('corcabecalho');

alterarTemaCheckbox.addEventListener('change', () => {
    mudarCabecalho.classList.toggle('corcabecalho1');
    mudarCabecalho.classList.toggle('corcabecalho2');
});