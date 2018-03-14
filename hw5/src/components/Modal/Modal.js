import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-module.css';
import Button from '../Button/ButtonCM';


const Modal = ({ isOpen, onClose, children }) => {
    if(isOpen){
        return(
            <div>
                <div className={`${styles.modal}`}>
                    <div className={`${styles.modalcontent}`}>
                        <div className={`${styles.modalcontent}`}>
                            {children}
                        </div>
                    </div>
                    <div className={`${styles.centered}`}>
                    <Button type="success" className={`${styles.modalbtn}`} onClick={onClose} > Close Modal </Button>
                </div>
                
            </div>
                
            </div>);
    }
    else{
        return(
            <div>
            </div>
        )
    }
};

Modal.Title = ({ children }) => { return <div className={`${styles.title}`}>{children}</div>; };
Modal.Body = ({ children }) => { return <div className={`${styles.body}`}>{children}</div>; };
Modal.Footer = ({ children }) => { return <div className={`${styles.footer}`}>{children}</div> };

Modal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node
};

Modal.defaultProps = {
    isOpen: false
};

export default Modal;

