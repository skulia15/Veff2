import React from 'react';
import InfoContainer from '../../components/infoContainer/infoContainer';
import RoomList from '../roomList/roomList';
import UserList from '../userList/userList';
import PropTypes from 'prop-types';
import MainContainer from '../mainContainer/mainContainer';
import RoomContainer from '../roomContainer/roomContainer';
import MessageList from '../messageList/messageList';
import UsersInRoomContainer from '../usersInRoomContainer/usersInRoomContainer';
import CreateRoomModal from '../createRoomPage/createRoomModal';
import PrivateMessageModal from '../privateMessageModal/privateMessageModal';
import DisplayPrivateMessageModal from '../displayPrivateMessageModal/displayPrivateMessageModal';

class LobbyPage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentUser: null,
            currentRoom: null,
            currentRoomTitle: '',
            currentRoomTopic: '',
            rooms: [],
            users: [],
            usersInRoom: [],
            messages: [],
            opsInRoom: [],
            createRoomIsOpen: false,
            privateMessageIsOpen: false,
            displayMessageIsOpen: false,
            sendPrivateMessageTo: '',
            receivedMsgFrom: '',
            receivedMsg: '',
        }

        // For calling socket
        this.socketService = this.context.server.socketService;

        // Binding 'this' to local functions
        this.updateCurrentRoom = this.updateCurrentRoom.bind(this);
        this.toggleCreateRoomModal = this.toggleCreateRoomModal.bind(this);
        this.togglePrivateMessageModal = this.togglePrivateMessageModal.bind(this);
        this.toggleDisplayMessageModal = this.toggleDisplayMessageModal.bind(this);
        this.showInfo = this.showInfo.bind(this);
        this.showChatRoom = this.showChatRoom.bind(this);
        this.showModal = this.showModal.bind(this);
        this.showPrivateMessageModal = this.showPrivateMessageModal.bind(this);

        // On first page load user should join the lobby
        this.socketService.joinRoom('lobby');
    }

    componentDidMount() {
        // If current user has not been set get it from location
        if(this.state.currentUser === null) {
            this.setState({currentUser: this.props.location.username.referrer});
        }

        // Request list of users
        this.socketService.getUsers();

        // Listen to when server responds with user list
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

        this.socketService.usersInChatListener((room, updatedUsers, updatedOPs) => {
            this.socketService.getRooms();
            // Map op's from object to array
            let updatedOpsArray = $.map(updatedOPs, function(value) {
                return [value];
            });
            // Map users from object to array            
            let updatedUsersArray = $.map(updatedUsers, function(value) {
                return [value];
            });

            this.setState({usersInRoom: updatedUsersArray, opsInRoom: updatedOpsArray});
        });

        this.socketService.messageListener((currentRoom, updatedMessages) => {
            this.setState({messages: updatedMessages});
            // Scroll to the bottom when chat updates with new message
            $('#message-list').scrollTop(Number.MAX_SAFE_INTEGER);
        });

        this.socketService.serverMessageListener((type, room, username) => {
            console.log('Server detected \n Action: ' + type + ' in room ' + room + ' for user '  + username);
        });

        this.socketService.privateMessageListener((messageFrom, message) => {
            this.setState({displayMessageIsOpen: true});
            this.setState({receivedMsgFrom: messageFrom, receivedMsg: message})
        })
    }

    updateCurrentRoom(currentRoom, currentRoomTitle, currentRoomTopic) {
        event.preventDefault();
        this.socketService.getRooms();
        this.setState({currentRoom: currentRoom});
        this.setState({currentRoomTitle: currentRoomTitle});
        this.setState({currentRoomTopic: currentRoomTopic});
        let currentRoomOpsArray = $.map(currentRoom.ops, function(value) {
            return [value];
        });

        this.setState({opsInRoom: currentRoomOpsArray});
    }

    toggleCreateRoomModal() {
        $('#createRoomModal').css('display', 'grid')
        this.setState({createRoomIsOpen: !this.state.createRoomIsOpen});
    }

    togglePrivateMessageModal(sendTo) {
        this.setState({sendPrivateMessageTo: sendTo})
        $('#privateMessageModal').css('display', 'grid');
        this.setState({privateMessageIsOpen: !this.state.privateMessageIsOpen});
        this.setState({sendPrivateMessageTo: sendTo});
    }

    toggleDisplayMessageModal() {
        $('#display-private-message-modal').css('display', 'grid')
        this.setState({displayMessageIsOpen: !this.state.displayMessageIsOpen});
    }


    showInfo() {
        return(
            <InfoContainer>
                <h3>Active Chatrooms</h3>
                <button className="btn btn-success" onClick={this.toggleCreateRoomModal}>Create Room</button>
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
                    <h3>OPs</h3>
                    <UserList
                        togglePrivateMessageModal ={this.togglePrivateMessageModal}
                        currentRoomTitle={this.state.currentRoomTitle}
                        users={this.state.opsInRoom}
                        currentUser={this.state.currentUser}
                        currentRoom={this.state.currentRoom}
                        opsInRoom={this.state.opsInRoom}/>
                    <h3>Users In chat</h3>
                    <UserList
                        togglePrivateMessageModal ={this.togglePrivateMessageModal}
                        currentRoomTitle={this.state.currentRoomTitle}
                        currentUser={this.state.currentUser}
                        users={this.state.usersInRoom}
                        currentRoom={this.state.currentRoom}
                        opsInRoom={this.state.opsInRoom}/>
                </UsersInRoomContainer>
            </MainContainer>
        );
    }

    showModal() {
        return(
            <CreateRoomModal show={this.state.createRoomIsOpen}
                onClose={this.toggleCreateRoomModal}
                rooms={this.state.rooms}
                updateCurrentRoom={this.updateCurrentRoom}>
            </CreateRoomModal>
        )
    }
    
    showPrivateMessageModal() {
        return(
            <PrivateMessageModal show={this.state.privateMessageIsOpen}
                sendTo={this.state.sendPrivateMessageTo}
                onClose={this.togglePrivateMessageModal}>
            </PrivateMessageModal>
        )
    }

    showDisplayPrivateMessageModal() {
        return(
            <DisplayPrivateMessageModal show={this.state.displayMessageIsOpen}
                onClose={this.toggleDisplayMessageModal}
                receivedMsgFrom={this.state.receivedMsgFrom}
                receivedMsg={this.state.receivedMsg}>
            </DisplayPrivateMessageModal>
        )
    }
    render() {
        if(this.state.currentRoom && this.state.currentRoomTitle
            && this.state.rooms && this.state.currentUser) {
            return (
                <div>
                    <div className="header">
                        <h3 className="center"><i className="fab fa-rocketchat icon icon-large"></i>Welcome to ChatterBox {this.state.currentUser}</h3>
                    </div>
                    <MainContainer>
                        {this.showInfo()}
                        {this.showChatRoom()}
                        {this.showModal()}
                        {this.showPrivateMessageModal()}
                        {this.showDisplayPrivateMessageModal()}
                    </MainContainer>
                </div>
            );
        } else{
            return(
                <div>
                    Something went wrong in lobby
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
