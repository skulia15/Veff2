import React from 'react';
import { PropTypes } from 'prop-types';

const ListViewCart = ({ children }) => {
    return <div className="grid-container grid-container-cart list-view">{children}</div>
};

// Add PropTypes
ListViewCart.propTypes = {
    // Children to be rendered within the ListView component
    children: PropTypes.node
};

export default ListViewCart;