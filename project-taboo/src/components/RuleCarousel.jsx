import Carousel from 'react-material-ui-carousel'
import Rules from './Rules.jsx'
import RulesJson from '../assets/Rules.json'

function RuleCarousel() {
    return (
        <div>
            <Carousel id="ruleCarousel">
                {
                RulesJson.map( item => <Rules key={item.id} item={item} /> )
                }
            </Carousel>
        </div>

    )
}

export default RuleCarousel;