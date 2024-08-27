/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Countdown from 'react-countdown';


function MatchTime({turnTime, handleChangeTurn}) {
  const [isCompleted, setIsCompleted] = useState(false);
    let time = turnTime *1000;

    useEffect(() => {
      if (isCompleted) {
          handleChangeTurn();
      }
  }, [isCompleted]);

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            setIsCompleted(true);
            return null;
          } else {
            // Render a countdown
            return (
              <span>
                {minutes}:{seconds}
              </span>
            );
          }
    };

    return (
        <div id="matchTime">
            <Countdown date={Date.now() + time} renderer={renderer}>
            </Countdown>
        </div>
    )
}

export default MatchTime;