import { useState } from 'react'
import './App.css'
import "./style.css";
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import StartGame from './components/StartGame.jsx';
import RuleCarousel from './components/RuleCarousel.jsx';
import FormContainer from './components/FormContainer.jsx';

function App() {
 const [page, setPage] = useState("index");

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
    <FormContainer onStartMatch={handleStartMatch}/>
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

//FUNZIONI PER OPERARE SULLE CARTE
/*async function getCardsFromServer() {
  try {
    const response = await fetch('http://localhost:3000/api/cards/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error('Request failed!');
    }
  } catch (error) {
    console.log(error);
  }
}*/

export default App;