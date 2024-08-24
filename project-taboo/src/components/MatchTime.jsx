/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Countdown from 'react-countdown';
import ChangeTurnButton from "./ChangeTurnButton";


function MatchTime({turnTime, handleCurrentTurn}) {
    let time = turnTime *1000;

    const renderer = ({ minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            <ChangeTurnButton />
            handleCurrentTurn();
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