
import React from 'react';
import { connect } from 'react-redux';
import PizzaItem from '../PizzaItem/PizzaItem'
import { getPizzaById } from '../../actions/pizzaActions';
import { addToCart } from '../../actions/cartActions';

class DetailedPizza extends React.Component {
    componentDidMount() {
        const { pizzaId } = this.props.match.params;
        const { getPizzaById } = this.props;
        getPizzaById(pizzaId);
    }
    render() {
        const { pizza, addToCart } = this.props;
        return (
            <div className="jumbotron has-background">
                <PizzaItem key={pizza.id} pizza={pizza}/>
                <button className="btn" onClick={() => addToCart(pizza)}>ADD TO CART</button>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        pizza: state.pizza
    }
}

export default connect(mapStateToProps, { getPizzaById, addToCart })(DetailedPizza);