async function getAPIData(url) {
    try {
    const response = await fetch(url) //first response object then convert it to json
    const data = await response.json()
    return data //want to return data, in unsuccessful just console log. In better design could return an error. 
    }
    catch (error) {
        console.error(error)
    }
}

getAPIData(`https://pokeapi.co/api/v2/pokemon/snorlax`)// pass in a url, calling API data, gets data in return
.then((data) => {
    console.log(data)
    populatePokeCards(data)
})
/* when making these requests, they sometimes fail so put them in a try/catch block. catch the error and respond to user. When you make a request to a server, the client is sending data to the server (chrome, my version, location) across headers with an http request.*/

const pokeGrid = document.querySelector('.pokeGrid') //made the div in HTML because it doesn't change, the cards will change. 

function populatePokeCards(singlePokemon) {
    const pokeScene = document.createElement('div') //creating divs for the scene
    pokeScene.className = 'scene'
    const pokeCard = document.createElement('div') 
    pokeCard.className = 'card'
    const pokeFront = document.createElement('div') 
    pokeFront.className = 'cardFace front' //two names because the cards will share properties
    pokeFront.textContent = 'Front'
    const pokeBack = document.createElement('div') 
    pokeBack.className = 'cardFace back'
    pokeBack.textContent = singlePokemon.name //going to fix this to put on the front of the card. 
//nest the divs
    pokeCard.appendChild(pokeFront)
    pokeCard.appendChild(pokeBack)
    pokeScene.appendChild(pokeCard)
    pokeGrid.appendChild(pokeScene)
//then put it in the DOM, need a reference for the DOM, pokeGrid. 
}

// magic the gathering API Boom baby 
// the cat link https://api.scryfall.com/cards/search?as=grid&order=name&q=%28type%3Acreature+type%3Acat%29&format=json

//rare cat 62 objects https://api.scryfall.com/cards/search?as=grid&order=name&q=type%3Acat+rarity%3Ar&format=json