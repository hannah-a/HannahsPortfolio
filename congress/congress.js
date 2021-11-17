import { senators } from '../data/senators.js'
import { representatives } from '../data/representatives.js'

const members = [...senators, ...representatives] //combined senators and represenatives

const senatorDiv = document.querySelector('.senators')
//11/15 changed to simplifiedMembers
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
populateSenatorDiv(simplifiedSenators(senators))


function populateSenatorDiv(simpleSenators) {
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