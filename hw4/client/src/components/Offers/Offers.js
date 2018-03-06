
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

    render() {
        const { offer } = this.props;
        return (
            <div className="menu-container">
                <div className="text-center title text-box-shadow">
                    <h1 className="menu-welcome">OUR OFFERS</h1>
                </div>
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