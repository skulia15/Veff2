
import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const PizzaItem = ({ pizza }) => {
    // componentDidMount() {
    //     // Get news item based on route param
    //     const { pizzaId } = this.props.match.params;
    //     pizzaService.getPizzaById(pizzaId).then(pizza => {
    //         this.setState({ pizzaItem: pizza.data });
    //     });
    // }
    // constructor(props) {
    //     super(props);
    //     this.state = { pizzaItem: {} };
    // }
    const {id, name, description, price, image} = pizza;
    return (
        <div className="grid-item list-view-item">
            <Link className="title-large" to={`/pizzas/${id}`}>{name}</Link>
            <p>{description}</p>
            <p>{price} kr</p>
            <img src={image} alt="Photo of pizza" className="image-preview"/>
        </div>
    )
};

PizzaItem.PropTypes = {
    pizza: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string
    })
};

export default PizzaItem;