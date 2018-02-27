
import React from 'react';
import pizzaService from '../../services/pizzaService';
// import PizzaListViewItem from '../PizzaListViewItem/PizzaListViewItem'

class PizzaItem extends React.Component {
    componentDidMount() {
        // Get news item based on route param
        const { pizzaId } = this.props.match.params;
        pizzaService.getPizzaById(pizzaId).then(pizza => {
            this.setState({ pizzaItem: pizza.data });
        });
    }
    constructor(props) {
        super(props);
        this.state = { pizzaItem: {} };
    }
    render() {
        const { name, description, price, image } = this.state.pizzaItem;
        return (
            <div className="details-container">
                <h3>{name}</h3>
                <p>{description}</p>
                <p>{price}</p>
                <img src={image} alt="Photo of pizza" />
            </div>
            //<PizzaListViewItem info={this.state.pizzaItem} />
        )
    }
};

export default PizzaItem;
