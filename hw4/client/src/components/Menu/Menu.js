
import React from 'react';
import ListView from '../ListView/ListView';
import ListViewItem from '../ListViewItem/ListViewItem';
// import SearchBar from '../SearchBar/SearchBar';
// import Filter from '../Filter/Filter';
import pizzaService from '../../services/pizzaService';
// import { connect } from 'react-redux';
// import { getUserSession } from '../../actions/actions.js';

class Menu extends React.Component {
    componentDidMount() {
        pizzaService.getPizzas().then((pizzaData) => {
            console.log(pizzaData);
            let pizzas = pizzaData.data;
            this.setState({ pizzas }); 
        });
        // const { getUserSession } = this.props;
        // getUserSession();
    }
    constructor(props) {
        super(props);
        this.state = {
            // filter: '',
            // categoryFilter: 'technology',
            pizzas: []
        };
    };
    // onFilter(e) {
    //     this.setState({
    //         filter: e.target.value
    //     });
    // }
    render() {
        // const { pizzas, filter, categoryFilter } = this.state;
        const { pizzas } = this.state;
        // const filteredPizzas = pizzas.filter(n => n.name.toLowerCase().includes(filter.toLowerCase()));
        return (
            <div>
                {/* <SearchBar onFilter={this.onFilter.bind(this)} /> */}
                {/* <Filter onFilter={(category) => { this.setState({ categoryFilter: category }) }} selected={categoryFilter} /> */}
                <ListView>
                    {pizzas.map((pizzaItem) => (<ListViewItem key={pizzaItem.id} info={pizzaItem} />))}
                </ListView>
            </div>
        );
    };
};

export default Menu;