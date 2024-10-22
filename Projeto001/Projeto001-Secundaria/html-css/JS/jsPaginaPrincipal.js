const searchButton = document.getElementById('search-button');
const addFavoriteButton = document.getElementById('add-favorite-button'); // Supondo que você tenha um botão para adicionar aos favoritos
const overlay = document.getElementById('modal-overlay');
const movieName = document.getElementById('movie-name');
const movieYear = document.getElementById('movie-year');
const key = 'db1cfbf6';

let dadosFilme = null; // Variável global para armazenar os dados do filme

// Função para buscar dados do filme
async function buscarFilme() {
    const url = `http://www.omdbapi.com/?apikey=${key}&t=${movieNameParameterGenerator()}${movieYearParameterGenerator()}`;
    const response = await fetch(url);
    const dados = await response.json();

    if (dados.Error) {
        throw new Error("Filme não encontrado");
    }

    return {
        titulo: dados.Title,
        ano: dados.Year,
        plot: dados.Plot,
        genero: dados.Genre,
        poster: dados.Poster,
        atores: dados.Actors
    };
}

// Função para abrir o modal e exibir os dados do filme
async function abrirModalAoClickarNoBotaoDeProcura() {
    try {
        dadosFilme = await buscarFilme(); // Armazena os dados do filme
        overlay.classList.add('abrirModal');

        document.getElementById('movie-title').innerHTML = dadosFilme.titulo;
        document.getElementById('ano-filme').innerHTML = dadosFilme.ano;
        document.getElementById('movie-poster').src = dadosFilme.poster;
        document.getElementById('movie-plot').innerHTML = dadosFilme.plot;
        document.getElementById('movie-actors').innerHTML = dadosFilme.atores;
        document.getElementById('movie-genre').innerHTML = dadosFilme.genero;

    } catch (error) {
        notie.alert({ type: 'error', text: error.message });
    }
}

// Função para adicionar o filme ao banco de dados
async function addFilmeFavoritos() {
    if (!dadosFilme) {
        notie.alert({ type: 'error', text: 'Nenhum filme carregado. Pesquise um filme primeiro.' });
        return;
    }

    const novoFilme = {
        tituloDoFilme: dadosFilme.titulo,
        generoFilme: dadosFilme.genero,
        anoFilme: dadosFilme.ano,
        posterFilme: dadosFilme.poster
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoFilme)
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar filme');
        }

        const data = await response.json();
        console.log('Filme adicionado com sucesso:', data);
        // Atualize a interface do usuário se necessário
    } catch (error) {
        console.error('Erro ao adicionar o filme:', error);
    }
}

// Funções auxiliares para gerar parâmetros
function movieNameParameterGenerator() {
    if (movieName.value === '') {
        throw new Error('O nome do filme deve ser informado');
    }
    return movieName.value.split(' ').join('+');
}

function movieYearParameterGenerator() {
    if (movieYear.value === '') {
        return '';
    }
    if (movieYear.value.length !== 4 || Number.isNaN(Number(movieYear.value))) {
        throw new Error('Ano do filme inválido.');
    }
    return `&y=${movieYear.value}`;
}

// Alterar tema para dark
const alterarTemaCheckbox = document.getElementById('alterar-tema-checkbox');
const mudarCabecalho = document.getElementById('corcabecalho');

alterarTemaCheckbox.addEventListener('change', () => {
    mudarCabecalho.classList.toggle('corcabecalho1');
    mudarCabecalho.classList.toggle('corcabecalho2');
});

// Adiciona os listeners
searchButton.addEventListener('click', abrirModalAoClickarNoBotaoDeProcura);
addFavoriteButton.addEventListener('click', addFilmeFavoritos);
