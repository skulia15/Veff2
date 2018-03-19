import React from 'react';
import PropTypes from 'prop-types';
import styles from './col-module.css';

const Col = ({size}) => {
    let precentOfScreen = (size / 12);
    let widthInPx = precentOfScreen * (window.innerWidth - 120);
    return(
        <div className= {`${styles.col}`} style={{width: widthInPx}}>
            col
        </div>
    )
};

Col.propTypes = {
    size: PropTypes.number,
};

Col.defaultProps = {
    size: 1
};

export default Col;
