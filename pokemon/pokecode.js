import { removeChildren } from "../utils/index.js";

function getAPIData(url) {
  //removing async makes data come in order
  try {
    return fetch(url).then((data) => data.json()); //then with data it will data in json by calling it, it's going to call the api ten times inorder
  } catch (error) {
    console.error(error);
  }
}

function loadPokemon(offset = 0, limit = 25) {
  //without a function, js will just read it and call it but with a button you can control it so put it in function
  getAPIData(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then(async (/* in second api data call*/ data) => {
    for (const pokemon of data.results) {
      //inside for loop, just want the results array, will give each pokemon one at a time
      await /*await this function forcing it to go in order of our for loop*/ getAPIData( //this would be useful to create another page of more mtg cards by using the uri
        pokemon.url
      ).then(
        (
          pokeData //only two properties in the object, can call getApi data on each url property
        ) => populatePokeCard(pokeData /*populate using pokeData*/) //if we have one pokemon at a time, we can populate each card for each one
      );
    }
  });
}






// Buttons

const pokeGrid = document.querySelector(".pokeGrid");
const loadButton = document.querySelector(".loadPokemon");
loadButton.addEventListener("click", () => {
  removeChildren(pokeGrid);
  loadPokemon(100, 5); // arrow function returns the calling of the loadPokemon function
});

const moreButton = document.querySelector(".morePokemon");
moreButton.addEventListener("click", () => {
  let limit = prompt("How many more Pokemon should I load?");
  let offset = prompt("At which Pokemon ID should I start loading?");
  loadPokemon(offset, limit);
});

const newButton = document.querySelector(".newPokemon");
newButton.addEventListener("click", () => {
  let pokeName = prompt("What is the name of your new Pokemon?");
  let pokeHeight = prompt("What is the Pokemon's height?");
  let pokeWeight = prompt("What is the Pokemon's weight?");
  let pokeAbilities = prompt(
    "What are your Pokemon abilities? (use a comma separated list)"
  );
  let newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    pokeWeight,
    getAbilitiesArray(pokeAbilities)
  );
  populatePokeCard(newPokemon);
});



// New Button stuff

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

class Pokemon {
  constructor(
    name,
    height,
    weight,
    abilities
  ) /*pass in properties you want it to have */ {
    (this.id = 100),
      (this.name = name),
      (this.height = height),
      (this.weight = weight),
      (this.abilities = abilities);
  }
}






// Populate Function Cards


function populatePokeCard(singlePokemon) {
  const pokeScene = document.createElement("div");
  pokeScene.className = "scene";
  const pokeCard = document.createElement("div");
  pokeCard.className = "card";
  pokeCard.addEventListener("click", () =>
    pokeCard.classList.toggle("is-flipped")
  ); // added event listener to make a button to tranform the card

  const front = populateCardFront(singlePokemon); //will call function, will pass single pokemon to this function
  const back = populateCardBack(singlePokemon);

  pokeCard.appendChild(front);
  pokeCard.appendChild(back);
  pokeScene.appendChild(pokeCard);
  pokeGrid.appendChild(pokeScene);
}
//these two functions to bring in the front card
function populateCardFront(pokemon) /*takes single pokemon */ {
  const pokeFront = document.createElement("figure");
  pokeFront.className = "cardFace front";
  const pokeImg = document.createElement("img");
  pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const pokeCaption = document.createElement("figcaption");
  pokeCaption.textContent = pokemon.name;
  pokeFront.appendChild(pokeImg);
  pokeFront.appendChild(pokeCaption);

  //typesBackground(pokemon, pokeFront)
  return pokeFront; //need to return it so that front equals
}

//could use populate back to populate the card image. I could use the card image and really this because I wouldn't need to add the information myself instead I could just use the images and then have a search button that will filter, map and reduce the data to find certain cards.
function populateCardBack(pokemon) {
  const pokeBack = document.createElement("div");
  pokeBack.className = "cardFace back";
  const label = document.createElement("h4");
  label.textContent = "Abilities:"; //created an h4 text
  pokeBack.appendChild(label);
  const abilityList = document.createElement("ul"); //don't want to numbers to show up
  pokemon.abilities.forEach((abilityItem) => {
    //name of property is abilities
    let listItem = document.createElement("li");
    listItem.textContent = abilityItem.ability.name;
    abilityList.appendChild(listItem);
  });
  pokeBack.appendChild(abilityList);
  return pokeBack;
}




function typesBackground(pokemon, card) {
  let pokeType1 = pokemon.types[0].type.name;
  let pokeType2 = pokemon.types[1]?.type.name;
  console.log(pokeType1, pokeType2);
  card.style.setProperty(
    "background",
    `linear-gradient(${getPokeTypeColor(pokeType1)}, #FFF})`
  );
}

function getPokeTypeColor(pokeType) {
  let color;
  switch (pokeType) {
    case "grass":
      color = "#00FF00";
      break;
    case "fire":
      color = "#FF0000";
      break;
    case "water":
      color = "#0000FF";
      break;
    case "bug":
      color = "#7FFF00";
      break;
    case "normal":
      color = "#F5F5DC";
      break;
    case "flying":
      color = "#00FFFF";
      break;
    case "poison":
      color = "#C300FF";
      break;
    case "electric":
      color = "#C8FF00";
      break;
    case "psychic":
      color = "#333333";
      break;
    default:
      color = "#888888";
  }
}
