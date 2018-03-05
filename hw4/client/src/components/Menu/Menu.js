
import React from 'react';
import ListView from '../ListView/ListView';
import { connect } from 'react-redux';
import PizzaItem from '../PizzaItem/PizzaItem'
import { getAllPizzas } from '../../actions/pizzaActions';
// import { getUserSession } from '../../actions/actions.js';

class Menu extends React.Component {
    componentDidMount() {
        const { getAllPizzas } = this.props;
        getAllPizzas();
    }
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         // filter: '',
    //         // categoryFilter: 'technology',
    //         pizzas: []
    //     };
    // };
    // onFilter(e) {
    //     this.setState({
    //         filter: e.target.value
    //     });
    // }
    render() {
        // const { pizzas, filter, categoryFilter } = this.state;
        const { pizza } = this.props;
        if (pizza.constructor === Array) {
            return (
                <div>
                    <h1 className="text-center title">UNO PIZZERIA MENU</h1>
                    <h3 className="text-center title">WE INVENTED DEEP DISH PIZZA... </h3>
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

export default connect(mapStateToProps, { getAllPizzas })(Menu);