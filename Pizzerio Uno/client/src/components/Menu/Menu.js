
import React from 'react';
import ListView from '../ListView/ListView';
import { connect } from 'react-redux';
import PizzaItem from '../PizzaItem/PizzaItem'
import { getAllPizzas } from '../../actions/pizzaActions';
// import { PropTypes } from 'prop-types';

class Menu extends React.Component {
    componentDidMount() {
        const { getAllPizzas } = this.props;
        getAllPizzas();
    }

    render() {
        const { pizza } = this.props;
        if (pizza.constructor === Array) {
            return (
                <div className="menu-container">
                    <div className="text-center title text-box-shadow">
                        <p className="menu-welcome">
                            <span className="block-span">UNO PIZZERIA MENU</span>
                            <span className="block-span">WE INVENTED DEEP DISH PIZZA...</span> 
                        </p>
                    </div>
                    
                    <ListView>
                        {pizza.map((pizzaItem) => (<PizzaItem key={pizzaItem.id} pizza={pizzaItem} />))}
                    </ListView>
                </div>
            );
        } else {
            return (
                <p>Waiting for pizzas</p>
            );
        }
    };
};

const mapStateToProps = (state) => {
    return {
        pizza: state.pizza
    }
}

// Menu.propTypes = {
//     pizza: PropTypes.shape({
//         name: PropTypes.string,
//         description: PropTypes.string,
//         price: PropTypes.number,
//         image: PropTypes.string
//     })
// };

export default connect(mapStateToProps, { getAllPizzas })(Menu);