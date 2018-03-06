import { GET_ALL_PIZZAS, GET_PIZZA_BY_ID } from '../constants/pizzaConstants';
import fetch from 'isomorphic-fetch';

export const getAllPizzas = () => {
    return dispatch => fetch('http://localhost:3500/api/pizzas')
        .then(json => json.json())
        .then(data => dispatch(getAllPizzaSuccess(data)));
};

export const getPizzaById = (pizzaId) => {
    return dispatch => fetch('http://localhost:3500/api/pizzas/' + pizzaId)
        .then(json => json.json())
        .then(data => dispatch(getPizzaByIdSuccess(data)));
};

const getAllPizzaSuccess = (pizzas) => {
    return {
        type: GET_ALL_PIZZAS,
        payload: pizzas
    };
};

const getPizzaByIdSuccess = (pizza) => {
    return {
        type: GET_PIZZA_BY_ID,
        payload: pizza
    };
};