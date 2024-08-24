import { useState } from 'react'
import './App.css'
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import StartGame from './components/StartGame.jsx';
import RuleCarousel from './components/RuleCarousel.jsx';
import FormContainer from './components/FormContainer.jsx';
import MatchContainer from './components/MatchContainer.jsx';

function App() {
 const [page, setPage] = useState("index");
 const [clientID, setClientID] = useState(Math.floor(Math.random() * 10001)); //random number between 0 and 10000

  const handleBackToIndex = () => {
    setPage("index");
  }
  const handleStartGame = () => {
    setPage("lobby");
  }
  const handleStartMatch = () => {
    setPage("match");
  }

  const handleHeaderImgID = () => {
    if (page === "index") {
      return "tabooLogo";
    } else if (page === "lobby") {
      return "tabooLogoForm";
    } else if (page === "match") {
      return "tabooLogoMatch";
    }
  }

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
        <FormContainer onStartMatch={handleStartMatch} onBackToIndex={handleBackToIndex} clientID={clientID}/>
        <Footer />
      </>
      )
    case "match":
      return (
        <>
        <Header imgID={handleHeaderImgID()}/>
        <MatchContainer clientID={clientID} />
        <Footer />
      </>
      )
    }  
}
export default App;