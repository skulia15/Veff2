import { GET_CUSTOMER, CREATE_CUSTOMER } from '../constants/customerConstants';

const customerReducer = (state = [], action) => {
    switch (action.type) {
        case GET_CUSTOMER:
            return action.payload
        case CREATE_CUSTOMER:
            return action.payload
        default:
            return state;
    }
};

export default customerReducer;