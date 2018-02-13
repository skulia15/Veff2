import React from 'react';
import RoomListItem from '../roomListItem/roomListItem';
var socket = require('socket.io-client')('http://localhost:8080');

class RoomList extends React.Component {
    componentDidMount() {
        console.log('component did mount');
    }

    constructor(props) {
        super(props);
    }

    render() {
        const rooms;

        socket.on('connect', function() {
            console.log('Socket connected successfully');
        });
        
        socket.emit('rooms', 'GnoMe', function() {
            console.log('calling rooms...');
        });
        
        socket.on('roomlist', function(res) {
            console.log('Received answer about rooms from server');
            rooms = res;
        });

        if(rooms.length) {
            return (
                <ul className="room-list">
                    {rooms.map((roomListItem) => {
                        return <RoomListItem info={roomListItem} />
                    })}
                </ul>
            );
        } else {
            return (
                <p> No rooms found + {rooms}</p>
            );
        }
    }
}

export default RoomList;