import React from 'react';
import { NavLink } from 'react-router-dom';
// import { connect } from 'react-redux';
import NavigationBarLinkWrapper from '../NavigationBarLinkWrapper/NavigationBarLinkWrapper';

const NavigationBar = () => {
    return (
        <nav className="navbar">
            <div className="nav-logo">
                <img src='../../../resources/github.png' alt="" />
            </div>
            <NavigationBarLinkWrapper className="font-nav">
                <NavLink
                    exact
                    to="/"
                    activeClassName="active"
                    className="nav-link"><i className="fa fa-cutlery fa-lg"></i> Home</NavLink>
                <NavLink
                    to="/contact"
                    activeClassName="active"
                    className="nav-link"><i className="fa fa-tag fa-lg"></i> Contact Us</NavLink>
                <NavLink
                    to="/employees"
                    activeClassName="active"
                    className="nav-link"><i className="fa fa-info-circle fa-lg"></i> Employees</NavLink>
            </NavigationBarLinkWrapper>
        </nav>
    );
};

export default NavigationBar;