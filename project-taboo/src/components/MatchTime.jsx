/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Countdown from 'react-countdown';


function MatchTime({turnTime, handleChangeTurn}) {
  const [isCompleted, setIsCompleted] = useState(false);
  let time = turnTime *1000; // convert to milliseconds
  const [date] = useState(Date.now() + time);
  
    useEffect(() => { //Se il countdown è completato, cambia il turno
      if (isCompleted) {
          handleChangeTurn();
      }
  }, [isCompleted]);

    const renderer = ({ minutes, seconds, completed }) => {
      //se è completato ritorna null, altrimenti ritorna il countdown
        if (completed) {
            return null;
          } else { 
            return (
              <span>
                {minutes}:{seconds}
              </span>
            );
          }
    };

    //Funzione che si attiva quando il countdown è completato
    const handleComplete = () => {
      setIsCompleted(true);
    };

    //RENDERIZZA IL COUNTDOWN
    return (
        <div id="matchTime">
            <Countdown date={date} renderer={renderer} onComplete={handleComplete}>
            </Countdown>
        </div>
    )
}

export default MatchTime;