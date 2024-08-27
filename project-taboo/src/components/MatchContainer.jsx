/* eslint-disable react/prop-types */
import Card from "./Card.jsx";
import { useState, useEffect } from "react";
import TabooButton from "./tabooButton.jsx";
import SkipButton from "./SkipButton.jsx";
import CorrectButton from "./CorrectButton.jsx";
import MatchTime from "./MatchTime.jsx";
import MatchPoints from "./MatchPoints.jsx";
import ChangeTurnButton from "./ChangeTurnButton";
import {useGameState, useCardWords, useTeamsScore} from "../scripts/store.js";

function MatchContainer({clientID}){
  //STATI PER LA GESTIONE DELLE CARTE E REGOLE
  const [cardsArray, setCardsArray] = useState([]);
  const [rules, setRules] = useState([]);
  const [cardsReady, setCardsReady] = useState(false);
  const [rulesReady, setRulesReady] = useState(false);

  //STATI PER LA GESTIONE DELLA PARTITA
  const [playerNumber, setPlayerNumber] = useState(0);
  const [redTeam, setRedTeam] = useState([]);
  const [blueTeam, setBlueTeam] = useState([]);
  const [turnNumber, setTurnNumber] = useState(0);
  const [turnTime, setTurnTime] = useState(0);
  const [passPerTurn, setPassPerTurn] = useState(0);
  const {redScore, setRedScore, blueScore, setBlueScore} = useTeamsScore();
  const [currentTurn, setCurrentTurn] = useState(0);
  const [breakTime, setBreakTime] = useState(false);
  const { gameState, setGameState, currentTeam, setCurrentTeam } = useGameState();
  const { cardWord, tabooWords, setCardWords, setTabooWords } = useCardWords();

  //PRELEVA LE CARTE DAL SERVER
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
      setCardsReady(true);
    };

    fetchAndSetCards();
  }, []);

  //PRELEVA LE REGOLE DAL SERVER
  useEffect(()=>{
    const getRulesFromServer = async (clientID) => {
      try {
        console.log("Sending request with clientID:" + JSON.stringify({clientID}));
        const response = await fetch('http://localhost:3000/api/rules/getRulesByID/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(clientID),
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

    const fetchAndSetRules = async () => {
      const rulesJSON = await getRulesFromServer({clientID});
      setRules(rulesJSON);
    };

    fetchAndSetRules();
    console.log("Rules: " + JSON.stringify(rules, null, 2)); 
  }, []);

  //AGGIORNAMENTO DELLO STATO DELLA PARTITA
  useEffect(() => {
    if (rules) {
      setPlayerNumber(rules.playerNumber);
      setRedTeam(rules.redTeam);
      setBlueTeam(rules.blueTeam);
      setTurnNumber(rules.turnNumber);
      setTurnTime(rules.turnTime);
      setPassPerTurn(rules.passPerTurn);
    }
    setRulesReady(true);
  }, [rules]);

  useEffect(() => { //FUNZIONE CHIAMATA PER INIZIALIZZARE IL TURNo
    if (rulesReady && cardsReady) {
      handleNewTurn();
    }
  }, [rulesReady, cardsReady]);

  useEffect(() => { //FUNZIONE CHIAMATA PER AGGIORNAMENTO DEL TURNO DA TIMER
      if (currentTurn == turnNumber*playerNumber + 1 && currentTurn > 1) {
        if (redScore > blueScore) {
          alert("Red Team Wins!");
        } else if (redScore < blueScore) {
          alert("Blue Team Wins!");
        } else {
          alert("It's a tie!");
        }
      } else if (currentTurn <= turnNumber*playerNumber && currentTurn != 0) {
        console.log("Turno: " + currentTurn);
        if (currentTurn % 2 == 0) {
          setCurrentTeam("blue");
        } else {
          setCurrentTeam("red");
        }
      }
  }, [currentTurn, redScore, blueScore]);

  function handleNewCard(){
    let {card, updatedCardsArray } = DrawCard(cardsArray);
    setCardsArray(updatedCardsArray);
    ShowNewCard(card);
  }

  function handleChangeTurn() {
    setBreakTime(true);
  }

  function handleNewTurn() {
    setBreakTime(false);
    setCurrentTurn(currentTurn + 1);
    handleNewCard();
  }

  //FUNZIONI PER ASSEGNARE I PUNTEGGI DAI PULSANTI
  function addPoint(){
    if (currentTeam == "red") {
      setRedScore(redScore + 1);
    } else if (currentTeam == "blue") {
      setBlueScore(blueScore + 1);
    }
  }
  
  function subtractPoint(){
    if (currentTeam == "red") {
      setRedScore(redScore - 1);
    } else if (currentTeam == "blue") {
      setBlueScore(blueScore - 1);
    }
  }
  
  function skipCard(){
    if (passPerTurn > 0) {
      setPassPerTurn(passPerTurn - 1);
      handleNewCard();
    } else {
      alert("You can't skip anymore cards!");
      //TODO: aggiungere un suono
    }    
  }

  switch (breakTime) {
    case true:
      return (
        <div id="matchContainer">
                <div id="timeCardPoints">
                  <MatchPoints />
                </div>
                <div id="matchButtonsContainer">
                  <ChangeTurnButton id="changeTurnButton" handleNewTurn={handleNewTurn}/>
                </div>
          </div>
      );
    case false:
      if (turnTime > 0  && turnTime !== undefined) {
        return (
          <div id="matchContainer">
                <div id="timeCardPoints">
                  <MatchTime turnTime={turnTime} handleChangeTurn={handleChangeTurn} />
                  <Card />
                  <MatchPoints />
                </div>
                <div id="matchButtonsContainer">
                  <TabooButton onSubtractPoint={subtractPoint} /> 
                  <SkipButton onSkipCard={skipCard} />
                  <CorrectButton onAddPoint={addPoint}/>
                </div>
          </div>
        );
      }  
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
    console.log("Card: " + card.cardName);
    setCardWords(card.cardName);
    console.log("CardWord: " + cardWord);
    setTabooWords(card.tabooWords);
    console.log("TabooWords: " + tabooWords);
  }
}
export default MatchContainer;