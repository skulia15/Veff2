import React from 'react';
import styles from './row-module.css';

const Row = ({children}) => {
    return(
        <div className= {`${styles.row}`}>
            {children}
        </div>
    )
};

export default Row;
