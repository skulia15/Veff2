import React from 'react';

class InfoContainer extends React.Component {
    render() {
        return (
            <div className="info-container col-md-4">
                {this.props.children}
            </div>
            
        );
    }
}

export default InfoContainer;