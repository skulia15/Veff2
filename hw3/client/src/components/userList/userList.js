import React from 'react';
import UserListItem from '../userListItem/userListItem';
import PropTypes from 'prop-types';

class UserList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            users: this.props.users,
            userIsOp: false
        }
        this.makeUserOp = this.makeUserOp.bind(this);
        
        this.socketService = this.context.server.socketService;
    }

    componentDidMount() {
        this.setState({users: this.props.users})
        
        // if(this.props.currentRoom.ops)
    }

    makeUserOp(event) {
        alert('make user op');
        event.preventDefault();
    }

    componentWillReceiveProps(nextProps) {
        console.log('Detected new user');
        if(nextProps.users !== this.state.users) {
            console.log('Updating state for users');
            this.setState({users: nextProps.users})
            console.log(this.state.users);
            console.log(nextProps.users);
            console.log(this);
            this.forceUpdate();
        }
    }

    render() {
        if(this.state.users) {
            return (
                <div>
                    <ul className="list-group user-list"  onClick={this.makeUserOp}>
                        {this.state.users.map((userListItem) => {
                            return <UserListItem key={userListItem} value={userListItem} info={userListItem}/>
                        })}
                    </ul>
                </div>
            );
        } else{
            console.log('------USER LIST ERROR-----');
            console.log(this.state.users);
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