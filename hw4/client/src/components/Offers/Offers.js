
import React from 'react';
import ListView from '../ListView/ListView';
// import OfferListViewItem from '../OfferListViewItem/OfferListViewItem';
// import SearchBar from '../SearchBar/SearchBar';
// import Filter from '../Filter/Filter';
// import pizzaService from '../../services/pizzaService';
import { connect } from 'react-redux';
import OfferItem from '../OfferItem/OfferItem';
import { getAllOffers } from '../../actions/offerActions';

// import { getUserSession } from '../../actions/actions.js';

class Offers extends React.Component {
    componentDidMount() {
        const { getAllOffers } = this.props;
        getAllOffers();
    }
    // const { getUserSession } = this.props;
    // getUserSession();
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         // filter: '',
    //         // categoryFilter: 'technology',
    //         offers: []
    //     };
    // };
    // onFilter(e) {
    //     this.setState({
    //         filter: e.target.value
    //     });
    // }
    render() {
        // const { pizzas, filter, categoryFilter } = this.state;
        const { offer } = this.props;
        // const filteredPizzas = pizzas.filter(n => n.name.toLowerCase().includes(filter.toLowerCase()));
        return (
            <div>
                <h1 className="text-center title">OUR OFFERS</h1>                
                {/* <SearchBar onFilter={this.onFilter.bind(this)} /> */}
                {/* <Filter onFilter={(category) => { this.setState({ categoryFilter: category }) }} selected={categoryFilter} /> */}
                <ListView>
                    {offer.map((offerItem) => (<OfferItem key={offerItem.id} offerData={offerItem} />))}
                </ListView>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        offer: state.offer
    }
}

export default connect(mapStateToProps, { getAllOffers })(Offers);