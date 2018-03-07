import React from 'react';
import ListViewCart from '../ListViewCart/ListViewCart';
import { connect } from 'react-redux';
import { getOrderByTelephone } from '../../actions/orderActions';
import { emptyCart, addToCart } from '../../actions/cartActions';
import { PropTypes } from 'prop-types';
import ItemsInCart from '../ItemsInCart/ItemsInCart';
import { Redirect } from 'react-router-dom';

// import { Redirect } from 'react-router-dom';

class PreviousOrder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            proceedToCheckout: false
        }
    }
    componentDidMount() {
        const { telephone } = this.props.match.params;
        const { getOrderByTelephone } = this.props;
        getOrderByTelephone(telephone);
    }

    // Clears the cart contents and add all items from previous order to the cart
    // then redirects to checkout
    setCartToPrevOrder(order) {
        const { emptyCart } = this.props;
        emptyCart();
        order.forEach(item => {
            addToCart(item);
        });
        this.setState({proceedToCheckout: true});
    }

    render() {
        const { order } = this.props;
        if (this.state.proceedToCheckout) {
            return <Redirect to={{pathname: '/cart'}} />
        }
        // Wait for order to load
        if (order === undefined) {
            return (<h1>Loading previous order</h1>);
        }
        // If no order has been found
        if (order === null || !order.cart) {
            return (
                <div className="text-center title text-box-shadow">
                    <div className="menu-welcome">
                        <h2>YOU HAVE NO PREVIOUS ORDERS</h2>
                    </div>
                </div>
            );
        }
        let cart = JSON.parse(order.cart);
        return (
            <div className="menu-container">
                <div className="text-center title text-box-shadow">
                    <h1 className="text-center title">YOUR PREVIOUS ORDER</h1>
                </div>
                <div className="container-narrow has-background">
                    <div>
                        <ListViewCart>
                            {cart.map((cartItem) => <ItemsInCart key={cartItem.id} pizza={cartItem} /> ) }
                        </ListViewCart>
                        <p className="menu-item-price">Price of order: {order.price} kr</p>
                        <button type="submit" className="btn" onClick={() => this.setCartToPrevOrder(cart)}>
                            <i className="fa fa-credit-card-alt fa-lg"></i>ADD ORDER TO CART</button>
                    </div>
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        telephone: state.telephone,
        order: state.order
    }
}

PreviousOrder.PropTypes = {
    order: PropTypes.shape({
        telephone: PropTypes.string,
        cart: PropTypes.object,
        price: PropTypes.number
    }),
    telephone: PropTypes.string
};

export default connect(mapStateToProps, { getOrderByTelephone, emptyCart, addToCart })(PreviousOrder);