import React from 'react';

class HomeContainer extends React.Component {
    render() {
        return (
            <div className="container home-container">
                {this.props.children}
            </div>
        );
    }
}

export default HomeContainer;