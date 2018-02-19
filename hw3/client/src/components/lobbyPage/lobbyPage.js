import React from 'react';
import InfoContainer from '../../components/infoContainer/infoContainer';
import RoomList from '../roomList/roomList';
import UserList from '../userList/userList';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import MainContainer from '../mainContainer/mainContainer';
import RoomContainer from '../roomContainer/roomContainer';
import MessageList from '../messageList/messageList';
import UsersInRoomContainer from '../usersInRoomContainer/usersInRoomContainer';


class LobbyPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentRoom: null,
            currentRoomTitle: '',
            currentRoomTopic: '',
            usersInRoom: [],
            rooms: [],
            users: [],
            usersInRoom: [],
            messages: [],
            opsInRoom: []
        }

        // For calling socket
        this.socketService = this.context.server.socketService;

        this.updateCurrentRoom = this.updateCurrentRoom.bind(this);
        
        this.showInfo = this.showInfo.bind(this);        
        this.showChatRoom = this.showChatRoom.bind(this);

        // On first page load user should join the lobby
        this.socketService.joinRoom('lobby');
    }

    componentDidMount() {
        this.socketService.getUsers();

        this.socketService.userListener((userList) => {
            this.setState({users: userList})
        })

        // Grab the event when server returns rooms
        this.socketService.roomListener((roomList) =>{
            this.setState({rooms: roomList});
            let keys = Object.getOwnPropertyNames(roomList);
            // If we have not yet joined a room, then join the lobby
            if(!this.state.currentRoom) {
                let indexOfLobby = keys.indexOf('lobby');
                // Get the object representing the lobby
                this.setState({currentRoom: roomList[Object.keys(roomList)[indexOfLobby]]});
                this.setState({currentRoomTitle: 'lobby'})
                this.setState({currentRoomTopic: this.state.currentRoom.topic})
                this.setState({usersInRoom: this.state.currentRoom.users})
            }
        });

        // Request a list of rooms
        this.socketService.getRooms();

        // Grab the event when server returns rooms
        this.socketService.usersInChatListener((room, updatedUsers, updatedOPs) => {
            this.setState({usersInRoom: updatedUsers, opsInRoom: updatedOPs});
        });

        this.socketService.messageListener((currentRoom, updatedMessages) => {
            this.setState({messages: updatedMessages})
            // Scroll to the bottom when chat updates with new message       
            $('#message-list').scrollTop(Number.MAX_SAFE_INTEGER);            
        });
    }

    updateCurrentRoom(currentRoom, currentRoomTitle, currentRoomTopic) {
        event.preventDefault();
        this.setState({currentRoom: currentRoom});
        this.setState({currentRoomTitle: currentRoomTitle});
        this.setState({currentRoomTopic: currentRoomTopic});
        console.log('***** Current Room info ******');
        console.log(this.state.currentRoom);
    }

    showChatRoom() {
        return(
            <MainContainer>
                <RoomContainer>
                    <h2>Current Chatroom: {this.state.currentRoomTitle}</h2>
                    <h4>Topic for this Chatroom: {this.state.currentRoomTopic}</h4>
                    <MessageList
                        currentRoomTitle={this.state.currentRoomTitle} 
                        currentRoom={this.state.currentRoom} 
                        messages={this.state.messages}/>
                </RoomContainer>
                <UsersInRoomContainer>
                    <h3>OP's</h3>
                    <UserList users={Object.keys(this.state.opsInRoom)}/>
                    <h3>Users In chat</h3>
                    <UserList users={Object.keys(this.state.usersInRoom)}/>                    
                </UsersInRoomContainer>
            </MainContainer>
        );
    }

    showInfo() {
        return(
            <InfoContainer>
                <h3>Active Users</h3>                
                <UserList users={this.state.users}/>
                <h3>Active Chatrooms</h3>                                
                <RoomList rooms={this.state.rooms} 
                    currentRoom={this.state.currentRoom} 
                    currentRoomTitle={this.state.currentRoomTitle}
                    updateCurrentRoom={this.updateCurrentRoom}/>
                <Link to="/createRoom" className="btn btn-success">Create Room</Link>
            </InfoContainer>
        );
    }

    render() {
        if(this.state.currentRoom && this.state.currentRoomTitle && this.state.rooms) {
            return (
                <MainContainer>
                    {this.showInfo()}
                    {this.showChatRoom()}
                </MainContainer>
            );
        } else{
            return(
                <div>
                    Something went wrong
                </div>
            )
        }
    }
}

LobbyPage.contextTypes = {
    server: PropTypes.shape({
        socketService: PropTypes.component
    }),
    
    routerHelper: PropTypes.shape({
        history: PropTypes.component,
    }),


};

export default LobbyPage;