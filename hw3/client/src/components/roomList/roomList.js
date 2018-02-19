import React from 'react';
import RoomListItem from '../roomListItem/roomListItem';
import PropTypes from 'prop-types';

class RoomList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            rooms: this.props.rooms
        }

        this.socketService = this.context.server.socketService;
        this.handleJoinRoom = this.handleJoinRoom.bind(this);
    }
    componentWillMount() {
        this.setState({rooms: this.props.rooms})
    }

    componentWillReceiveProps(nextProps) {
        console.log('Rooms Props Changed');
        if(nextProps.rooms !== this.state.rooms) {
            console.log('Changing room state');
            this.setState({rooms: nextProps.rooms})
        }
    }

    handleJoinRoom(event) {
        this.socketService.leaveRoom(this.props.currentRoomTitle)
        this.socketService.joinRoom(event.target.value);
        let keys = Object.getOwnPropertyNames(this.props.rooms);
        let indexOfJoinedRoom = keys.indexOf(event.target.value);
        let currentRoom = this.props.rooms[Object.keys(this.props.rooms)[indexOfJoinedRoom]];
        let currentRoomTitle = event.target.value;
        let currentRoomTopic = currentRoom.topic;
        this.props.updateCurrentRoom(currentRoom, currentRoomTitle, currentRoomTopic);
        console.log(currentRoom);
    }

    render() {
        if(this.state.rooms) {
            return (
                <div>
                    <ul className="list-group room-list" onClick={this.handleJoinRoom}>
                        {Object.keys(this.state.rooms).map((roomListItem) => {
                            return <RoomListItem key={roomListItem} info={roomListItem} value={roomListItem}/>
                        })}
                    </ul>
                </div>
            );
        } else {
            <div>Something went horribly wrong</div>
        }
    }
}

RoomList.contextTypes = {
    server: PropTypes.shape({
        socketService: PropTypes.component
    }),
    routerHelper: PropTypes.shape({
        redirect: PropTypes.component
    })
};

export default RoomList;