import React from 'react';

class RoomContainer extends React.Component {
    render() {
        return (
            <div className="container room-container">
                {this.props.children}
            </div>
        );
    }
}
export default RoomContainer;