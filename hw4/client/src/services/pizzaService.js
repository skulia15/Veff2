import axios from 'axios'

const pizzaService = () => {
    return {
        getPizzas: () => {
            return axios.get('http://localhost:3500/api/pizzas')
        },
        getPizzaById: (pizzaId) => {
            return axios.get('http://localhost:3500/api/pizzas/' + pizzaId);
        },
        getOffers: () => {
            return axios.get('http://localhost:3500/api/offers')
        },
        getOfferById: (offerId) => {
            return axios.get('http://localhost:3500/api/offers/' + offerId);
        }
    };
};

export default pizzaService();