import { people } from '../data/people.js'

const main = document.querySelector('#main')

console.log(people.length)

people.forEach((element, index) => {
  const personFig = document.createElement('figure')
  const personImg = document.createElement('img')
  personImg.src = `https://starwars-visualguide.com/assets/img/characters/${
    index + 1
  }.jpg`
  const personCaption = document.createElement('figcaption')
  personCaption.textContent = 'Person name goes here'

  personFig.appendChild(personImg)
  personFig.appendChild(personCaption)

  main.appendChild(personFig)
})
