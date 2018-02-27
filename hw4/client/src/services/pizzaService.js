import axios from 'axios'

const pizzaService = () => {
    return {
        getPizzas: () => {
            return axios.get('http://localhost:3500/api/pizzas')
            // .then(function (response) {
            //     console.log(response.data);
            // })
            // .catch(function (error) {
            //     console.log(error);
            // });
        }
    };
};

export default pizzaService();