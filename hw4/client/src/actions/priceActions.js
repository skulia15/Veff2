import { CALCULATE_PRICE } from '../constants/priceConstants';

export const calculatePrice = (cart) => {
    let total = 0;
    if (cart) {
        cart.forEach(pizza => {
            total += pizza.price
        });
    }
    return {
        type: CALCULATE_PRICE,
        payload: total
    };
};
