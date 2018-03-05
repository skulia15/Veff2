import React from 'react';
import { connect } from 'react-redux';
import { getCart } from '../../actions/cartActions';
import ListView from '../ListView/ListView';
import PizzaItem from '../PizzaItem/PizzaItem';
import { Link } from 'react-router-dom';

class Cart extends React.Component {
    componentDidMount() {
        const { getCart } = this.props;
        getCart();
    }
    render() {
        const { cart } = this.props;
        // Display loading screen if we are still waiting for items in cart
        if (cart === null) {
            return (
                // <div className="container has-background">
                //     <h1 className="text-center title">LOADING CART</h1>
                // </div>
                <div className="container has-background">
                    <h1 className="text-center title">CART</h1>
                    <h4 className="text-center title">YOUR CART IS EMPTY</h4>
                </div>
            );
        // If we have retrieved the cart but it contains no items we display empty cart message
        } else if (!cart.length) {
            return (
                <div className="container has-background">
                    <h1 className="text-center title">CART</h1>
                    <h4 className="text-center title">YOUR CART IS EMPTY</h4>
                </div>
            )
        // Display items in the cart
        } else {
            return (
                <div className="container has-background">
                    <h1 className="text-center title">CART</h1>
                    <h4 className="text-center title">ITEMS IN YOUR CART</h4>
                    <ListView>
                        {cart.map((cartItem) => <PizzaItem key={cartItem.id} pizza={cartItem} /> )}
                    </ListView>
                    <Link to={'/checkout'} className="btn btn-primary">CHECKOUT</Link>
                </div>
            )
        }
    }
};

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps, { getCart })(Cart);