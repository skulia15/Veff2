import React from 'react';

class InfoContainer extends React.Component {
    render() {
        return (
            <div className="container info-container col-md-3">
                {this.props.children}
            </div>
            
        );
    }
}

export default InfoContainer;