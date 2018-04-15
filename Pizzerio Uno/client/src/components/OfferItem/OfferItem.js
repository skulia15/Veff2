
import React from 'react';
import { PropTypes } from 'prop-types';

const OfferItem = ({ offerData }) => {
    const { offer, price, validFor } = offerData;
    return (
        // <Link style={{ textDecoration: 'none'}} to={`/offer/${id}`}>
        <div className="grid-item list-view-item list-view-item-offer">
            <img src="http://www.omrpedia.com/images/Special-offer.jpg" alt="offer" className="offer-label"/>
            <p className="menu-item-title">{offer}</p>
            {showPrice(price)}
            <p className="menu-item-price"> Valid for {validFor}</p>
        </div>
        // </Link>
    );
};

// Only show price if it is set
function showPrice (price) {
    if (price !== 0) {
        return (<p className="menu-item-price">{price} kr</p>);
    }
}

OfferItem.propTypes = {
    offer: PropTypes.shape({
        offer: PropTypes.string,
        price: PropTypes.number,
        validFor: PropTypes.string
    })
};

export default OfferItem;
