import React from 'react';
import RoomListItem from '../roomListItem/roomListItem';
import PropTypes from 'prop-types';

class RoomList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            rooms: []
        }

        this.socketService = this.context.server.socketService;
        this.handleJoinRoom = this.handleJoinRoom.bind(this);

        // Send emit to rooms
        this.socketService.getRooms();
        // Grab the event when server returns rooms
        this.socketService.roomListener((roomList) =>{
            this.setState({rooms: roomList});
            console.log('Rooms: ');
            console.log(this.state.rooms);
        })
    }

    handleJoinRoom(event) {
        console.log(event.target.value);
        this.socketService.joinRoom(event.target.value);
    }

    render() {
        return (
            <div>
                <ul className="list-group room-list" onClick={this.handleJoinRoom}>
                    {Object.keys(this.state.rooms).map((roomListItem) => {
                        return <RoomListItem info={roomListItem} />
                    })}
                </ul>
            </div>
        );
    }
}

RoomList.contextTypes = {
    server: PropTypes.shape({
        socketService: PropTypes.component
    }),
    routerHelper: PropTypes.shape({
        history: PropTypes.component
    })
};

export default RoomList;