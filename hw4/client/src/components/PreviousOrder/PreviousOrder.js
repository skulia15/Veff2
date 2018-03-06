import React from 'react';
import ListView from '../ListView/ListView';
import { connect } from 'react-redux';
// import { getCustomer } from '../../actions/customerActions' 
import { getOrderByTelephone } from '../../actions/orderActions';
// import PizzaItem from '../PizzaItem/PizzaItem';
// import { Redirect } from 'react-router-dom';

class PreviousOrder extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { telephone } = this.props.match.params;
        console.log('telephone:');
        console.log(telephone);
        const { getOrderByTelephone, order } = this.props;
        getOrderByTelephone(telephone);
        console.log('order');
        console.log(order);
        console.log('props');
        console.log(this.props);
        // getCart();
        // getCustomer();
    }

    render() {
        const { order } = this.props;
        //getOrderByTelephone(this.props.match.params.telephone);
        console.log('order');
        console.log(order);
        return (
            <div className="container has-background">
                <h1 className="text-center title">YOUR PREVIOUS ORDERS</h1>
                <ListView>
                    {/* {order.map((orderItem) => <PizzaItem key={orderItem.id} pizza={orderItem} /> )} */}
                </ListView>
                {/* <button type="submit" className="btn" onClick={() => this.createMyOrder(customer)}>CONFIRM</button> */}
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        // customer: state.customer
        telephone: state.telephone,
        order: state.order
    }
}

export default connect(mapStateToProps, { getOrderByTelephone })(PreviousOrder);