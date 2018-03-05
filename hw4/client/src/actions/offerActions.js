import { GET_ALL_OFFERS, GET_OFFER_BY_ID } from '../constants/offerConstants';
import fetch from 'isomorphic-fetch';

export const getAllOffers = () => {
    return dispatch => fetch('http://localhost:3500/api/offers').then(json => json.json()).then(data => dispatch(getAllOffersSuccess(data)));
};

export const getOfferById = (offerId) => {
    return dispatch => fetch('http://localhost:3500/api/offers/' + offerId).then(json => json.json()).then(data => dispatch(getOfferByIdSuccess(data)));
};

const getAllOffersSuccess = (offers) => {
    return {
        type: GET_ALL_OFFERS,
        payload: offers
    };
};

const getOfferByIdSuccess = (offer) => {
    return {
        type: GET_OFFER_BY_ID,
        payload: offer
    };
};