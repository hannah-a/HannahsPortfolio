import { people } from '../data/people.js' //Use of Import and Export statements
import { getLastNumber, removeChildren } from '../utils/index.js'

const main = document.querySelector('#main')
const everyThing = document.querySelector('.EverythingContainer')
const mainHeader = document.createElement('header')
everyThing.insertBefore(mainHeader, main)
// node.insertBefore(newnode, existingnode). newnode= the node object you want to insert, existingnode= the child node you want to insert the new node before.


const maleButton = document.createElement('button')
maleButton.textContent = 'Male Characters'
maleButton.addEventListener('click', () => populateDOM(maleCharacters))
mainHeader.appendChild(maleButton)

const femaleButton = document.createElement('button')
femaleButton.textContent = 'Female Characters'
femaleButton.addEventListener('click', () => populateDOM(femaleCharacters))
mainHeader.appendChild(femaleButton)

const othersButton = document.createElement('button')
othersButton.textContent = 'Other Characters'
othersButton.addEventListener('click', () => populateDOM(otherCharacters))
mainHeader.appendChild(othersButton)

const maleCharacters = people.filter((person) => person.gender === 'male') //Iteration through an Array using loops and Array methods

const femaleCharacters = people.filter((person) => person.gender === 'female') //Iteration through an Array using loops and Array methods

const otherCharacters = people.filter((person) => {
  if (
    person.gender === 'n/a' ||
    person.gender === 'hermaphrodite' ||
    person.gender === 'none'
  ) {
    return person
  }
})

function populateDOM(characters) {
  removeChildren(main)
  
  characters.forEach((element) => {
    const personFig = document.createElement('figure')
    const personImg = document.createElement('img')
    let charNum = getLastNumber(element.url)
    personImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg` //Use of Strings using Template Literals
    const personCaption = document.createElement('figcaption')
    personCaption.textContent = element.name

    personFig.appendChild(personImg)
    personFig.appendChild(personCaption)

    main.appendChild(personFig)
  })
}