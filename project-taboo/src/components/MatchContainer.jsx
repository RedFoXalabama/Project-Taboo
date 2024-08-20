import Card from "./Card.jsx";
import { useState } from "react";

function MatchContainer(){

    const [cardsArray, setCardsArray] = useState([]);

    async function getCardsFromServer() {
        try {
          const response = await fetch('http://localhost:3000/api/cards/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          });
          if (response.ok) {
            console.log(response.json());
            return await response.json();
          } else {
            throw new Error('Request failed!');
          }
        } catch (error) {
          console.log(error);
        }
    }
    const cards = getCardsFromServer();
  
  //OPERAZIONI SULLE CARTE
  cardsFromJsonToArray(cards, cardsArray).then(() => {
    setCardsArray(shuffleCards(cardsArray));
  }).catch(error => console.error(error));



    return (
        <div id="matchContainer">
            <Card />
            <div id="matchButtonsContainer">
                <button id="tabooButton">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="782.000000pt" height="919.000000pt" viewBox="0 0 782.000000 919.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,919.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                        <path d="M7717 9137 c-70 -171 -415 -441 -817 -641 -336 -167 -667 -283 -925 -326 -38 -6 -92 -15 -120 -21 -27 -5 -185 -27 -350 -49 -165 -22 -385 -54 -490 -70 -104 -16 -314 -46 -465 -65 -370 -49 -650 -88 -1390 -195 -344 -50 -814 -118 -1045 -151 -440 -63 -482 -72 -720 -161 -537 -200 -952 -571 -1184 -1059 -169 -355 -233 -740 -201 -1215 13 -191 19 -224 45 -224 7 0 59 51 114 113 55 61 129 137 163 168 131 115 316 259 333 259 4 0 59 34 120 75 149 98 387 214 558 270 115 38 175 51 360 76 122 17 487 69 812 115 324 46 591 81 594 79 4 -5 9 -37 76 -530 20 -148 52 -376 71 -505 19 -129 50 -343 69 -475 19 -132 48 -332 64 -445 17 -113 89 -614 161 -1115 124 -867 150 -1038 169 -1095 5 -14 14 -45 21 -70 25 -89 52 -155 116 -284 354 -711 1113 -1277 2019 -1505 244 -62 620 -100 850 -86 270 17 650 83 650 114 0 8 -27 23 -65 36 -78 26 -158 66 -292 146 -380 226 -751 598 -977 981 -193 328 -294 612 -322 907 -6 64 -64 490 -129 946 -65 457 -125 893 -135 970 -9 77 -28 205 -40 285 -13 80 -31 206 -40 280 -9 74 -22 173 -30 220 -34 203 -215 1495 -211 1505 4 11 57 20 356 61 63 8 180 26 260 39 80 13 170 27 200 30 185 18 436 88 650 180 433 186 784 523 1002 960 68 135 165 427 184 548 26 177 38 488 25 636 -17 187 -45 331 -64 331 -7 0 -20 -19 -30 -43z"/>
                        </g>
                    </svg>
                </button>
                <button id="skipButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-skip-forward-fill" viewBox="0 0 16 16">
                        <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.753l-6.267 3.636c-.54.313-1.233-.066-1.233-.697v-2.94l-6.267 3.636C.693 12.703 0 12.324 0 11.693V4.308c0-.63.693-1.01 1.233-.696L7.5 7.248v-2.94c0-.63.693-1.01 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </button>
                <button id="correctButton">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}

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
  function shuffleCards(cardsArray){
    let array = cardsArray;
    array.sort(() => Math.random() - 0.5);
    console.log("Shuffled Cards: ");
    console.log(array);
    return array;
  }

  //FUNZIONE PER PRELEVARE UNA CARTA DAL MAZZO
  function drawCard(array) { //SetCardsArray(DrawCard(cardsArray))
    return array.pop();
  }
  //FUNZIONE PER VISUALIZZARE UNA NUOVA CARTA
  function showNewCard(card) { //ShowNewCard(SetCardsArray(DrawCard(cardsArray)))
    const cardWord = document.getElementById("cardWord");
    cardWord.innerText = card.cardName;
      for (let i = 0; i < card.tabooWords.length; i++) {
          let tabooListElement = document.getElementById("cardListElement"+i);
          tabooListElement.innerText = card.tabooWords[i];
      }
  }

export default MatchContainer;