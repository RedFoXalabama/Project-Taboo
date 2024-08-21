import Card from "./Card.jsx";
import { useState, useEffect } from "react";
import TabooButton from "./tabooButton.jsx";
import SkipButton from "./SkipButton.jsx";
import CorrectButton from "./CorrectButton.jsx";

function MatchContainer(){

  const [cardsArray, setCardsArray] = useState([]);

  useEffect(() => {
    const getCardsFromServer = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/cards/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (response.ok) {
          return await response.json();
        } else {
          throw new Error('Request failed!');
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAndSetCards = async () => {
      const cardsJSON = await getCardsFromServer();
      let tempArray = [];
      await CardsFromJsonToArray(cardsJSON, tempArray);
      setCardsArray(ShuffleCards(tempArray));
    };

    fetchAndSetCards();
  }, []);

  /*console.log("CARDS ARRAY FINALE " + "(" + cardsArray.length +"): "+ JSON.stringify(cardsArray, null, 2));*/

  function handleNewCard(){
    let {card, updatedCardsArray } = DrawCard(cardsArray);
    setCardsArray(updatedCardsArray);
    ShowNewCard(card);
  }

    return (
        <div id="matchContainer">
            <Card />
            <div id="matchButtonsContainer">
                <TabooButton onHandleNewCard={handleNewCard} /> 
                <SkipButton onHandleNewCard={handleNewCard} />
                <CorrectButton onHandleNewCard={handleNewCard}/>
            </div>
        </div>
    )
}

//FUNZIONI PER OPERARE SULLE CARTE
//CREAZIONE DI UN ARRAY DI CARTE DUPLICATO SU CUI LAVORARE
function CardsFromJsonToArray(json, array) {
    return new Promise((resolve, reject) => {
      try {
        for (let i = 0; i < json.length; i++) {
          if (i == 0) { // rimuovo la prima carta vuota
            continue;
          }
          array.push(json[i]);
        }
        console.log("From Json to Array: ");
        console.log(array);
        resolve(array);
      } catch (error) {
        reject(error);
      }
    });
  }
  //SHUFFLING DELLE CARTE
  function ShuffleCards(cardsArray){
    let array = cardsArray;
    array.sort(() => Math.random() - 0.5);
    console.log("Shuffled Cards: ");
    console.log(array);
    return array;
  }

  //FUNZIONE PER PRELEVARE UNA CARTA DAL MAZZO
  function DrawCard(array) {
    const card = array.pop();
    return { card, updatedCardsArray: array };
  }
  //FUNZIONE PER VISUALIZZARE UNA NUOVA CARTA
  function ShowNewCard(card) { //ShowNewCard(SetCardsArray(DrawCard(cardsArray)))
    const cardWord = document.getElementById("cardWord");
    cardWord.innerText = card.cardName;
      for (let i = 0; i < card.tabooWords.length; i++) {
          let tabooListElement = document.getElementById("cardListElement"+i);
          tabooListElement.innerText = card.tabooWords[i];
      }
  }

export default MatchContainer;