import { GET_CUSTOMER, CREATE_CUSTOMER, DESIRED_CUSTOMER} from '../constants/customerConstants';

export const getCustomer = () => {
    let customer = JSON.parse(localStorage.getItem(DESIRED_CUSTOMER));
    return {
        type: GET_CUSTOMER,
        payload: customer
    };
} 

export const createCustomer = (customer) => {
    localStorage.setItem(DESIRED_CUSTOMER, JSON.stringify(customer))
    return {
        type: CREATE_CUSTOMER,
        payload: null
    };
} 