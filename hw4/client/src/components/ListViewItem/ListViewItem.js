import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const ListViewItem = ({ info }) => {
    const { id, name, description, price, image } = info;
    return (
        <li className="list-view-item">
            <h3><Link to={`/pizzas/${id}`}>{name}</Link></h3>
            <p>{description}</p>
            <p>{price} kr</p>
            <img src={image} alt="Photo of pizza" />
        </li>
    );
};

// Add propTypes
ListViewItem.propTypes = {
    info: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        price: PropTypes.number.isRequired,
        image: PropTypes.string
    }).isRequired
};

// Add defaultProps
ListViewItem.defaultProps = {
    info: {
        name: 'Pizza name',
        description: 'Description of pizza',
        price: 0,
        image: '../../resources/popeBless'
    }
};

export default ListViewItem;