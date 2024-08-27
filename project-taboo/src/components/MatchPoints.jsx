import { useTeamsScore } from "../scripts/store";

function MatchPoints() {
    const {redScore, blueScore} = useTeamsScore();

    return (
        <div id="matchPoints">
            <div id="redPoints">
                <p>SQUADRA ROSSA</p>
                <p id="redPointsScore">{redScore}</p>
            </div>
            <div id="bluePoints">
                <p>SQUADRA BLU</p>
                <p id="bluePointsScore">{blueScore}</p>
            </div>
        </div>
    )
}

export default MatchPoints;