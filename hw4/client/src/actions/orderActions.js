
import { GET_ORDER_BY_TELEPHONE, CREATE_ORDER } from '../constants/orderConstants';
import fetch from 'isomorphic-fetch';
import axios from 'axios';

export const getOrderByTelephone = (telephone) => {
    console.log('--getting order for----');
    console.log(telephone);
    return dispatch => fetch('http://localhost:3500/api/orders/' + telephone)
        .then(json => json.json())
        .then(data => dispatch(getOrderByTelephoneSuccess(data)));
};

export const createOrder = (telephone, cart, price) => {
    console.log('in CreateOrder');
    console.log('tel:');
    console.log(telephone);
    console.log('cart');
    console.log(cart);
    console.log('price');
    console.log(price);
    let order = { telephone: telephone, price: price, cart: JSON.stringify(cart) };
    return dispatch => axios.post('http://localhost:3500/api/orders/' + telephone, {order})
        .then(data => dispatch(createOrderSuccess(data)));
};

const createOrderSuccess = (orderData) => {
    let prevOrder = JSON.parse(orderData.config.data)
    console.log('PREV ORDER');
    console.log(prevOrder);
    localStorage.clear();
    return {
        type: CREATE_ORDER,
        payload: prevOrder
    };
};

const getOrderByTelephoneSuccess = (order) => {
    console.log('hey success in getting order');
    console.log(order);
    return {
        type: GET_ORDER_BY_TELEPHONE,
        payload: order
    };
};