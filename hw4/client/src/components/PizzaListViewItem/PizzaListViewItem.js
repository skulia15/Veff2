import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const PizzaListViewItem = ({ info }) => {
    const { id, name, description, price, image } = info;
    return (
        <li className="grid-item list-view-item">
            <img src={image} alt="Photo of pizza" className="image-preview"/>
            <h3><Link to={`/pizzas/${id}`}>{name}</Link></h3>
            <p>{description}</p>
            <p>{price} kr</p>
        </li>
    );
};

// Add propTypes
PizzaListViewItem.propTypes = {
    info: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        price: PropTypes.number.isRequired,
        image: PropTypes.string
    }).isRequired
};

// Add defaultProps
PizzaListViewItem.defaultProps = {
    info: {
        name: 'Pizza name',
        description: 'Description of pizza',
        price: 0,
        image: '../../resources/popeBless'
    }
};

export default PizzaListViewItem;