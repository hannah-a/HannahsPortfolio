import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'
import { removeChildren } from '../utils/index.js'

const members = [...senators, ...representatives] // modern combining arrays like a genus

const memberDiv = document.querySelector('.members')
const buttonDiv = document.querySelector('.buttons')

function simplifiedMembers(chamberFilter/*naming the argument*/) {
  const filteredArray = members.filter(member/*naming the array element*/ => chamberFilter ? member.short_title === chamberFilter : member)
  /*a condition followed by a question mark (?), then an expression to execute if the condition is truthy followed by a colon (:), and finally the expression to execute if the condition is falsy.*/

  return filteredArray.map(member => {
    const middleName = member.middle_name ? ` ${member.middle_name} ` : ` `
    return {
      id: member.id,
      name: `${member.first_name}${middleName}${member.last_name} (${member.party})`,
      short_title: member.short_title,
      party: member.party,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${member.govtrack_id}-100px.jpeg`,
      gender: member.gender,
      seniority: +member.seniority,
      missedVotesPct: member.missed_votes_pct,
      loyaltyPct: member.votes_with_party_pct,
      state: member.state
    }
  })
}


//WORKING BUTTONS

const representativeButton = document.createElement('button')
representativeButton.textContent = 'rep button works'
representativeButton.addEventListener('click', () => 
  populateMemberDiv(simplifiedMembers('Rep.'))
)
buttonDiv.appendChild(representativeButton)

const senatorButton = document.createElement('button')
senatorButton.textContent = 'sen button works'
senatorButton.addEventListener('click', () => 
  populateMemberDiv(simplifiedMembers('Sen.'))
)
buttonDiv.appendChild(senatorButton)

function populateMemberDiv(memberProfile) {
  removeChildren(memberDiv)
  memberProfile.forEach(member => {
    let memFigure = document.createElement('figure')
    let figImg = document.createElement('img')
    let figCaption = document.createElement('figcaption')
    
    figImg.src = member.imgURL

    figCaption.textContent = `${member.state} ${member.short_title} ${member.name}`
    memFigure.appendChild(figImg)
    memFigure.appendChild(figCaption)
    memberDiv.appendChild(memFigure)
  })
}


/* failed attempts at button making
const repButton = document.createElement('button')
repButton.innerHTML = 'Republicans'
repButton.onclick = populateMemberDiv(repArray){}
document.body.appendChild


const republicanButton = document.querySelector('rep')
republicanButton.textContent = 'Republicans'
republicanButton.addEventListener('click', () => 
  populateMemberDiv(repArray)
)
*/



//const filterSenators = (prop, value) => simplifiedSenators().filter(senator => senator[prop] === value)
  
//const republicans = filterSenators('party', 'R')
//const femaleSenators = filterSenators('gender', 'F')

//console.log(republicans, femaleSenators)


/*
function simplifiedMembers(chamberFilter) {
    
//function 
    // mdn on falsey on truthy. a truthy value in a boolean context, all values are truethy unless falsey. falsey, specific parts of the javascript langues, 0 , -0, empty strings ""'` null, undefined, NaN
    return senatorArray.map(senator => {
        const middleName = senator.middle_name ? ` ${senator.middle_name} ` : " "
        return {
            id: senator.id,
            name: `${senator.first_name}${middleName}${senator.last_name}`,
            party: senator.party,
            imgUrl: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-100px.jpeg`,
            gender: senator.gender,
            seniority: +senator.seniority 

        }
    })
}
// coding isn't about creating a finished function at the get go, I'm not that good yet, so it's going to be a building process 
populateMemberDiv(simplifiedSenators(senators))


function populateMemberDiv(simpleSenators) {
    simpleSenators.forEach(senator => {
        let senFigure = document.createElement('figure')
        let figImg = document.createElement('img')
        let figCaption = document.createElement('figcaption')

        figImg.src = senator.imgUrl
        figCaption.textContent = senator.name

        senFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        senatorDiv.appendChild(senFigure)

    })
}
//create a filter function, take a property and value you want to filter on. whenever the senators value is equal to the value passed in thats how you filter senators
const filterSenators = (prop, value) => {
    return simplifiedSenators(senators).filter(senator => senator[prop] === value)//bracket notation on [prop] to pass in a value into the function
}

//an array of republicanss that what filterSenators will return
const republicans = filterSenators('party','R')
const femaleSenators = filterSenators('gender','F')

console.log(femaleSenators) //console log two things put a comma

const mostSeniorSenator = simplifiedSenators().reduce((acc, senator) => {
    return acc.seniority > senator.seniority ? :
}


const biggestWeasel = simplifiedSenators().reduce((acc, senator) => (acc.missedVotesPct || 0))
*/
