import React from 'react';
import { PropTypes } from 'prop-types';

const NavigationBarLinkWrapper = ({ children }) => {
    return (
        <div className="nav-link-wrapper">
            {children}
        </div>
    )
};

// Add PropTypes
NavigationBarLinkWrapper.propTypes = {
    // Children to be rendered within the component
    children: PropTypes.node
};

export default NavigationBarLinkWrapper;