import { films } from '../data/films.js'
import { getLastNumber } from '../utils/index.js'

let filmList = document.querySelector('#filmList')

for (let i = 0; i < films.length; i++) { //Iteration through an Array using loops and Array methods
  let figure = document.createElement('figure')
  let figImg = document.createElement('img')
  figImg.src = `https://starwars-visualguide.com/assets/img/films/${i + 1}.jpg`
  let figCaption = document.createElement('figcaption')

  const foundFilm = films.find(film => getLastNumber(film.url) === (i + 1).toString())
  // finds url of film and matches it to be able to get the title below

  figCaption.textContent = foundFilm.title
  
  figure.appendChild(figImg)
  figure.appendChild(figCaption)
  
  filmList.appendChild(figure)
 }