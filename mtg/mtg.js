// magic the gathering API Boom baby 
// the cat link https://api.scryfall.com/cards/search?as=grid&order=name&q=%28type%3Acreature+type%3Acat%29&format=json

import { removeChildren } from "../utils/index.js";


//rare cat 62 objects https://api.scryfall.com/cards/search?as=grid&order=name&q=type%3Acat+rarity%3Ar&format=json

const mtgGrid = document.querySelector(".mtgGrid");
const loadButton = document.querySelector(".loadCats")
loadButton.addEventListener('click', () => {
  removeChildren(mtgGrid)
  loadMTG()
})

const moreButton = document.querySelector('.moreCats')
moreButton.addEventListener('click', () => {
  removeChildren(mtgGrid)
    getAPIData(
        `https://api.scryfall.com/cards/search?format=json&include_extras=false&include_multilingual=false&order=name&page=2&q=%28type%3Acreature+type%3Acat%29&unique=cards`
    ).then((mtgData) => {
      for (const card of mtgData.data) { //inside for loop, just want the results array, will give each pokemon one at a time
       populateCard(card) //I already have the data so I don't think I need to get the data from the url
      }
    })
  }
)

function getAPIData(url) { //removing async makes data come in order
    try {
      return fetch(url).then((mtgData) => mtgData.json()) //then with data it will data in json by calling it, it's going to call the api ten times inorder
    } catch (error) {
      console.error(error)
    }
  }
  
  function loadMTG() { //without a function, js will just read it and call it but with a button you can control it so put it in function
    getAPIData(
        `https://api.scryfall.com/cards/search?as=grid&order=name&q=%28type%3Acreature+type%3Acat%29&format=json`
    ).then((mtgData) => {
      for (const card of mtgData.data) { //inside for loop, just want the results array, will give each pokemon one at a time
       populateCard(card) //I already have the data so I don't think I need to get the data from the url
      }
    })
  }

function populateCard(singleCard) {
  const mtgScene = document.createElement('div')
  mtgScene.className = 'scene'
  const mtgCard = document.createElement('div')
  mtgCard.className = 'card'
  mtgCard.addEventListener('click', () => mtgCard.classList.toggle('is-flipped'))

  const front = populateCardFront(singleCard)
  const back = populateCardBack(singleCard)

  mtgCard.appendChild(front)
  mtgCard.appendChild(back)
  mtgScene.appendChild(mtgCard)
  mtgGrid.appendChild(mtgScene)
}

function populateCardFront(card) {
  const mtgFront = document.createElement('figure')
  mtgFront.className = 'cardFace front'
 const imgFront = document.createElement('img')
 imgFront.src = 'https://s3.amazonaws.com/ccg-corporate-production/news-images/Back0_Sheet%20(F)20201203163456929.jpg'

  const mtgCaption = document.createElement('figcaption')
  mtgCaption.textContent = card.name
  mtgFront.appendChild(imgFront)
  mtgFront.appendChild(mtgCaption)

  return mtgFront
}

function populateCardBack(card) {
  const mtgBack = document.createElement('figure')
  mtgBack.className = 'cardFace back'
  const imgBack = document.createElement('img')
  imgBack.src = card.image_uris.normal

  mtgBack.appendChild(imgBack)

  return mtgBack
}
  //tomorrow, make css card, populate card back and fronts, research pagination, make random button