import React from 'react';
import PropTypes from 'prop-types';
import styles from './progressBar-module.css';

const ProgressBar = ({ progress, striped, animated, state }) => {
    return(
        // Container for progress
        <div className={`${styles.progressbar}`}>
            {/* the actual progress */}
            <div style={{ width: `${progress}%` }} 
                className={`${styles.progress} ${styles[`progress-${state}`]} ${ striped ? styles.striped : ''} ${ animated ? styles.animated : ''}`}>
                {progress} %
            </div>
        </div>
    )
};
ProgressBar.propTypes = {
    progress: PropTypes.number.isRequired,
    striped: PropTypes.bool,
    animated: PropTypes.bool,
    state: PropTypes.oneOf(['info', 'success', 'warning', 'danger']).isRequired
};

ProgressBar.defaultProps = {
    striped: false,
    animated: false
};

export default ProgressBar;
