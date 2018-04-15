import React from 'react';
import { PropTypes } from 'prop-types';

const ListView = ({ children }) => {
    return <div className="grid-container list-view">{children}</div>
};

// Add PropTypes
ListView.propTypes = {
    // Children to be rendered within the ListView component
    children: PropTypes.node
};

export default ListView;