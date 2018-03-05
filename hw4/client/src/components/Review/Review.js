import React from 'react';
import ListView from '../ListView/ListView';
import { connect } from 'react-redux';
import { getCart } from '../../actions/cartActions';
import { getCustomer } from '../../actions/customerActions' 
import { createOrder } from '../../actions/orderActions';
import PizzaItem from '../PizzaItem/PizzaItem';
import { Redirect } from 'react-router-dom';

// import { Link } from 'react-router-dom';

class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderCreated: false
        }
    }
    componentDidMount() {
        const { getCart, getCustomer } = this.props;
        getCart();
        getCustomer();
    }

    createMyOrder(customer) {
        const { createOrder, cart } = this.props;
        createOrder(customer.telephone, cart);
        this.setState({ orderCreated: true});
    }

    render() {
        const { cart, customer } = this.props;
        if (this.state.orderCreated) {
            return <Redirect to={{pathname: '/receipt'}} />
        }
        return (
            <div className="container has-background">
                <h1 className="text-center title">YOUR ORDER</h1>
                <h3 className="text-center">Make sure that you dont forget anything</h3>
                <ListView>
                    {cart.map((cartItem) => <PizzaItem key={cartItem.id} pizza={cartItem} /> )}
                </ListView>
                <button type="submit" className="btn btn-primary" onClick={() => this.createMyOrder(customer)}>CONFIRM</button>
                {/* <Link to={'/receipt'} className="btn"></Link> */}
                
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        customer: state.customer
    }
}

export default connect(mapStateToProps, { getCustomer, getCart, createOrder })(Review);