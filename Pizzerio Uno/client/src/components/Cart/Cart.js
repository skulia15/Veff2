import React from 'react';
import { connect } from 'react-redux';
import { getCart } from '../../actions/cartActions';
import { calculatePrice } from '../../actions/priceActions';
import ListViewCart from '../ListViewCart/ListViewCart';
import ItemsInCart from '../ItemsInCart/ItemsInCart';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
    componentDidMount() {
        const { getCart, calculatePrice, cart } = this.props;
        getCart();
        calculatePrice(cart);
    }
    render() {
        const { cart, price, calculatePrice } = this.props;
        calculatePrice(cart);
        // Display loading screen if we are still waiting for items in cart
        if (cart === null) {
            return (
                <div className="text-center title text-box-shadow">
                    <div className="menu-welcome">
                        <h2 className="block-span">CART</h2>
                        <h4 className="block-span">YOUR CART IS EMPTY</h4> 
                    </div>
                </div>
            );
        // If we have retrieved the cart but it contains no items we display empty cart message
        } else if (!cart.length) {
            return (
                <div className="text-center title text-box-shadow">
                    <div className="menu-welcome">
                        <h2 className="block-span">CART</h2>
                        <h4 className="block-span">YOUR CART IS EMPTY</h4> 
                    </div>
                </div>
            )
        //Display items in the cart
        } else {
            return (
                <div>
                    <div className="text-center title text-box-shadow">
                        <div className="menu-welcome">
                            <h2 className="block-span">CART</h2>
                            <h4 className="block-span">ITEMS IN YOUR CART</h4> 
                        </div>
                    </div>
                    <div className="container-narrow has-background">
                        <ListViewCart>
                            {cart.map((cartItem) => <ItemsInCart key={cartItem.id} pizza={cartItem} /> )}
                        </ListViewCart>
                        <p className="menu-item-price">Price of order: {price} kr</p>
                        <Link to={'/checkout'} className="btn"><i className="fa fa-credit-card-alt fa-lg"></i>CHECKOUT</Link>
                    </div>
                </div>
            )
        }
    }
};

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        price: state.price
    }
}

export default connect(mapStateToProps, { getCart, calculatePrice })(Cart);