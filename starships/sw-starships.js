import { starships } from '../data/starships.js'
import { getLastNumber, removeChildren } from '../utils/index.js'

const nav = document.querySelector('.nav')
const navList = document.querySelector('.navList')
const shipView = document.querySelector('.shipViewer')

const modal = document.querySelector('.modal')
const closeButton = document.querySelector('.modal-close')
const modalBackground = document.querySelector('.modal-background')
const shipMessage = document.querySelector('.shipMessage')

closeButton.addEventListener('click', () => modal.classList.toggle('is-active'))
modalBackground.addEventListener('click', () =>
  modal.classList.toggle('is-active')
)

function populateNav() {
  starships.forEach((starship) => {
    let anchorWrap = document.createElement('a')
    anchorWrap.href = '#'
    let listItem = document.createElement('li')
    listItem.textContent = starship.name

    anchorWrap.addEventListener('click', () => populateShipView(starship))

    anchorWrap.appendChild(listItem)
    navList.appendChild(anchorWrap)
  })
}
// Makes the list 
populateNav()

function populateShipView(shipData) {
  removeChildren(shipView)
  let shipImage = document.createElement('img')
  let shipName = document.createElement('div')
  shipName.className = 'shipName'
  shipName.textContent = shipData.name
  let shipNum = getLastNumber(shipData.url)
  shipImage.src = `https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg`
  shipImage.addEventListener('error', () => {
    shipName.hidden = true
    shipImage.hidden = true
    modal.classList.toggle('is-active')
    shipMessage.textContent = `The ship known as "${shipData.name}" has been canceled.`
  })
  shipView.appendChild(shipImage)
  shipView.appendChild(shipName)
}

/* tryna make a random button 

const randomButton = document.querySelector('#random')
 randomButton.addEventListener('click', () => randomImage(lastNumber))

s

using map function
const senatorDiv = document.querySelectors('.senators')
function simplifiedSenators(senatorArray) {
    const middleName = senator.middle_name ? ` ${senator.middle_name} `: " "
    // mdn on falsey on truthy. a truthy value in a boolean context, all values are truethy unless falsey. falsey, specific parts of the javascript langues, 0 , -0, empty strings ""'` null, undefined, NaN
    return senatorArray.map(senator => {
        return {
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}`,
            party: senator.party
        }
    })
}


function randomImage(ships) {
  return ships.map(ship => {
    return {
      shipImage: 
    }
  })

}
*/
