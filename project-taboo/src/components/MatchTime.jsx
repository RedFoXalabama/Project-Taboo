/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Countdown from 'react-countdown';


function MatchTime({turnTime, handleChangeTurn}) {
  const [isCompleted, setIsCompleted] = useState(false);
  let time = turnTime *1000;
  const [date, setDate] = useState(Date.now() + time);

    useEffect(() => {
      if (isCompleted) {
          handleChangeTurn();
      }
  }, [isCompleted]);

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
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

    const handleComplete = () => {
      setIsCompleted(true);
    };

    return (
        <div id="matchTime">
            <Countdown date={date} renderer={renderer} onComplete={handleComplete}>
            </Countdown>
        </div>
    )
}

export default MatchTime;