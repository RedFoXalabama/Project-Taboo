import { useState } from 'react'
import './App.css'
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import StartGame from './components/StartGame.jsx';
import RuleCarousel from './components/RuleCarousel.jsx';
import FormContainer from './components/FormContainer.jsx';
import MatchContainer from './components/MatchContainer.jsx';
import EndMatch from './components/EndMatch.jsx';
import {useGameState} from './scripts/store.js';

function App() { //APP PRINCIPALE
  const [page, setPage] = useState("index");
  const {gameState, currentTeam, setGameState} = useGameState();
  const {winningTeam} = useGameState();

  //FUNZIONI PER IL CAMBIO DELLO STATO DELLA PAGINA
  const handleBackToIndex = () => {
    setPage("index");
  }
  const handleStartGame = () => {
    setGameState("lobby");
    setPage("lobby");
  }
  const handleStartMatch = () => {
    setGameState("playing");
    setPage("match");
  }
  const handleEndMatch = () => {
    setGameState("end");
    setPage("endMatch");
  }

  const handleHeaderImgID = () => {
    if (page === "index") {
      return "tabooLogo";
    } else if (page === "lobby") {
      return "tabooLogoForm";
    } else if (page === "match") {
      return "tabooLogoMatch";
    } else if (page === "endMatch") {
      return "tabooLogo";
    }
  }

  //FUNZIONE DI RENDERING DELLA PAGINA
  function pageRender(){
    switch (page) {
      case "index":
        return (
          <>
          <Header imgID={handleHeaderImgID()}/>
          <StartGame onStartGame={handleStartGame}/>
          <RuleCarousel />
          <Footer />
        </>
        )
      case "lobby":
        return (
          <>
          <Header imgID={handleHeaderImgID()}/>
          <FormContainer onStartMatch={handleStartMatch} onBackToIndex={handleBackToIndex} />
          <Footer />
        </>
        )
      case "match":
        return (
          <>
          <Header imgID={handleHeaderImgID()}/>
          <MatchContainer onHandleEndMatch={handleEndMatch} />
          <Footer />
        </>
        )
      case "endMatch":
        return (
          <>
          <Header imgID={handleHeaderImgID()}/>
          <EndMatch onHandleBackToIndex={handleBackToIndex} onHandleStartGame={handleStartGame}/>
          <Footer />
          </>
        )
      }
  }

  //FUNZIONE PER IL CAMBIO DELLO SFONDO IN BASE ALLO STATO DELLA PARTITA
  function getBackground(){
    if (gameState == "playing") {
      if (currentTeam == "red") {
        return "rgb(240,91,102) radial-gradient(circle, rgba(240,91,102,1) 0%, rgba(135,1,11,1) 68%)";
      } else if (currentTeam == "blue") {
        return "rgb(0,166,229) radial-gradient(circle, rgba(0,166,229,1) 0%, rgba(0,38,150,1) 68%)";
      }
    }
    if (gameState == "end") {
      if (winningTeam == "RED") {
        return "rgb(240,91,102) radial-gradient(circle, rgba(240,91,102,1) 0%, rgba(135,1,11,1) 68%)";
      } else if (winningTeam == "BLUE") {
        return "rgb(0,166,229) radial-gradient(circle, rgba(0,166,229,1) 0%, rgba(0,38,150,1) 68%)";
      } else if (winningTeam == "TIE") {
        return "rgb(146,28,181) radial-gradient(circle, rgba(146,28,181,1) 0%, rgba(58,0,87,1) 100%)"
      }
    }
    return "rgb(146,28,181) radial-gradient(circle, rgba(146,28,181,1) 0%, rgba(58,0,87,1) 100%)";  
  }

  //RETURN DELLA PAGINA
  return (
    <div style={
      {
        background:  getBackground(),
        height: "100%",
        minHeight: "100vh",
      }
    }>
      {pageRender()}
    </div>
  )
}
export default App;