import { senators } from '../data/senators.js'

const senatorDiv = document.querySelector('.senators')

function simplifiedSenators() {
  return senators.map(senator => {
    const middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `
    return {
      id: senator.id,
      name: `${senator.first_name}${middleName}${senator.last_name}`,
      party: senator.party,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`,
      gender: senator.gender,
      seniority: +senator.seniority,
      missedVotesPct: senator.missed_votes_pct,
      loyaltyPct: senator.votes_with_party_pct,
    }
  })
}

populateSenatorDiv(simplifiedSenators())

function populateSenatorDiv(simpleSenators) {
  simpleSenators.forEach(senator => {
    let senFigure = document.createElement('figure')
    let figImg = document.createElement('img')
    let figCaption = document.createElement('figcaption')

    figImg.src = senator.imgURL

    figCaption.textContent = senator.name
    senFigure.appendChild(figImg)
    senFigure.appendChild(figCaption)
    senatorDiv.appendChild(senFigure)
  })
}

const filterSenators = (prop, value) => simplifiedSenators().filter(senator => senator[prop] === value)
  
const republicans = filterSenators('party', 'R')
const femaleSenators = filterSenators('gender', 'F')

//console.log(republicans, femaleSenators)

const mostSeniorSenator = simplifiedSenators().reduce((acc, senator) => {
  return acc.seniority > senator.seniority ? acc : senator 
})

console.log(mostSeniorSenator)