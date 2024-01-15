const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')



const maxRecords = 151
const limit = 12
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">

            </div>
            <button class="details-button" onclick="showDetails(${pokemon.number})">Detalhes</button>
        </li>  
    `
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


function showDetails(pokemonNumber) {
    console.log(pokemonNumber)
    pokeApi.getPokemon(pokemonNumber).then((pokemon = []) => {
        
        document.cookie = "pokemon=" + JSON.stringify(pokemon) + "; path=/";
        window.location.href = './details.html';
        // const html = convertPokemon(pokemon)
        // const viewDetails = document.getElementById('viewDetails'); 
        // viewDetails.innerHTML = html;
        // document.getElementById('pokemonModal').style.display = 'flex';
        

    })
}