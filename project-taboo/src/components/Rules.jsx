/* eslint-disable react/prop-types */
import { Paper } from '@mui/material'

function Rules(props) {
    return (
        <div id="ruleContainer">
            <Paper id="rulePaper">
                <h2 className="Rules">{props.item.title}</h2>
                <ul className="RulesElement">
                    <li>{props.item.element1}</li>
                    <li>{props.item.element2}</li>
                    
                </ul>
            </Paper>
            <img></img>
        </div>
    )
}

export default Rules;