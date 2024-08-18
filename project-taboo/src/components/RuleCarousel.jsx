import Carousel from 'react-material-ui-carousel'
import Rules from './Rules.jsx'
import RulesJson from '../assets/Rules.json'

function RuleCarousel() {
    return (
        <Carousel>
            {
                RulesJson.map( item => <Rules key={item.id} item={item} /> )
            }
        </Carousel>
    )
}

export default RuleCarousel;