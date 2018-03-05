import { ADD_TO_CART, GET_CART, REMOVE_FROM_CART, DESIRED_ITEMS } from '../constants/cartConstants';
import toastr from 'toastr';

export const addToCart = (pizza) => {
    console.log(localStorage.getItem(DESIRED_ITEMS));
    let cart = JSON.parse(localStorage.getItem(DESIRED_ITEMS));
    console.log(cart === null);
    if (!cart) {
        cart = [];
        console.log('clear array');
    }
    cart.push(pizza);
    localStorage.setItem(DESIRED_ITEMS, JSON.stringify(cart));
    console.log('cart in cart action');
    console.log(cart);
    toastr.success('Pizza ' + pizza.name + ' was added to cart', 'Success!');
    return {
        type: ADD_TO_CART,
        payload: cart
    };
};

export const removeFromCart = (pizza) => {
    toastr.error('Pizza ' + pizza.name + ' was removed from your cart', 'Removed!');
    let cart = JSON.parse(localStorage.getItem(DESIRED_ITEMS));
    // remove
    return {
        type: REMOVE_FROM_CART,
        payload: cart
    };
};

export const getCart = () => {
    let cart = JSON.parse(localStorage.getItem(DESIRED_ITEMS));
    return {
        type: GET_CART,
        payload: cart
    };
};