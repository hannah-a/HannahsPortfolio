import { senators } from '../data/senators.js'

const senatorDiv = document.querySelector('.senators')

function populateSenatorDiv() {
  senators.forEach(senator => {
    let senFigure = document.createElement('figure')
    let figImg = document.createElement('img')
    let figCaption = document.createElement('figcaption')

    figCaption.textContent = senator.first_name
    senFigure.appendChild(figImg)
    senFigure.appendChild(figCaption)
    senatorDiv.appendChild(senFigure)
  })
}

populateSenatorDiv()