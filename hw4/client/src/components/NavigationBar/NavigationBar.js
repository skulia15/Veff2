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
            </NavigationBarLinkWrapper>
        </nav>
    );
};

// NavigationBar.contextTypes = {
//     user: PropTypes.shape({
//         loginId: PropTypes.string,
//         displayName: PropTypes.string
//     })
// };

NavigationBar.propTypes = {
    logoImageUrl: PropTypes.string.isRequired
};

// Fix for react-router-dom, known bug with NavLink
// export default connect(({ language }) => { return { language }; }, null, null, { pure: false })(NavigationBar);
export default NavigationBar;
