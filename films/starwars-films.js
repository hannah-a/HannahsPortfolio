import { films } from '../data/films.js'

let filmList = document.querySelector('#filmList')

let titleList = document.createElement('ol')

filmList.appendChild(titleList)

let poster = document.createElement('img')

poster.src = `https://starwars-visualguide.com/assets/img/films/1.jpg`

filmList.appendChild(poster)

for (let i = 0; i < films.length; i++) {
    let titleItem = document.createElement('li')
    titleItem.textContent = films[i].title
    titleList.appendChild(titleItem)
 }