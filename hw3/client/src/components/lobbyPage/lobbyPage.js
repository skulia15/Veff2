import React from 'react';
import InfoContainer from '../../components/infoContainer/infoContainer';
import RoomList from '../roomList/roomList';
import UserList from '../userList/userList';
import PropTypes from 'prop-types';
// import {Link} from 'react-router-dom';
import MainContainer from '../mainContainer/mainContainer';
import RoomContainer from '../roomContainer/roomContainer';
import MessageList from '../messageList/messageList';
import UsersInRoomContainer from '../usersInRoomContainer/usersInRoomContainer';
import CreateRoomModal from '../createRoomPage/createRoomModal';


class LobbyPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentUser: null,
            currentRoom: null,
            currentRoomTitle: '',
            currentRoomTopic: '',
            usersInRoom: [],
            rooms: [],
            users: [],
            messages: [],
            opsInRoom: [],
            isOpen: false
        }

        // For calling socket
        this.socketService = this.context.server.socketService;

        this.updateCurrentRoom = this.updateCurrentRoom.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        
        this.showInfo = this.showInfo.bind(this);        
        this.showChatRoom = this.showChatRoom.bind(this);
        this.showModal = this.showModal.bind(this);
        

        // On first page load user should join the lobby
        this.socketService.joinRoom('lobby');
    }

    componentDidMount() {
        // If current user has not been set get it from location
        if(this.state.currentUser === null) {
            this.setState({currentUser: this.props.location.username.referrer});
        }
        
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
                // Update users from obect to array
                let usersInRoomArray = $.map(this.state.currentRoom.users, function(value) {
                    return [value];
                });
                this.setState({usersInRoom: usersInRoomArray})
            }
        });

        // Request a list of rooms
        this.socketService.getRooms();

        // Grab the event when server returns rooms
        this.socketService.usersInChatListener((room, updatedUsers, updatedOPs) => {
            console.log('-------------------------------------');
            console.log('UPDATED USERS');
            console.log(updatedUsers);
            console.log('UPDATED OPS');
            console.log(updatedOPs);
            let updatedOpsArray = $.map(updatedOPs, function(value) {
                return [value];
            });
            let updatedUsersArray = $.map(updatedUsers, function(value) {
                return [value];
            });
            // console.log('UPDATED USERS ARRAY');
            // console.log(updatedUsersArray);
            // console.log('UPDATED OPS ARRAY');
            // console.log(updatedOpsArray);
            // console.log('-------------------------------------');
            
            this.setState({usersInRoom: updatedUsersArray, opsInRoom: updatedOpsArray});
            
        });

        this.socketService.messageListener((currentRoom, updatedMessages) => {
            this.setState({messages: updatedMessages})
            // Scroll to the bottom when chat updates with new message       
            $('#message-list').scrollTop(Number.MAX_SAFE_INTEGER);            
        });

        this.socketService.serverMessageListener((type, room, username) => {
            console.log('000000000000000');
            console.log(type, room, username);
            console.log('000000000000000');
        });
    }

    updateCurrentRoom(currentRoom, currentRoomTitle, currentRoomTopic) {
        event.preventDefault();
        this.setState({currentRoom: currentRoom});
        this.setState({currentRoomTitle: currentRoomTitle});
        this.setState({currentRoomTopic: currentRoomTopic});
        let currentRoomOpsArray = $.map(currentRoom.ops, function(value) {
            return [value];
        });
        this.setState({opsInRoom: currentRoomOpsArray});   
    }

    toggleModal() {
        $('.modal').css('display', 'grid')
        this.setState({isOpen: !this.state.isOpen});
    }
    
    showInfo() {
        return(
            <InfoContainer>
                <h3>Welcome to ChatterBox {this.state.currentUser}</h3>
                {/* <h3>Active Users</h3>                
                <UserList users={this.state.users}/> */}
                <h3>Active Chatrooms</h3>                                
                <button className="btn btn-success" onClick={this.toggleModal}>Create Room</button>
                <RoomList rooms={this.state.rooms} 
                    currentRoom={this.state.currentRoom} 
                    currentRoomTitle={this.state.currentRoomTitle}
                    updateCurrentRoom={this.updateCurrentRoom}/>
            </InfoContainer>
        );
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
                    <UserList 
                        currentRoomTitle={this.state.currentRoomTitle}
                        currentUser={this.state.currentUser}
                        currentRoom={this.state.currentRoom} 
                        users={this.state.opsInRoom} 
                        currentUser={this.state.currentUser} 
                        currentRoom={this.state.currentRoom}/>
                    <h3>Users In chat</h3>
                    <UserList 
                        currentRoomTitle={this.state.currentRoomTitle}                    
                        currentUser={this.state.currentUser} 
                        currentRoom={this.state.currentRoom} 
                        users={this.state.usersInRoom} 
                        currentUser={this.state.currentUser} 
                        currentRoom={this.state.currentRoom}/>                    
                </UsersInRoomContainer>
            </MainContainer>
        );
    }

    showModal() {
        return(
            <CreateRoomModal show={this.state.isOpen}
                onClose={this.toggleModal}>
                Here's some content for the modal
            </CreateRoomModal>
        )
    }

    render() {
        if(this.state.currentRoom && this.state.currentRoomTitle && this.state.rooms && this.state.currentUser) {
            return (
                <MainContainer>
                    {this.showInfo()}
                    {this.showChatRoom()}
                    {this.showModal()}
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
        redirect: PropTypes.component,
    }),


};

export default LobbyPage;