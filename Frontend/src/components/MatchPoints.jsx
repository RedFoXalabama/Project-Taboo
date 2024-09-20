import { useTeamsScore } from "../scripts/store";
import { useGameState } from "../scripts/store";

function MatchPoints() { //COMPONENTE CHE VISUALIZZA I PUNTI DELLE DUE SQUADRE
    const {currentTeam} = useGameState();
    const {redScore, blueScore} = useTeamsScore();

    //si aggiorna graficamente in base al team corrente
    return (
        <div id="matchPoints">
            <div id="redPoints" style={{
                transform: `${currentTeam === "red" ?  "scale(1)" : "scale(0.8)" }`,
                opacity: `${currentTeam === "red" ? "1" : "0.6"}`
            }}>
                <p>SQUADRA ROSSA</p>
                <p id="redPointsScore">{redScore}</p>
            </div>
            <div id="bluePoints" style={{
                transform: `${currentTeam === "blue" ?  "scale(1)" : "scale(0.8)" }`,
                opacity: `${currentTeam === "blue" ? "1" : "0.6"}`
            }}>
                <p>SQUADRA BLU</p>
                <p id="bluePointsScore">{blueScore}</p>
            </div>
        </div>
    )
}

export default MatchPoints;