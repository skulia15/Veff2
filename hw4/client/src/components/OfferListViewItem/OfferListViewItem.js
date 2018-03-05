// import React from 'react';
// import { PropTypes } from 'prop-types';
// import { Link } from 'react-router-dom';

// const OfferListViewItem = ({ info }) => {
//     const { id, offer, price, validFor } = info;
//     return (
//         <li className="grid-item list-view-item">
//             <img src="http://www.omrpedia.com/images/Special-offer.jpg" alt="offer" className="offer-label"/>
//             <h3><Link to={`/offers/${id}`}>{offer}</Link></h3>
//             {showPrice(price)}
//             <p>Valid for: {validFor}</p>
//         </li>
//     );
// };

// function showPrice (price) {
//     if (price !== 0) {
//         return (<p>{price} kr</p>);
//     }
// }

// // Add propTypes
// OfferListViewItem.propTypes = {
//     info: PropTypes.shape({
//         offer: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//         validFor: PropTypes.string
//     }).isRequired
// };

// // Add defaultProps
// OfferListViewItem.defaultProps = {
//     info: {
//         offer: 'An offer',
//         price: 0,
//         validFor: 'Sometime'
//     }
// };

// export default OfferListViewItem;