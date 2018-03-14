import React from 'react';
import PropTypes from 'prop-types';
import styles from './nameCard-module.css';

const NameCard = ({ name, email, telephone, imageUrl }) => {

    return(
        <div className={`${styles.namecard}`}>
            <div style={{ backgroundImage: `url(${imageUrl})` }} className={`${styles.profile}`}/>
            <div className={`${styles.name}`}>
                <p>Name: {name}</p>
             </div>
            <div className={`${styles.info}`}>
                <p>Email: {email}</p>
                <p>Telephone: {telephone}</p>
            </div>
        </div>
    )
};
NameCard.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    telephone: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
};

NameCard.defaultProps = {
    striped: false,
    animated: false
};

export default NameCard;
