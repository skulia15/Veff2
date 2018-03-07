import React from 'react';
import ListViewCart from '../ListViewCart/ListViewCart';
import { connect } from 'react-redux';
import { getCart } from '../../actions/cartActions';
import { calculatePrice } from '../../actions/priceActions'
import { getCustomer } from '../../actions/customerActions' 
import { createOrder } from '../../actions/orderActions';
import { Redirect } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import ItemsInCart from '../ItemsInCart/ItemsInCart';

// import { Link } from 'react-router-dom';

class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderCreated: false
        }
    }
    componentDidMount() {
        const { getCart, getCustomer, cart, calculatePrice } = this.props;
        getCart();
        getCustomer();
        calculatePrice(cart);
    }

    createMyOrder(customer) {
        const { createOrder, cart, price } = this.props;
        createOrder(customer.telephone, cart, price);
        this.setState({ orderCreated: true});
    }

    render() {
        const { cart, customer, price, calculatePrice } = this.props;
        calculatePrice(cart);
        if (this.state.orderCreated) {
            return <Redirect to={{pathname: '/receipt'}} />
        }
        if (cart !== null && cart.length) {
            return (
                <div className="container-narrow has-background">
                    <h1 className="menu-item-title">YOUR ORDER</h1>
                    <h3 className="text-center">Make sure that you dont forget anything</h3>
                    <ListViewCart>
                        {cart.map((cartItem) => <ItemsInCart key={cartItem.id} pizza={cartItem} /> )}
                    </ListViewCart>
                    <p className="menu-item-price">Total price of order: {price} Kr</p>
                    <button type="submit" className="btn" onClick={() => this.createMyOrder(customer)}>CONFIRM</button>
                </div>
            );
        } else {
            this.setState({orderCreated: false});
            return <Redirect to={{pathname: '/cart'}} />
        }
    }
};

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        customer: state.customer,
        price: state.price
    }
}

Review.PropTypes = {
    order: PropTypes.shape({
        telephone: PropTypes.string,
        cart: PropTypes.object,
        price: PropTypes.number
    }),
    customer: PropTypes.shape({
        name: PropTypes.string.isRequired,
        telephone: PropTypes.string.isRequired,
        address: PropTypes.string,
        city: PropTypes.string,
        postalCode: PropTypes.string
    })
};

export default connect(mapStateToProps, { getCustomer, getCart, createOrder, calculatePrice })(Review);