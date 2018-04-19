import React from 'react';
import { PropTypes } from 'prop-types';

const EmployeeItem  = ({employee})  => {
    const {name, jobtitle, image, started} = employee;
    if(employee){
        return(
                <div className='details-container'>
                    <h2>{name}</h2>
                    <p><i>{jobtitle}</i></p>
                    <img src={image} />
                    <p>Started: {started}</p>
                </div>
                    
        );
    }
    else{
        return(
            <div className='details-container'>
                <h2>Loading</h2>
            </div>
        )
    }
}

EmployeeItem.propTypes = {
    name: PropTypes.string.isRequired,
    jobtitle: PropTypes.string.isRequired,
    started: PropTypes.string.isRequired,
    image: PropTypes.string
};

EmployeeItem.defaultProps = {
    image: 'address of generic image',
};

export default EmployeeItem;