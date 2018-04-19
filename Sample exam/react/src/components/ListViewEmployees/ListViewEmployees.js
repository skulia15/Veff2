
import React from 'react';
import { PropTypes } from 'prop-types';

const ListViewEmployees = ({ children }) => {
    return <div className="grid-container list-view">{children}</div>
};

// Add PropTypes
ListViewEmployees.propTypes = {
    // Children to be rendered within the ListView component
    children: PropTypes.node
};

export default ListViewEmployees;