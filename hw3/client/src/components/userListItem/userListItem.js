import React from 'react';



class UserListItem extends React.Component {
    constructor(props, ctx) {
        super(props,ctx);
        this.state = {
            userIsOp: false,
            nickname: this.props.info
        }
        this.showOpOptions = this.showOpOptions.bind(this);
        
    }

    componentWillReceiveProps() { 
        this.setState({nickname: this.props.info});

        // If user is op then mark him as such
        if(this.props.currentRoom.ops.hasOwnProperty(this.props.info)) {
            this.setState({userIsOp: true});
        }
    }
    

    showOpOptions() {
        //if(this.state.userIsOp === true) {
        return(
            <div>
                <button
                    className="btn btn-warning" 
                    value={this.state.nickname} 
                    onClick={() => this.props.kickUser(this.state.nickname, this.props.currentRoomTitle)}>Kick</button>
                <button 
                    className="btn btn-danger" 
                    value={this.state.nickname} 
                    onClick={() => this.props.banUser(this.state.nickname, this.props.currentRoomTitle)}>Ban User</button>  
                <button 
                    className="btn btn-primary" 
                    value={this.state.nickname} 
                    onClick={() => this.props.makeUserOp(this.state.nickname, this.props.currentRoomTitle)}>Make OP</button>
                <button 
                    className="btn btn-warning" 
                    value={this.state.nickname} 
                    onClick={() => this.props.removeOpFromUser(this.state.nickname, this.props.currentRoomTitle)}>De-OP</button>
                <button 
                    className="btn btn-success" 
                    value={this.state.nickname}
                    onClick={() => this.props.togglePrivateMessageModal(this.state.nickname)}>Private Message</button> 
            </div>
        )
    // }
    }

    render() {
        if(this.state.nickname && this.state.userIsOp !== undefined) {
            return (
                <li id="user-list-item" className="list-group-item user-list-item">
                    <i className="fas fa-user icon icon-small"></i>
                    {this.state.nickname}
                    {this.showOpOptions()}
                </li>
            );
        } else {
            return(
                <div>What a terrible error this is</div>
            );
        }
    }
}

export default UserListItem;