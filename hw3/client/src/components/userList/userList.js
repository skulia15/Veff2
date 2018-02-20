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
            //userIsOp: false,
        }
        this.makeUserOp = this.makeUserOp.bind(this);
        this.kickUser = this.kickUser.bind(this);
        this.banUser = this.banUser.bind(this);
        this.removeOpFromUser = this.removeOpFromUser.bind(this);
        
        this.socketService = this.context.server.socketService;
    }

    makeUserOp(nickname, roomName) {
        alert('op-ing');
        this.socketService.makeUserOp(nickname, roomName, (success) => {
            if(success) {
                console.log('Successfully op\'d user' + nickname);
            } else{
                console.log('Failed to Op');
                console.log(nickname);
                console.log(this.state.currentRoomTitle);
            }
        })
        event.preventDefault();
    }

    removeOpFromUser(nickname, roomName) {
        alert('De op-ing');
        this.socketService.removeOpFromUser(nickname, roomName, (success) => {
            if(success) {
                console.log('Successfully de-op\'d user' + nickname);
            } else{
                console.log('Failed to de-Op');
                console.log(nickname);
                console.log(this.state.currentRoomTitle);
            }
        })
        event.preventDefault();
    }


    kickUser(nickname, roomName) {
        console.log(nickname);
        console.log(roomName);
        this.socketService.kickUser(nickname, roomName, (success) => {
            if(success) {
                console.log('Successfully kicked');
            } else{
                console.log('Failed to kick');
                console.log(nickname);
                console.log(this.state.currentRoomTitle);
            }
        })
        event.preventDefault();
    }

    banUser(nickname, roomName) {
        this.socketService.banUser(nickname, roomName, (success) => {
            if(success) {
                console.log('Successfully banned');
            } else{
                console.log('Failed to ban');
                console.log(nickname);
                console.log(this.state.currentRoomTitle);
            }
        })
        event.preventDefault();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({users: this.props.users});
        this.setState({currentRoom: this.props.currentRoom});
        this.setState({currentUser: this.props.currentUser});
        this.setState({currentRoomTitle: this.props.currentRoomTitle});
        
        // if user props have been updated
        if(nextProps.users !== this.state.users) {
            this.setState({users: nextProps.users})
            this.forceUpdate(); // TODO: þarf þetta?
        }

    }

    render() {
        if(this.state.users && this.state.currentRoom) {
            return (
                <div>
                    <ul className="list-group user-list">
                        {this.state.users.map((userListItem) => {
                            return <UserListItem 
                                togglePrivateMessageModal={this.props.togglePrivateMessageModal}
                                kickUser={this.kickUser} 
                                makeUserOp={this.makeUserOp}
                                banUser={this.banUser} 
                                removeOpFromUser={this.removeOpFromUser}                                 
                                currentRoom={this.state.currentRoom}
                                currentRoomTitle={this.state.currentRoomTitle}
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