import { useState } from 'react'
import './App.css'
import "./style.css";
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import StartGame from './components/StartGame.jsx';
import RuleCarousel from './components/RuleCarousel.jsx';

function App() {
 const [page, setPage] = useState("index");

  const handleStartGame = () => {
    setPage("lobby");
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

 if (page === "index") {
  return (
    <>
    <Header imgID={handleHeaderImgID()}/>
    <StartGame onStartGame={handleStartGame}/>
    <RuleCarousel />
    <Footer />
  </>
  )
} else if (page === "lobby") {
  return (
    <>
    <Header imgID={handleHeaderImgID()}/>
    <Footer />
  </>
  )
} else if (page === "match") {
  return (
    <>
    <Header imgID={handleHeaderImgID()}/>
    <Footer />
  </>
  )
}
  
}

export default App;
