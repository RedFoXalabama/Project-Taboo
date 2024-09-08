/* eslint-disable react/prop-types */
import Card from "./Card.jsx";
import { useState, useEffect } from "react";
import TabooButton from "./tabooButton.jsx";
import SkipButton from "./SkipButton.jsx";
import CorrectButton from "./CorrectButton.jsx";
import MatchTime from "./MatchTime.jsx";
import MatchPoints from "./MatchPoints.jsx";
import ChangeTurnButton from "./ChangeTurnButton";
import NamePlayerTurn from "./NamePlayerTurn.jsx";
import {useGameState, useCardWords, useTeamsScore} from "../scripts/store.js";
import { getURL } from '../scripts/utility';
import { set } from "mongoose";

function MatchContainer({onHandleEndMatch}){
  //STATI PER LA GESTIONE DELLE CARTE E REGOLE
  const [cardsArray, setCardsArray] = useState([]); //array di carte per il mazzo, viene inizializzato con le carte prelevate dal server e si modifica durante la partita
  const [localCardsArray, setLocalCardsArray] = useState([]); //array di carte locale per il rifornimento del mazzo
  const [deckState, setDeckState] = useState(false); // FALSE = PIENO, TRUE = VUOTO
  const [rules, setRules] = useState([]); //array di regole per la partita
  const [cardsReady, setCardsReady] = useState(false); // FALSE = NON PRONTE, TRUE = PRONTE
  const [rulesReady, setRulesReady] = useState(false); // FALSE = NON PRONTE, TRUE = PRONTE
  const [playersReady, setPlayersReady] = useState(false); // FALSE = NON PRONTE, TRUE = PRONTE

  //STATI PER LA GESTIONE DELLA PARTITA
  //stati delle regole della partita
  const [playerNumber, setPlayerNumber] = useState(0); //numero di giocatori totale
  const [redTeam, setRedTeam] = useState([]); //array di giocatori del team rosso
  const [blueTeam, setBlueTeam] = useState([]); //array di giocatori del team blu
  const [turnNumber, setTurnNumber] = useState(0); //numero di turni
  const [turnTime, setTurnTime] = useState(0); //tempo per turno
  const [passPerTurn, setPassPerTurn] = useState(0); //pass per turno

  //stati della partita
  const [allPlayers, setAllPlayers] = useState([]); //array di tutti i giocatori
  const [currentPlayer, setCurrentPlayer] = useState(""); //giocatore attuale
  const {redScore, setRedScore, blueScore, setBlueScore} = useTeamsScore(); //punteggi delle squadre
  const [currentTurn, setCurrentTurn] = useState(0);  //turno attuale
  const [breakTime, setBreakTime] = useState(false); // TRUE = CAMBIO DI TURNO, FALSE = SI STA GIOCANDO
  const { currentTeam, setCurrentTeam, setWinningTeam } = useGameState(); //squadra attuale e squadra vincente
  const { cardWord, tabooWords, setCardWords, setTabooWords } = useCardWords(); //parola e parole tabù della carta attuale
  const {gameId} = useGameState(); //id della partita

  useEffect(() => { //stampa dell'id della partita
    console.log("gameID: " + gameId);
  })

  //GET - PRELEVA LE CARTE DAL SERVER
  useEffect(() => {
    const getCardsFromServer = async () => {
      try {
        const response = await fetch(getURL("/cards/"),  {
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
      setLocalCardsArray([...tempArray]);
      setCardsArray(ShuffleCards(tempArray));
      setCardsReady(true);
    };

    fetchAndSetCards();
  }, []);

  //POST - PRELEVA LE REGOLE DAL SERVER
  useEffect(()=>{ //viene chiamata ogni qual volta gameId viene modificato (quindi ogni volta che viene creata una nuova partita)
    if(gameId.id != null && gameId.new == true){
      const getRulesFromServer = async (gameId) => {
        try {
          //console.log("Sending request with gameId:" + gameId.id);
          
          const response = await fetch(getURL("/rules/getRulesByID/"), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(gameId),
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
        const rulesJSON = await getRulesFromServer({gameId});
        setRules(rulesJSON);
      };
  
      fetchAndSetRules();
      console.log("Rules: " + JSON.stringify(rules, null, 2));
    }

  }, [gameId]);

  //AGGIORNAMENTO DELLO STATO DELLA PARTITA
  useEffect(() => { //chiamata ogni volta che rules viene modificato
    if (rules && rules.length != 0) {
      setPlayerNumber(rules.playerNumber);
      setRedTeam(rules.redTeam);
      setBlueTeam(rules.blueTeam);
      setTurnNumber(rules.turnNumber);
      setTurnTime(rules.turnTime);
      setPassPerTurn(rules.passPerTurn);
      setRulesReady(true);
    }
  }, [rules]);

  useEffect(() => {
    if (rulesReady){
      let tempPlayerArray = [];
      for (let j=0; j < turnNumber; j++) {
        for (let i = 0; i < playerNumber/2; i++) {
          tempPlayerArray.push(redTeam[i]);
          tempPlayerArray.push(blueTeam[i]);
        }
      }
      setAllPlayers(tempPlayerArray); //array di tutti i giocatori
    }
  }, [rulesReady]);

  useEffect(()=>{
    if (allPlayers.length != 0) {
      setPlayersReady(true);
    }
  }, [allPlayers]);

  useEffect(() => { //FUNZIONE CHIAMATA PER INIZIALIZZARE IL TURNO
    if (playersReady && cardsReady) { //chiamata ogni volta che rulesReady e cardsReady vengono modificati, quindi quando entrambi sono true inizia la parita
      //RESETTA I PUNTEGGI E IL TURNO
      setCurrentTurn(0);
      setCurrentTeam("red");
      setWinningTeam("");
      changeCurrentPlayer(); //cambia il giocatore attuale
      setRedScore(0);
      setBlueScore(0);
      //INIZIA PARTITA
      setBreakTime(true); //cambia lo stato del turno a breakTime=true per visualizzare il pulsante di cambio turno per iniziare la partita
    }
  }, [playersReady, cardsReady]);

  useEffect(() => { //FUNZIONE CHIAMATA PER AGGIORNAMENTO DEL TURNO
    //chiamata ad ogni cambio di turno per gestire il cambio di squadra
      if (currentTurn == turnNumber*playerNumber + 1 && currentTurn > 1) {
        if (redScore > blueScore) {
          alert("Red Team Wins!");
          setWinningTeam("RED");
        } else if (redScore < blueScore) {
          alert("Blue Team Wins!");
          setWinningTeam("BLUE");
        } else {
          alert("It's a tie!");
          setWinningTeam("TIE");
        }
        onHandleEndMatch();
      } else if (currentTurn <= turnNumber*playerNumber && currentTurn != 0) {
        console.log("Turno: " + currentTurn);
        console.log("AllPlayers: " + JSON.stringify(allPlayers, null, 2));
        changeCurrentPlayer(); //cambia il giocatore attuale
        if (currentTurn % 2 == 0) {
          setCurrentTeam("blue");
        } else {
          setCurrentTeam("red");
        }
      }
  }, [currentTurn]);

  useEffect(() => { //chiamata quando il mazzo è vuoto e quindi lo riaggiorna
    if (cardsArray.length == 0 || deckState) {
      console.log("RICARICO LO STOCK");
      setCardsArray(ShuffleCards(localCardsArray));
    }
  }, [deckState]);


  //FUNZIONI

  //PESCA E MOSTRA UNA NUOVA CARTA DAL MAZZO
  function handleNewCard(){
    if (cardsArray.length == 0) { //se il mazzo è vuoto non restituisce una nuova carta, ma riaggiorna il mazzo (bisogna ripremere il pulsante per pescare una nuova carta)
      alert("Deck is empty! -- REFILLING");
      setDeckState(true);
      return false; //ritorna false per non incrementare il punteggio
    } else {
      let {card, updatedCardsArray } = DrawCard(cardsArray); //pesca una carta dal mazzo e restituisce la carta e il mazzo aggiornato (senza la carta pescata)
      setCardsArray(updatedCardsArray); //aggiorna il mazzo con il mazzo aggiornato (senza la carta pescata)
      ShowNewCard(card); //mostra la carta pescata
      return true; //ritorna true per incrementare il punteggio
    }
  }

  //FUNZIONI PER IL CAMBIO DI TURNO
  function handleChangeTurn() {
    setBreakTime(true); //cambia lo stato del turno a breakTime=true per visualizzare il pulsante di cambio turno
  }

  //FUNZIONE PER INIZIARE IL NUOVO TURNO
  function handleNewTurn() {
    setBreakTime(false); //cambia lo stato del turno a breakTime=false per visualizzare il timer e le carte
    setCurrentTurn(currentTurn + 1); //incrementa il turno
    setPassPerTurn(rules.passPerTurn); //resetta i pass per turno disponibili
    handleNewCard(); //pesca una nuova carta
  }

  //FUNZIONI PER ASSEGNARE I PUNTEGGI DAI PULSANTI
  function addPoint(){ //aggiunge un punto alla squadra corrente
    if (handleNewCard()) {
      if (currentTeam == "red") {
        setRedScore(redScore + 1);
      } else if (currentTeam == "blue") {
        setBlueScore(blueScore + 1);
      }
    }
  }
  
  function subtractPoint(){ //sottrae un punto alla squadra corrente
    if (handleNewCard()) {
      if (currentTeam == "red") {
        setRedScore(redScore - 1);
      } else if (currentTeam == "blue") {
        setBlueScore(blueScore - 1);
      }
    }
  }
  
  function skipCard(){ //salta la carta attuale e decrementa i pass per turno disponibili
    if (passPerTurn > 0) {
      setPassPerTurn(passPerTurn - 1);
      handleNewCard();
    } else {
      alert("You can't skip anymore cards!");
      //TODO: aggiungere un suono
    }
  }

  //GESTIONE NOMI GIOCATORI
  function changeCurrentPlayer(){
    if (allPlayers[currentTurn] == undefined) {
      setCurrentPlayer("PARTITA TERMINATA");
    } else {
      setCurrentPlayer("É il turno di " + allPlayers[currentTurn]);
    }
  }

  //RENDERING DEL CONTENITORE DELLA PARTITA
  switch (breakTime) {
    case true:
      return (
        <div id="matchContainer">
                <div id="NamePlayerTurnContainer">
                  <NamePlayerTurn playerName={currentPlayer} />
                </div>
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


//FUNZIONI PER OPERARE SULLE CARTE PRELEVATE DAL SERVER
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
  function DrawCard(array) { //pesco una nuova carta dal mazzo e restituisco la carta e il mazzo aggiornato
      const card = array.pop();
      return { card, updatedCardsArray: array };
  }

  //FUNZIONE PER VISUALIZZARE UNA NUOVA CARTA
  function ShowNewCard(card) { //ShowNewCard(SetCardsArray(DrawCard(cardsArray)))
    //mostra la nuova carta aggiornando lo stato della parola e delle parole tabù
    console.log("Card: " + card.cardName);
    setCardWords(card.cardName);
    console.log("CardWord: " + cardWord);
    setTabooWords(card.tabooWords);
    console.log("TabooWords: " + tabooWords);
  }
}
export default MatchContainer;