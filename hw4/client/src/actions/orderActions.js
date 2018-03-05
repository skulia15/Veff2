import { GET_ORDER_BY_TELEPHONE, CREATE_ORDER } from '../constants/orderConstants';
import fetch from 'isomorphic-fetch';
import axios from 'axios';

export const getOrderByTelephone = (telephone) => {
    return dispatch => fetch('http://localhost:3500/api/orders/' + telephone)
        .then(json => json.json())
        .then(data => dispatch(getOrderByTelephoneSuccess(data)));
};

export const createOrder = (telephone, cart) => {
    return dispatch => axios.post('http://localhost:3500/api/orders/' + telephone, {cart})
        .then(data => dispatch(createOrderSuccess(data)));
};

const createOrderSuccess = (orderData) => {
    let prevOrder = JSON.parse(orderData.config.data).cart
    localStorage.clear();
    return {
        type: CREATE_ORDER,
        payload: prevOrder
    };
};

const getOrderByTelephoneSuccess = (order) => {
    return {
        type: GET_ORDER_BY_TELEPHONE,
        payload: order
    };
};