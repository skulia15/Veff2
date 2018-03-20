import React from 'react';
import PropTypes from 'prop-types';

const Tab = ({ selectionKey, title }) => {
    return (
        <div>
            { title }
        </div>
    );
}

Tab.propTypes = {
    selectionKey: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
};


export default Tab;