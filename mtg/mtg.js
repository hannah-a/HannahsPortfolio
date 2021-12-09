// magic the gathering API Boom baby
// the cat link https://api.scryfall.com/cards/search?as=grid&order=name&q=%28type%3Acreature+type%3Acat%29&format=json
//rare cat 62 objects https://api.scryfall.com/cards/search?as=grid&order=name&q=type%3Acat+rarity%3Ar&format=json

import { removeChildren } from "../utils/index.js";


const mtgGrid = document.querySelector(".mtgGrid");
const loadButton = document.querySelector(".loadCats");
loadButton.addEventListener("click", () => {
  removeChildren(mtgGrid);
  loadMTG();
});

const allCats = getCatsArray()

function getCatsArray() {
 const allCats = []
 getAPIData(//only loads 175 at a time
    `https://api.scryfall.com/cards/search?as=grid&order=name&q=%28type%3Acreature+type%3Acat%29&format=json`
  ).then((catData) => {
    for (const card of catData.data) {
      if (card.hasOwnProperty('card_faces')) {
      const specialCat = {
        name: card.card_faces[0].name,
        artcrop: card.card_faces[0].image_uris.art_crop,
        cardimg: card.card_faces[0].image_uris.normal,
        rarity: card.rarity
      }
      allCats.push(specialCat)
      } else {
      const mappedCat = {
        name: card.name,
        artcrop: card.image_uris.art_crop,
        cardimg: card.image_uris.normal,
        rarity: card.rarity
      }
      allCats.push(mappedCat)}
    }
  });
  getAPIData(//next page of cats
    `https://api.scryfall.com/cards/search?format=json&include_extras=false&include_multilingual=false&order=name&page=2&q=%28type%3Acreature+type%3Acat%29&unique=cards`
  ).then((catData) => {
    for (const card of catData.data) {
      const mappedCat = {
        name: card.name,
        artcrop: card.image_uris.art_crop,
        cardimg: card.image_uris.normal,
        rarity: card.rarity
      }
      allCats.push(mappedCat)
    }
  });
  return allCats
}

console.log(allCats)

//make if else statements for loadmtg and this one to do different things if card.hasOwnProperty('card_faces')

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
      if (card.hasOwnProperty('card_faces')) {
      populateSpecialCard(card)
      } else {
      populateCard(card); 
      }
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
  mtgCard.addEventListener("mouseenter", () =>
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
  imgBack.src = card.image_uris.normal
  //const button = document.createElement('button')
 // button.textContent = 'Enlarge'
 // button.className = 'newButton'
 // mtgBack.appendChild(button)
  mtgBack.appendChild(imgBack);
  return mtgBack;
}


//For that one special card that broke everything because it wanted to be special

function populateSpecialCard(singleCard) {
  const mtgScene = document.createElement("div");
  mtgScene.className = "scene";
  const mtgCard = document.createElement("div");
  mtgCard.className = "card";
  mtgCard.addEventListener("click", () =>
    mtgCard.classList.toggle("is-flipped")
  );
  mtgCard.addEventListener("mouseenter", () =>
    mtgCard.classList.toggle("is-flipped")
  );

  const front = populateSpecialFront(singleCard);
  const back = populateSpecialBack(singleCard);

  mtgCard.appendChild(front);
  mtgCard.appendChild(back);
  mtgScene.appendChild(mtgCard);
  mtgGrid.appendChild(mtgScene);

}

function populateSpecialFront(card) {
  const mtgFront = document.createElement("figure");
  mtgFront.className = "cardFace front";
  const imgFront = document.createElement("img");
  imgFront.src = card.card_faces[0].image_uris.normal
  mtgFront.appendChild(imgFront);
  return mtgFront;
}

function populateSpecialBack(card) {
  const mtgBack = document.createElement("figure");
  mtgBack.className = "cardFace back";
  const imgBack = document.createElement("img");
  imgBack.src = card.card_faces[1].image_uris.normal
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
  catName.className = 'newName'
  const catType = document.createElement("h2"); //
  catType.textContent = cat.type
  catName.className = 'newType'
  const catImage = document.createElement('img') 
  catImage.className = 'newImg'
  catImage.src = 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/2/4/24c1706d-2faa-452b-a192-204386df29f6.jpg?1619395734'
  
  const catList = document.createElement("ul");
  catList.className = 'newList'
  cat.abilities.forEach((abilityItem) => {
    let listItem = document.createElement("li");
    listItem.className = 'newItem'
    listItem.textContent = abilityItem.ability.name;
    catList.appendChild(listItem);
  });

  const catLevel = document.createElement('h3')
  catLevel.className = 'newLevel'
  catLevel.textContent = cat.level

  catDiv.appendChild(catName)
  catDiv.appendChild(catImage)
  catDiv.appendChild(catType)
  catDiv.appendChild(catList)
  catDiv.appendChild(catLevel)

  return catDiv;
}
