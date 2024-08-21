import { useState } from 'react'
import './App.css'
import "./style.css";
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import StartGame from './components/StartGame.jsx';
import RuleCarousel from './components/RuleCarousel.jsx';
import FormContainer from './components/FormContainer.jsx';
import MatchContainer from './components/MatchContainer.jsx';

function App() {
 const [page, setPage] = useState("index");

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
        <FormContainer onStartMatch={handleStartMatch} onBackToIndex={handleBackToIndex}/>
        <Footer />
      </>
      )
    case "match":
      return (
        <>
        <Header imgID={handleHeaderImgID()}/>
        <MatchContainer />
        <Footer />
      </>
      )
    }  
}
export default App;