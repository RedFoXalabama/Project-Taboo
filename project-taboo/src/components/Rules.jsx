/* eslint-disable react/prop-types */
import { Paper } from '@mui/material'

function Rules(props) {
    return (
        <div id="ruleContainer">
            <Paper id="rulePaper">
                <h2 className="Rules">{props.item.title}</h2>
                <div>
                    <ul className="RulesElement">
                        {handleElementList(props.item.elementList)}
                    </ul>
                    <img src={props.item.imgSRC}></img>
                </div>
            </Paper>
            <img></img>
        </div>
    )
}

function handleElementList(elementList) {
    return Object.values(elementList).map((element, index) => {
        return <li key={index}>{element}</li>
    });
}

export default Rules;