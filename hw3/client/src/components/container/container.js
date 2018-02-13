import React from 'react';
import RoomList from '../../components/roomList/roomList'

class Container extends React.Component {
    render() {
        return (
            <div className="container">{this.props.children}
                <RoomList />
            </div>
            
        );
    }
}

export default Container;