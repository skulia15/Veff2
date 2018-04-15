import React from 'react';

class UsersInRoomContainer extends React.Component {
    render() {
        return (
            <div className="container container-fluid users-in-room-container">
                {this.props.children}
            </div>
        );
    }
}

export default UsersInRoomContainer;
