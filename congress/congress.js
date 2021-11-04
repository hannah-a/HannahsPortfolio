import { senators } from '../data/senators.js'

const senatorDiv = document.querySelectors('.senators')

function populateSenatorDiv() {
    senators.forEach(senator => {
        let senFigure = document.createElement('figure')
        let senImg = document.createElement('img')
        let senCaption = document.createElement('figcaption')
        senCaption.textContent = senator.first_name
        senFigure.appendChild(senImg)
        senFigure.appendChild(senCaption)

    })
}