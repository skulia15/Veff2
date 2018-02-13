import React from 'react';
import RoomListItem from '../roomListItem/roomListItem';
import PropTypes from 'prop-types';

class RoomList extends React.Component {
    componentDidMount() {
        console.log('component did mount');
        
        // socket.on('roomlist', function(res) {
        //     console.log('Received answer about rooms from server');
        //     rooms = res;
            
        //     RoomList.state = {rooms: rooms}
        //     console.log('State Change: ');
        //     console.log(RoomList.state);
        // });
        //console.log(this.state.rooms);
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            rooms: []
        }

        this.socketService = this.context.server.socketService;

        // Connect to the server
        this.socketService.connect();
        // Send emit to rooms
        this.socketService.getRooms();
        // Grab the event when server returns rooms
        this.socketService.roomListener((roomList) =>{
            this.setState({rooms: roomList});
            console.log('Changing state: ');
            console.log(this.state.rooms);
        })
    }

    render() {
        console.log('rendering!:');
        console.log(this.state.rooms);
        return (
            <div>
                <ul className="room-list">
                    {this.state.rooms.map((roomListItem) => {
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
    })
};

export default RoomList;