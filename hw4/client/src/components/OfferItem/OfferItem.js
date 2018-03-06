
import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
// import pizzaService from '../../services/pizzaService';
// import OfferListViewItem from '../OfferListViewItem/OfferListViewItem'

const OfferItem = ({ offerData }) => {
    // componentDidMount() {
    //     // Get news item based on route param
    //     const { offerId } = this.props.match.params;
    // }
    // constructor(props) {
    //     super(props);
    //     this.state = { offerItem: {} };
    // }
    const { id, offer, price, validFor } = offerData;
    return (
        <Link style={{ textDecoration: 'none'}} to={`/offer/${id}`}>
            <div className="grid-item list-view-item list-view-item-offer">
                <img src="http://www.omrpedia.com/images/Special-offer.jpg" alt="offer" className="offer-label"/>
                <p className="menu-item-title">{offer}</p>
                {showPrice(price)}
                <p className="menu-item-price"> Valid for {validFor}</p>
            </div>
        </Link>
    );
};

// Only show price if it is set
function showPrice (price) {
    if (price !== 0) {
        return (<p className="menu-item-price">{price} kr</p>);
    }
}

OfferItem.PropTypes = {
    offer: PropTypes.shape({
        offer: PropTypes.string,
        price: PropTypes.number,
        validFor: PropTypes.string
    })
};

export default OfferItem;
