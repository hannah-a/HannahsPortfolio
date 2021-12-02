function getAPIData(url) {
  try {
    return fetch(url).then(data => data.json())
  } catch (error) {
    console.error(error)
  }
}

getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=25`)
.then( async (data) => {
  for (const pokemon of data.results) {
    await getAPIData(pokemon.url).then(pokeData => populatePokeCards(pokeData))
  }
})
/* when making these requests, they sometimes fail so put them in a try/catch block. catch the error and respond to user. When you make a request to a server, the client is sending data to the server (chrome, my version, location) across headers with an http request.*/

const pokeGrid = document.querySelector('.pokeGrid') //made the div in HTML because it doesn't change, the cards will change. 

function populatePokeCards(singlePokemon) {
  const pokeScene = document.createElement('div')
  pokeScene.className = 'scene'
  const pokeCard = document.createElement('div')
  pokeCard.className = 'card'
  pokeCard.addEventListener('click', () => pokeCard.classList.toggle('is-flipped'))
  
  const front = populateCardFront(singlePokemon)
  const back = populateCardBack(singlePokemon)

  pokeCard.appendChild(front)
  pokeCard.appendChild(back)
  pokeScene.appendChild(pokeCard)
  pokeGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
  const pokeFront = document.createElement('figure')
  pokeFront.className = 'cardFace front'
  const pokeImg = document.createElement('img')
  pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`

  const pokeCaption = document.createElement('figcaption')
  pokeCaption.textContent = pokemon.name
  pokeFront.appendChild(pokeImg)
  pokeFront.appendChild(pokeCaption)
  return pokeFront
}

function populateCardBack(pokemon) {
  const pokeBack = document.createElement('div')
  pokeBack.className = 'cardFace back'
  const label = document.createElement('h4')
  label.textContent = 'Abilities:'
  pokeBack.appendChild(label)
  const abilityList = document.createElement('ul')
  pokemon.abilities.forEach((abilityItem) => {
    let listItem = document.createElement('li')
    listItem.textContent = abilityItem.ability.name
    abilityList.appendChild(listItem)
  })
  pokeBack.appendChild(abilityList)
  return pokeBack
}
