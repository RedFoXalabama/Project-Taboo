import { useState, useEffect } from "react";

function MatchTime() {

    const matchTime = 120;
    const [timeLeft, setTimeLeft] = useState(matchTime);

    function calculateTimeRemaining() {
        setInterval(() => {setTimeLeft(timeLeft - 1)}, 1000);
    }

    return (

        <div id="matchTime">TEMPO
        </div>
    )
}

export default MatchTime;