import { ADD_TO_CART, GET_CART, REMOVE_FROM_CART } from '../constants/cartConstants';

const cartReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return action.payload;
        case REMOVE_FROM_CART:
            return action.payload;
        case GET_CART:
            return action.payload
        default:
            return state;
    }
};

export default cartReducer;