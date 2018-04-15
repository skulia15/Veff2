import React from 'react';

class InfoContainer extends React.Component {
    render() {
        return (
            <div className="info-container">
                {this.props.children}
            </div>

        );
    }
}

export default InfoContainer;
