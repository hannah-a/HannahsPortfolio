// magic the gathering API Boom baby
// the cat link https://api.scryfall.com/cards/search?as=grid&order=name&q=%28type%3Acreature+type%3Acat%29&format=json
//rare cat 62 objects https://api.scryfall.com/cards/search?as=grid&order=name&q=type%3Acat+rarity%3Ar&format=json

import { removeChildren } from "../utils/index.js";

const allCats = [...pageOne, ...pageTwo]
const pageOne = function pageOneFunction


const mtgGrid = document.querySelector(".mtgGrid");
const loadButton = document.querySelector(".loadCats");
loadButton.addEventListener("click", () => {
  removeChildren(mtgGrid);
  loadMTG();
});

const moreButton = document.querySelector(".moreCats");
moreButton.addEventListener("click", () => {
  removeChildren(mtgGrid);
  getAPIData(
    `https://api.scryfall.com/cards/search?format=json&include_extras=false&include_multilingual=false&order=name&page=2&q=%28type%3Acreature+type%3Acat%29&unique=cards`
  ).then((mtgData) => {
    for (const card of mtgData.data) {
      //inside for loop, just want the results array, will give each pokemon one at a time
      populateCard(card); //I already have the data so I don't think I need to get the data from the url
    }
  });
});

function getAPIData(url) {
  //removing async makes data come in order
  try {
    return fetch(url).then((mtgData) => mtgData.json()); //then with data it will data in json by calling it, it's going to call the api ten times inorder
  } catch (error) {
    console.error(error);
  }
}

function loadMTG() {
  //without a function, js will just read it and call it but with a button you can control it so put it in function
  getAPIData(
    `https://api.scryfall.com/cards/search?as=grid&order=name&q=%28type%3Acreature+type%3Acat%29&format=json`
  ).then((mtgData) => {
    for (const card of mtgData.data) {
      //inside for loop, just want the results array, will give each pokemon one at a time
      populateCard(card); //I already have the data so I don't think I need to get the data from the url
    }
  });
}




// Load magic cats buttons


function populateCard(singleCard) {
  const mtgScene = document.createElement("div");
  mtgScene.className = "scene";
  const mtgCard = document.createElement("div");
  mtgCard.className = "card";
  mtgCard.addEventListener("click", () =>
    mtgCard.classList.toggle("is-flipped")
  );

  const front = populateCardFront(singleCard);
  const back = populateCardBack(singleCard);

  mtgCard.appendChild(front);
  mtgCard.appendChild(back);
  mtgScene.appendChild(mtgCard);
  mtgGrid.appendChild(mtgScene);
}

function populateCardFront(card) {
  const mtgFront = document.createElement("figure");
  mtgFront.className = "cardFace front";
  const imgFront = document.createElement("img");
  imgFront.src =
    "https://s3.amazonaws.com/ccg-corporate-production/news-images/Back0_Sheet%20(F)20201203163456929.jpg";

  mtgFront.appendChild(imgFront);
  

  return mtgFront;
}

function populateCardBack(card) {
  const mtgBack = document.createElement("figure");
  mtgBack.className = "cardFace back";
  const imgBack = document.createElement("img");
  imgBack.src = card.image_uris.normal;

  mtgBack.appendChild(imgBack);

  return mtgBack;
}





// Create New Cat Button

const newButton = document.querySelector(".newCat");
newButton.addEventListener("click", () => {
  let catName = prompt("What is the name of your new Cat?");
  let catType = prompt("What is your cat type? (Zombie, Rebel, Warrior, Soldier, Cleric, Avator, Knight ect...")
  let catAbilities = prompt(
    "What are your cat abilities? (use a comma separated list)"
  );
  let catLevel = prompt("What is your cats Power and Toughness? (Power/Toughness)")
 
  let newCat = new Cat(
    catName,
    catType,
    catLevel,
    getAbilitiesArray(catAbilities)
  );
  populateNewCard(newCat);
});


