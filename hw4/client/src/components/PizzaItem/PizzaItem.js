
import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { addToCart } from '../../actions/cartActions';
import { connect } from 'react-redux';

class PizzaItem extends React.Component {
    render() {
        const { id, name, description, price, image} = this.props.pizza;
        const { pizza, addToCart } = this.props;
        console.log(pizza);
        return (
            <Link style={{ textDecoration: 'none'}} to={`/pizzas/${id}`}>
                <div className="grid-item list-view-item">
                    <p className="menu-item-title">{name}</p>
                    <p className="menu-item-desc">{description}</p>
                    <p className="menu-item-price">{price} kr</p>
                    <div className="pizza-img">
                        <img src={image} alt="Photo of pizza" className="image-preview"/>
                    </div>
                    <button className="btn" onClick={() => addToCart(pizza)}><i className="fa fa-cart-plus fa-lg"></i>ADD TO CART</button>
                </div>
            </Link>
        )
    }
};

PizzaItem.PropTypes = {
    pizza: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string
    })
};

export default connect(null, { addToCart })(PizzaItem);