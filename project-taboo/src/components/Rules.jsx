/* eslint-disable react/prop-types */
import { Paper, Button } from '@mui/material'

function Rules(props) {
    return (
        <Paper>
            <h2>{props.item.title}</h2>
            <p>{props.item.content}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}

export default Rules;