function getAbilitiesArray(commaString) {
  let tempArray = commaString.split(","); //split method divides strings into an array searching for the pattern in the first parameter
  return tempArray.map((abilityName) => {
    return {
      ability: {
        name: abilityName, //returns an object with the first parameter as the value
      },
    };
  });
}

class Cat {
  constructor(
    name,
    type,
    level,
    abilities
  ) /*pass in properties you want it to have */ {
    (this.name = name),
    this.type = type,
    this.level = level,
    (this.abilities = abilities);
  }
}

function populateNewCard(cat) {
  removeChildren(mtgGrid)
  const scene = document.createElement("div");
  scene.className = "scene";
  const card = document.createElement("div");
  card.className = "card";
  card.addEventListener("click", () =>
    card.classList.toggle("is-flipped")
  );

  const front = populateNewFront(cat);
  const back = populateNewBack(cat);

  card.appendChild(front);
  card.appendChild(back);
  mtgGrid.appendChild(scene);
  scene.appendChild(card);
}

function populateNewFront(cat) {
  const figure = document.createElement("figure");
  figure.className = "cardFace front";
  const image = document.createElement('img')
  image.src = "https://s3.amazonaws.com/ccg-corporate-production/news-images/Back0_Sheet%20(F)20201203163456929.jpg"

  figure.appendChild(image)
  return figure;
}



// random cat card art_crop api https://api.scryfall.com/cards/random?as=grid&order=name&q=type%3Acat&version=art_crop
/*function getRandomCatImg() {
  getAPIData('https://api.scryfall.com/cards/random?as=grid&order=name&q=type%3Acat&version=art_crop').then((data) => {return data.image_uris.art_crop})
}*/

//create a combined array of both methods...
//well I could filter and map to make a simpler object and then for each I will push the art_crop url into a new array, giving me an array of 234 image urls
// var number = Math.floor(Math.random()*randomImage.length);
//return document.getElementByClassName('result').innerHTML = '<img src="'+randomImage[number]+'"


function populateNewBack(cat) {
  const catDiv = document.createElement("div");
  catDiv.className = "cardFace back newDiv";
  const catName = document.createElement("h1");
  catName.textContent = cat.name
  const catType = document.createElement("h2"); //
  catType.textContent = cat.type

  const catImage = document.createElement('span') 
  catImage.className = 'result'
  
  const catList = document.createElement("ul");
  cat.abilities.forEach((abilityItem) => {
    let listItem = document.createElement("li");
    listItem.textContent = abilityItem.ability.name;
    catList.appendChild(listItem);
  });

  const catLevel = document.createElement('h3')
  
  catLevel.textContent = cat.level
  catDiv.appendChild(catImage)
  catDiv.appendChild(catName)
  catDiv.appendChild(catType)
  catDiv.appendChild(catList)
  catDiv.appendChild(catLevel)

  return catDiv;
}

//make the random image in the cat creator function
//insert the link for more information about the cat card onto the card

//combine the two api calls into one variable of data,

//simplify that data

//use the simplified function of data to make a select button that will sort on rarity or color

//using the reduce function on the simplified data to see which cat has the highest power/toughness ratio, to find the cards and push them to an empty array and then display that array with populate(Cards)

//

/*a condition followed by a question mark (?), then an expression to execute if the condition is truthy followed by a colon (:), and finally the expression to execute if the condition is falsy.*/

/*
const biggestWeasel = simplifiedMembers().reduce(
  (acc, senator) =>
    (acc.missedVotesPct || 0) > senator.missedVotesPct ? acc : senator,
  {}
); 

function simplifiedMembers(chamberFilter -naming the argument) {
  const filteredArray = members.filter((member) /naming the array element =>
    chamberFilter ? member.short_title === chamberFilter : member);
  

  return filteredArray.map((member) => {
    const middleName = member.middle_name ? ` ${member.middle_name} ` : ` `;
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
      state: member.state,
      url: member.url,
    };
  });
}
*/