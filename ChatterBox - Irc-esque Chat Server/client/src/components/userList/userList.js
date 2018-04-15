import React from 'react';
import UserListItem from '../userListItem/userListItem';
import PropTypes from 'prop-types';

class UserList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            users: this.props.users,
            currentRoom: this.props.currentRoom,
            currentUser: this.props.currentUser,
            currentRoomTitle: this.props.currentRoomTitle,
            opsInRoom: this.props.opsInRoom
        }
        this.makeUserOp = this.makeUserOp.bind(this);
        this.kickUser = this.kickUser.bind(this);
        this.banUser = this.banUser.bind(this);
        this.removeOpFromUser = this.removeOpFromUser.bind(this);
        
        this.socketService = this.context.server.socketService;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({users: this.props.users});
        this.setState({currentRoom: this.props.currentRoom});
        this.setState({currentUser: this.props.currentUser});
        this.setState({currentRoomTitle: this.props.currentRoomTitle});
        this.setState({opsInRoom: this.props.opsInRoom});
        
        
        // if props have been updated then update the state
        if(nextProps.users !== this.state.users) {
            this.setState({users: nextProps.users});
        }

        if(nextProps.currentRoom !== this.state.currentRoom) {
            this.setState({currentRoom: nextProps.currentRoom});
        }

        if(nextProps.currentUser !== this.state.currentUser) {
            this.setState({currentUser: nextProps.currentUser});
        }

        if(nextProps.currentRoomTitle !== this.state.currentRoomTitle) {
            this.setState({currentRoomTitle: nextProps.currentRoomTitle});
        }

        if(nextProps.opsInRoom !== this.state.opsInRoom) {
            this.setState({opsInRoom: nextProps.opsInRoom});
        }
    }

    makeUserOp(nickname, roomName) {
        alert('OP-ing user ' + nickname);
        this.socketService.makeUserOp(nickname, roomName, (success) => {
            if(success) {
                console.log('Successfully op\'d user' + nickname);
            } else{
                console.log('Failed to Op');
            }
        });
        event.preventDefault();
    }

    removeOpFromUser(nickname, roomName) {
        alert('De-op-ing user ' + nickname);
        this.socketService.removeOpFromUser(nickname, roomName, (success) => {
            if(success) {
                console.log('Successfully de-op\'d user' + nickname);              
            } else{
                console.log('Failed to de-Op');
            }
        });
        event.preventDefault();
    }

    kickUser(nickname, roomName) {
        alert('Kicking user ' + nickname);
        this.socketService.kickUser(nickname, roomName, (success) => {
            if(success) {
                console.log('Successfully kicked ' + nickname);
            } else{
                console.log('Failed to kick ' + nickname);
            }
        });
        event.preventDefault();
    }

    banUser(nickname, roomName) {
        alert('Banning user ' + nickname);
        this.socketService.banUser(nickname, roomName, (success) => {
            if(success) {
                console.log('Successfully banned');
            } else{
                console.log('Failed to ban');
            }
        })
        event.preventDefault();
    }

    render() {
        if(this.state.users && this.state.currentRoom) {
            return (
                <div>
                    <ul className="list-group user-list">
                        {this.state.users.map((userListItem) => {
                            return <UserListItem 
                                opsInRoom={this.props.opsInRoom}
                                togglePrivateMessageModal={this.props.togglePrivateMessageModal}
                                kickUser={this.kickUser} 
                                makeUserOp={this.makeUserOp}
                                banUser={this.banUser} 
                                removeOpFromUser={this.removeOpFromUser}                                 
                                currentRoom={this.state.currentRoom}
                                currentRoomTitle={this.state.currentRoomTitle}
                                currentUser={this.props.currentUser}
                                key={userListItem} 
                                value={userListItem} 
                                info={userListItem}/>
                        })}
                    </ul>
                </div>
            );
        } else {
            return(
                <div>
                    Error in User List
                </div>
            )
        }
    }
}

UserList.contextTypes = {
    server: PropTypes.shape({
        socketService: PropTypes.component
    }),
    routerHelper: PropTypes.shape({
        redirect: PropTypes.component
    })
};
export default UserList;