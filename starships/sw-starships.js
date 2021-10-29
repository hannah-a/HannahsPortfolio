import { starships } from "../data/starships.js";
import { getLastNumber } from "../"

const nav = document.querySelector('.nav')
const navList = document.querySelector('.navList')
const shipView = document.querySelector('.shipViewer')

function populateNav() {
    starships.forEach(starship => {
        let anchorWrap = document.createElement('a')
        anchorWrap.href = '#'
        let listItem = document.createElement('li')
        listItem.textContent = starship.name

        anchorWrap.addEventListener('click', () => populateShipView(starship))

        anchorWrap.appendChild(listItem)
        navList.appendChild(anchorWrap)
    })
} 

populateNav()

function populateShipView(shipData) {
    console.log(`You clicked on ${shipData.name}`)
    let shipImage = document.createElement('img')
    shipImage.src = `https://starwars-visualguide.com/assets/img/starships/1.jpg`
}