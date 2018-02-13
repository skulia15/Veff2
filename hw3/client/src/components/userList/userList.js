import React from 'react';
import UserListItem from '../userListItem/userListItem';
import PropTypes from 'prop-types';

class UserList extends React.Component {
    componentDidMount() {
        console.log('component did mount');
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            users: []
        }

        this.socketService = this.context.server.socketService;

        // Send emit to users
        this.socketService.getUsers();
        // Grab the event when server returns users
        this.socketService.userListener((userList) =>{
            this.setState({users: userList});
            console.log('Changing state: ');
            console.log(this.state.users);
        })
    }

    render() {
        console.log('rendering!:');
        console.log(this.state.users);
        return (
            <div>
                <ul className="list-group user-list">
                    {this.state.users.map((userListItem) => {
                        return <UserListItem info={userListItem} />
                    })}
                </ul>
            </div>
        );
    }
}

UserList.contextTypes = {
    server: PropTypes.shape({
        socketService: PropTypes.component
    }),
    routerHelper: PropTypes.shape({
        history: PropTypes.component
    })
};
export default UserList;