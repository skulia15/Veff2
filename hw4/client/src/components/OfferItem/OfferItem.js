
import React from 'react';
import pizzaService from '../../services/pizzaService';
// import OfferListViewItem from '../OfferListViewItem/OfferListViewItem'

class OfferItem extends React.Component {
    componentDidMount() {
        // Get news item based on route param
        const { offerId } = this.props.match.params;
        pizzaService.getOfferById(offerId).then(offer => {
            this.setState({ offerItem: offer.data });
        });
    }
    constructor(props) {
        super(props);
        this.state = { offerItem: {} };
    }
    render() {
        const { offer, price, validFor } = this.state.offerItem;
        return (
            <div className="details-container">
                <h3>{offer}</h3>
                <p>{price}</p>
                <p>Valid for {validFor}</p>                
            </div>
            // <OfferListViewItem info={this.state.offerItem} />
        )
    }
};

export default OfferItem;
