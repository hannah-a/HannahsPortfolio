import { senators } from "../data/senators.js";
import { representatives } from "../data/representatives.js";
import { removeChildren } from "../utils/index.js";

const members = [...senators, ...representatives]; // modern combining arrays like a genus

const memberDiv = document.querySelector(".members");
const buttonDiv = document.querySelector(".buttons");

const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".modal-close");
const modalBackground = document.querySelector(".modal-background");
const memMessage = document.querySelector(".memMessage");

closeButton.addEventListener("click", () => //Use of Arrow functions
  modal.classList.toggle("is-active")
);
modalBackground.addEventListener("click", () =>
  modal.classList.toggle("is-active")
);


/*document.getElementsByClassName(".url").addEventListener("error", myFunction);

function myFunction() {
    modal.classList.toggle("is-active");
    document.getElementsByClassName('.memMessage').textContent = `Members of Congress could not load.`;
}*/



function simplifiedMembers(chamberFilter /*naming the argument*/) {
  const filteredArray = members.filter((member) /*naming the array element*/ =>
    chamberFilter ? member.short_title === chamberFilter : member);
  /*a condition followed by a question mark (?), then an expression to execute if the condition is truthy followed by a colon (:), and finally the expression to execute if the condition is falsy.*/

  return filteredArray.map((member) => {
    const middleName = member.middle_name ? ` ${member.middle_name} ` : ` `; //Use of Strings using Template Literals
    return { //Use of Objects with key-value pairs
      id: member.id,
      name: `${member.first_name}${middleName}${member.last_name} (${member.party})`, //Use of Strings using Template Literals
      short_title: member.short_title,
      party: member.party,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${member.govtrack_id}-100px.jpeg`,
      gender: member.gender,
      seniority: +member.seniority,
      missedVotesPct: member.missed_votes_pct,
      loyaltyPct: member.votes_with_party_pct,
      state: member.state,
      url: member.url,
    };
  });
}

//WORKING BUTTONS

const representativeButton = document.createElement("button");
representativeButton.textContent = "Representatives";
representativeButton.addEventListener("click", () =>
  populateMemberDiv(simplifiedMembers("Rep."))
);
buttonDiv.appendChild(representativeButton);

const senatorButton = document.createElement("button");
senatorButton.textContent = "Senators";
senatorButton.addEventListener("click", () =>
  populateMemberDiv(simplifiedMembers("Sen."))
);
buttonDiv.appendChild(senatorButton);

function populateMemberDiv(memberProfile) {
  removeChildren(memberDiv);
  memberProfile.forEach((member) => {
    let memFigure = document.createElement("figure"); //Proper use of let and const variables
    let figImg = document.createElement("img");
    let figCaption = document.createElement("figcaption");

    figImg.src = member.imgURL;
    const urlArray = document.createElement("a");
    urlArray.setAttribute("href", member.url);
    urlArray.innerText = ` ${member.short_title} ${member.name}`;
    figCaption.textContent = `MISSED VOTES: ${member.missedVotesPct}% 
    `;
    
    memFigure.appendChild(figImg);
    memFigure.appendChild(figCaption);
    figCaption.appendChild(urlArray);
    memberDiv.appendChild(memFigure);
  });
  simplifiedMembers().addEventListener("error", () => {
    modal.classList.toggle("is-active");
    memMessage.textContent = `The photo of ${member.name} does not exist.`;
  });
}
/*simplifiedMembers().addEventListener("error", () => {
    modal.classList.toggle("is-active");
    memMessage.textContent = `The photo of ${member.name} does not exist.`;
  }); */


// SEARCH BAR
const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keyup", (input) => {
  const searchString = input.target.value.toUpperCase();
  const filteredMembers = simplifiedMembers().filter((member) => {
    return member.state.toUpperCase().includes(searchString);
  });
  disStateMembers(filteredMembers);
});

function disStateMembers(memberProfile) {
  removeChildren(memberDiv);
  memberProfile.forEach((member) => {
    let memFigure = document.createElement("figure");
    let figImg = document.createElement("img");
    let figCaption = document.createElement("figcaption");

    figImg.src = member.imgURL;
    figImg.src = member.imgURL;
    const urlArray = document.createElement("a");
    urlArray.setAttribute("href", member.url);
    urlArray.innerText = `${member.state} ${member.short_title} ${member.name}`;
    figCaption.textContent = `MISSED VOTES: ${member.missedVotesPct}% 
    `;
    memFigure.appendChild(figImg);
    memFigure.appendChild(figCaption);
    figCaption.appendChild(urlArray);
    memberDiv.appendChild(memFigure);
  });
}

const bigWeaselButton = document.createElement("button");
bigWeaselButton.textContent = "The Least Effective Person in Congress";
bigWeaselButton.addEventListener("click", () => populateWeasel(biggestWeasel));
buttonDiv.appendChild(bigWeaselButton);

const biggestWeasel = simplifiedMembers().reduce( //Iteration through an Array using loops and Array methods
  (acc, senator) =>
    (acc.missedVotesPct || 0) > senator.missedVotesPct ? acc : senator,
  {}
);
biggestWeasel.className = "biggestWeasel";

function populateWeasel(weasel) {
  removeChildren(memberDiv);
  let memFigure = document.createElement("figure");
  let figImg = document.createElement("img");
  let figCaption = document.createElement("figcaption");

  figImg.src = weasel.imgURL;
  const urlArray = document.createElement("a");
  urlArray.setAttribute("href", weasel.url);
  urlArray.innerText = `${weasel.state} ${weasel.short_title} ${weasel.name}`;
  figCaption.textContent = `MISSED VOTES: ${weasel.missedVotesPct}% 
    `;
  memFigure.appendChild(figImg);
  memFigure.appendChild(figCaption);
  figCaption.appendChild(urlArray);
  memberDiv.appendChild(memFigure);
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
