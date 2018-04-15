import { GET_ORDER_BY_TELEPHONE, CREATE_ORDER } from '../constants/orderConstants';

const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_ORDER_BY_TELEPHONE:
            return action.payload;
        case CREATE_ORDER:
            return action.payload;
        default: return state;
    }
};

export default orderReducer;