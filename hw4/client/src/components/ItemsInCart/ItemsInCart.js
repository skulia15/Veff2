
import React from 'react';
import { PropTypes } from 'prop-types';
import { removeFromCart } from '../../actions/cartActions';
import { connect } from 'react-redux';

class ItemsInCart extends React.Component {
    render() {
        const { name, description, price, image} = this.props.pizza;
        const { pizza, removeFromCart } = this.props;
        return (
            <div className="grid-item list-view-item">
                <p className="menu-item-title">{name}</p>
                <p className="menu-item-desc">{description}</p>
                <p className="menu-item-price">{price} kr</p>
                <div className="pizza-img">
                    <img src={image} alt="Photo of pizza" className="image-preview"/>
                </div>
                <button className="btn btn-danger" onClick={() => removeFromCart(pizza)}><i className="fa fa-times fa-lg"></i>REMOVE</button>
            </div>
        )
    }
};

ItemsInCart.propTypes = {
    pizza: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string
    })
};

export default connect(null, { removeFromCart })(ItemsInCart);