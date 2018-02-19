import React from 'react';
import UserListItem from '../userListItem/userListItem';
import PropTypes from 'prop-types';

class UserList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            users: this.props.users
        }
        
        this.socketService = this.context.server.socketService;
    }

    componentDidMount() {
        this.setState({users: this.props.users})
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.users !== this.state.users) {
            this.setState({users: nextProps.users})
        }
    }

    render() {
        if(this.state.users) {
            return (
                <div>
                    <ul className="list-group user-list">
                        {this.state.users.map((userListItem) => {
                            return <UserListItem key={userListItem} info={userListItem} />
                        })}
                    </ul>
                </div>
            );
        } else{
            return(
                <div>
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
        history: PropTypes.component
    })
};
export default UserList;