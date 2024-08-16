//VARIABILI
let cardsArray = [];

//PULSANTI DI PROVA PER IL CAMBIO TURNO, SARANNO SOSTITUITI DA UNO SCRIPT AUTOMATICO
const redButton = document.getElementById("redButton");
const blueButton = document.getElementById("blueButton");
const body = document.querySelector("body");
const wordContainer = document.getElementById("wordContainer");
redButton.addEventListener("click", () => {
    body.style.background = 'rgb(240,91,102)';
    body.style.background = 'radial-gradient(circle, rgba(240,91,102,1) 0%, rgba(135,1,11,1) 68%)';
    //wordContainer.setAttribute('background-image', 'url("../assets/carta_bordo_interno_rosso.png")'); sarebbe meglio usare questo perchè asincrono, ma non funge
    wordContainer.style.backgroundImage = 'url("../assets/carta_bordo_interno_rosso.png")';
});
blueButton.addEventListener("click", () => {
    body.style.background = 'rgb(0,166,229)';
    body.style.background = 'radial-gradient(circle, rgba(0,166,229,1) 0%, rgba(0,38,150,1) 68%)';
    //wordContainer.setAttribute('background-image', 'url("../assets/carta_bordo_interno_blu.png")');
    wordContainer.style.backgroundImage = 'url("../assets/carta_bordo_interno_blu.png")';
});

//FUNZIONE PER OTTENERE LE CARTE DAL DATABASE
async function getCardsFromServer() {
    try {
      const response = await fetch('http://localhost:3000/api/cards/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (response.ok) {
        //const data = await response.json();
        //console.log(data);
        //return data;
        return await response.json();
      } else {
        throw new Error('Request failed!');
      }
    } catch (error) {
      console.log(error);
    }
}
const cards = getCardsFromServer();

//FUNZIONI PER OPERARE SULLE CARTE

//CREAZIONE DI UN ARRAY DI CARTE DUPLICATO SU CUI LAVORARE
function cardsFromJsonToArray(json, array) {
  return new Promise((resolve, reject) => {
    json.then(json => { 
      for (let i = 0; i < json.length; i++) {
        if(i==0) { //rimuovo la prima carta vuota
          continue;
        }
        array.push(json[i]);
      }
      console.log("From Json to Array: ");
      console.log(array);
      resolve(array);
    }).catch(error => reject(error));
  });
}
//SHUFFLING DELLE CARTE
function shuffleCards(array){
  array.sort(() => Math.random() - 0.5);
  console.log("Shuffled Cards: ");
  console.log(array);
}
//FUNZIONE PER PRELEVARE UNA CARTA DAL MAZZO
function drawCard(array) {
  return array.pop();
}
//FUNZIONE PER VISUALIZZARE UNA NUOVA CARTA
function showNewCard(card) {
  const cardWord = document.getElementById("cardWord");
  const cardList = document.getElementById("cardList");
  cardWord.innerText = card.cardName;
    for (let i = 0; i < card.tabooWords.length; i++) {
        let tabooListElement = document.getElementById("cardListElement"+i);
        tabooListElement.innerText = card.tabooWords[i];
    }
}

//OPERAZIONI SULLE CARTE
cardsFromJsonToArray(cards, cardsArray).then(() => {
  shuffleCards(cardsArray);
}).catch(error => console.error(error));


//BUTTONS PER GESTIRE LA PARTITA
const correctButton = document.getElementById("correctButton");
const correctAudio = new Audio("../assets/gotitem.mp3");
const skipButton = document.getElementById("skipButton");
const skipAudio = new Audio("../assets/skip_button_sfx.mp3");
//const tabooButton = document.getElementById("tabooButton");
//const tabooAudio = new Audio("../assets/taboo_button_sfx.mp3");

//FUNZIONI PER GESTIRE I PULSANTI
correctButton.addEventListener("click", () => {
    showNewCard(drawCard(cardsArray));
    correctAudio.play();
    correctAudio.currentTime = 0;
});

/*tabooButton.addEventListener("click", () => {
    tabooAudio.play();
    tabooAudio.currentTime = 0;
    showNewCard(drawCard(cardsArray));
});*/

skipButton.addEventListener("click", () => {
    skipAudio.play();
    skipAudio.currentTime = 0;
    showNewCard(drawCard(cardsArray));
});