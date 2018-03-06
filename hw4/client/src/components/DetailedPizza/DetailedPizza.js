
import React from 'react';
import { connect } from 'react-redux';
import PizzaItem from '../PizzaItem/PizzaItem'
import { getPizzaById } from '../../actions/pizzaActions';

class DetailedPizza extends React.Component {
    componentDidMount() {
        const { pizzaId } = this.props.match.params;
        const { getPizzaById } = this.props;
        getPizzaById(pizzaId);
    }
    render() {
        const { pizza } = this.props;
        return (
            <div className="jumbotron has-background">
                <PizzaItem key={pizza.id} pizza={pizza}/>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        pizza: state.pizza
    }
}

export default connect(mapStateToProps, { getPizzaById })(DetailedPizza);