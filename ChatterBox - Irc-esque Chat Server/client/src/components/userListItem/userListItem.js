import React from 'react';

class UserListItem extends React.Component {
    constructor(props, ctx) {
        super(props,ctx);
        this.state = {
            nickname: this.props.info,
            opsInRoom: this.props.opsInRoom
        }
        this.showOpOptions = this.showOpOptions.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        this.setState({nickname: this.props.info});

        if(nextProps.opsInRoom !== this.state.opsInRoom) {
            this.setState({userIsOp: nextProps.opsInRoom});
        }
    }

    showOpOptions() {
        if(this.props.opsInRoom.includes(this.props.currentUser)) {
            return(
                <div className="button-right">
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
                </div>
            )
        }
    }

    render() {
        if(this.state.nickname) {
            return (
                <li id="user-list-item" className="list-group-item user-list-item">
                    <i className="fas fa-user icon icon-small"></i>
                    {this.state.nickname}
                    <div class="button-right">
                        {this.showOpOptions()}
                        <button
                            className="btn btn-success"
                            value={this.state.nickname}
                            onClick={() => this.props.togglePrivateMessageModal(this.state.nickname)}>Private Message</button>
                    </div>

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
