import React from 'react';
import { PropTypes } from 'prop-types';
import { NavLink } from 'react-router-dom';
// import { connect } from 'react-redux';
import NavigationBarLinkWrapper from '../NavigationBarLinkWrapper/NavigationBarLinkWrapper';

const NavigationBar = ({ logoImageUrl }) => {
    return (
        <nav className="navbar">
            <div className="nav-logo">
                <img src={logoImageUrl} alt="" />
            </div>
            <NavigationBarLinkWrapper className="font-nav">
                <NavLink
                    exact
                    to="/pizzas"
                    activeClassName="active"
                    className="nav-link"><i className="fa fa-cutlery fa-lg"></i> MENU</NavLink>
                <NavLink
                    to="/offers"
                    activeClassName="active"
                    className="nav-link"><i className="fa fa-tag fa-lg"></i> OFFERS</NavLink>
                <NavLink
                    to="/about"
                    activeClassName="active"
                    className="nav-link"><i className="fa fa-info-circle fa-lg"></i> ABOUT US</NavLink>
                <NavLink
                    to="/cart"
                    activeClassName="active"
                    className="nav-link"><i className="fa fa-shopping-cart fa-lg"></i> CART</NavLink>
                <NavLink
                    to="/orders"
                    activeClassName="active"
                    className="nav-link"><i className="fa fa-history fa-lg"></i> PREVIOUS ORDERS</NavLink>
            </NavigationBarLinkWrapper>
        </nav>
    );
};

NavigationBar.propTypes = {
    logoImageUrl: PropTypes.string.isRequired
};

export default NavigationBar;
