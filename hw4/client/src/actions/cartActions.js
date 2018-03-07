import { ADD_TO_CART, GET_CART, REMOVE_FROM_CART, EMPTY_CART, DESIRED_ITEMS } from '../constants/cartConstants';
import toastr from 'toastr';

toastr.options.timeOut = 1000;

export const addToCart = (pizza) => {
    let cart = JSON.parse(localStorage.getItem(DESIRED_ITEMS));
    if (!cart) {
        cart = [];
    }
    cart.push(pizza);
    localStorage.setItem(DESIRED_ITEMS, JSON.stringify(cart));
    toastr.success('Pizza ' + pizza.name + ' was added to cart', 'Success!');
    return {
        type: ADD_TO_CART,
        payload: cart
    };
};

export const removeFromCart = (pizza) => {
    toastr.warning('Pizza ' + pizza.name + ' was removed from your cart', 'Removed!');
    let cart = JSON.parse(localStorage.getItem(DESIRED_ITEMS));
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === pizza.id) {
            cart.splice(i, 1);
            break;
        }
    }
    localStorage.setItem(DESIRED_ITEMS, JSON.stringify(cart));
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

export const emptyCart = () => {
    localStorage.clear();
    return {
        type: EMPTY_CART,
        payload: []
    };
};