
import React from 'react';
import ListView from '../ListView/ListView';
import OfferListViewItem from '../OfferListViewItem/OfferListViewItem';
// import SearchBar from '../SearchBar/SearchBar';
// import Filter from '../Filter/Filter';
import pizzaService from '../../services/pizzaService';
// import { connect } from 'react-redux';
// import { getUserSession } from '../../actions/actions.js';

class Offers extends React.Component {
    componentDidMount() {
        pizzaService.getOffers().then((offerData) => {
            let offers = offerData.data;
            this.setState({ offers }); 
        });
        // const { getUserSession } = this.props;
        // getUserSession();
    }
    constructor(props) {
        super(props);
        this.state = {
            // filter: '',
            // categoryFilter: 'technology',
            offers: []
        };
    };
    // onFilter(e) {
    //     this.setState({
    //         filter: e.target.value
    //     });
    // }
    render() {
        // const { pizzas, filter, categoryFilter } = this.state;
        const { offers } = this.state;
        // const filteredPizzas = pizzas.filter(n => n.name.toLowerCase().includes(filter.toLowerCase()));
        return (
            <div>
                {/* <SearchBar onFilter={this.onFilter.bind(this)} /> */}
                {/* <Filter onFilter={(category) => { this.setState({ categoryFilter: category }) }} selected={categoryFilter} /> */}
                <ListView>
                    {offers.map((offerItem) => (<OfferListViewItem key={offerItem.id} info={offerItem} />))}
                </ListView>
            </div>
        );
    };
};

export default Offers;