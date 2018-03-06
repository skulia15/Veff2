import { CALCULATE_PRICE } from '../constants/priceConstants';

const priceReducer = (state = 0, action) => {
    switch (action.type) {
        case CALCULATE_PRICE:
            return action.payload;
        default: return state;
    }
};

export default priceReducer;