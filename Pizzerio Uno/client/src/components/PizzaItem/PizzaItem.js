
import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { addToCart } from '../../actions/cartActions';
import { connect } from 'react-redux';

class PizzaItem extends React.Component {
    render() {
        const { id, name, description, price, image} = this.props.pizza;
        const { pizza, addToCart } = this.props;
        return (

            <div className="grid-item list-view-item">
                <Link style={{ textDecoration: 'none'}} to={`/pizzas/${id}`}>
                    <p className="menu-item-title">{name}</p>
                    <p className="menu-item-desc">{description}</p>
                    <p className="menu-item-price">{price} kr</p>
                    <div className="pizza-img">
                        <img src={image} alt="Photo of pizza" className="image-preview"/>
                    </div>
                </Link>
                <button className="btn" onClick={() => addToCart(pizza)}><i className="fa fa-cart-plus fa-lg"></i>ADD TO CART</button>
            </div>
        )
    }
};

PizzaItem.propTypes = {
    pizza: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string
    })
};

export default connect(null, { addToCart })(PizzaItem);