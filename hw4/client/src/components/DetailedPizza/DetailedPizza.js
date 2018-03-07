
import React from 'react';
import { connect } from 'react-redux';
import PizzaItem from '../PizzaItem/PizzaItem'
import { getPizzaById } from '../../actions/pizzaActions';
import { PropTypes } from 'prop-types';

class DetailedPizza extends React.Component {
    componentDidMount() {
        const { pizzaId } = this.props.match.params;
        const { getPizzaById } = this.props;
        getPizzaById(pizzaId);
    }
    render() {
        const { pizza } = this.props;
        return (
            <div className="jumbotron container-narrow has-background">
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

// The DetailedPizza component needs to be served a pizza object
// with required fields: 'name' and 'price' and optional fields
// 'description' and 'image'
DetailedPizza.propTypes = {
    pizza: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        price: PropTypes.number.isRequired,
        image: PropTypes.string
    })
};

export default connect(mapStateToProps, { getPizzaById })(DetailedPizza);