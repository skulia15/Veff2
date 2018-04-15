
import { GET_ORDER_BY_TELEPHONE, CREATE_ORDER } from '../constants/orderConstants';
import fetch from 'isomorphic-fetch';
import axios from 'axios';

export const getOrderByTelephone = (telephone) => {
    return dispatch => fetch('http://localhost:3500/api/orders/' + telephone).then((result => {
        if (result.status === 200) {
            result.json().then(data => dispatch(getOrderByTelephoneSuccess(data)));
        } else {
            dispatch(getOrderByTelephoneFail());
        }
    }))
};

export const createOrder = (telephone, cart, price) => {
    var headers = {
        'Content-Type': 'application/json'
    }
    let order = { telephone: telephone, price: price, cart: JSON.stringify(cart) };
    return dispatch => axios.post('http://localhost:3500/api/orders/' + telephone, {order}, headers)
        .then((result => {
            if (result.status === 200) {
                dispatch(createOrderSuccess());
            } else {
                dispatch(createOrderFail());
            }
        }))
};

// Successfully posted an order to the server
// Returns true on success
const createOrderSuccess = () => {
    localStorage.clear();
    return {
        type: CREATE_ORDER,
        payload: true
    };
};

// Error posting the order to the server
// Returns null on error
const createOrderFail = () => {
    return {
        type: CREATE_ORDER,
        payload: null
    };
};

// Successfully found an order with the provided phone number
// Returns the most recently placed order
const getOrderByTelephoneSuccess = (order) => {
    return {
        type: GET_ORDER_BY_TELEPHONE,
        payload: order[order.length - 1]
    };
};

// Error finding order with the provided phone number
// Returns null on error
const getOrderByTelephoneFail = () => {
    return {
        type: GET_ORDER_BY_TELEPHONE,
        payload: null
    };
};