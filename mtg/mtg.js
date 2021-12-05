// magic the gathering API Boom baby 
// the cat link https://api.scryfall.com/cards/search?as=grid&order=name&q=%28type%3Acreature+type%3Acat%29&format=json

//rare cat 62 objects https://api.scryfall.com/cards/search?as=grid&order=name&q=type%3Acat+rarity%3Ar&format=json



function getAPIData(url) { //removing async makes data come in order
    try {
      return fetch(url).then((mtgData) => mtgData.json()) //then with data it will data in json by calling it, it's going to call the api ten times inorder
    } catch (error) {
      console.error(error)
    }
  }
  
  function loadMTG() { //without a function, js will just read it and call it but with a button you can control it so put it in function
    getAPIData(
        `https://api.scryfall.com/cards/search?as=grid&order=name&q=type%3Acat+rarity%3Ar&format=json`
    ).then((mtgData) => {
      for (const card of mtgData.data) { //inside for loop, just want the results array, will give each pokemon one at a time
        console.log(card.name, card.image_uris.normal) //if we have one pokemon at a time, we can populate each card for each one
      }
    })
  }
  loadMTG()

  //tomorrow, make css card, populate card back and fronts, research pagination, make random button