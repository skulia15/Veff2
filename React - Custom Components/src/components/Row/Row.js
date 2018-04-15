import React from 'react';
import styles from './row-module.css';

const Row = ({children}) => {
    return(
        <div className= {`${styles.row}`} style={{width: window.innerWidth - 50}}>
            {children}
        </div>
    )
};

export default Row;
