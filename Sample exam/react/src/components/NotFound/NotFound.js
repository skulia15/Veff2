import React from 'react';

const NotFound = () => {
    var imgstyle = {
        width: 50
    }
    return (
        <div>
            <div className="nav-logo">
                <img src="https://image.flaticon.com/icons/svg/179/179386.svg" alt="" style={imgstyle}/>
                <p>404 Not Found</p>
            </div>
        </div>
    );
};

export default NotFound;