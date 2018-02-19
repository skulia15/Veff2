import React from 'react';
import PropTypes from 'prop-types';
import MessageListItem from '../messageListItem/messageListItem'

class MessageList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentRoom: this.props.currentRoom,
            currentRoomTitle: this.props.currentRoomTitle,
            messages: this.props.messages,
            messageContents: '',
        }
        // Bind 'this' to local functions
        this.handleChange = this.handleChange.bind(this);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.socketService = this.context.server.socketService;
    }

    componentWillReceiveProps(nextProps) {
        // If messages are updated in parent they need to be updated in this component
        if(nextProps.messages !== this.state.messages) {
            this.setState({messages: nextProps.messages})
        }
        // If there is a change in the current room in parent we need to update this component as well
        if(nextProps.currentRoom !== this.state.currentRoom) {
            this.setState({currentRoom: nextProps.currentRoom})
            this.setState({currentRoomTitle: nextProps.currentRoomTitle})
        }
    }

    handleChange(event) {
        this.setState({messageContents: event.target.value});
    }

    handleSendMessage(event) {
        let contents = {msg: this.state.messageContents, roomName: this.state.currentRoomTitle}
        this.socketService.sendMessage(contents);
        this.setState({messageContents: ''});
        $('#message').val('');
        event.preventDefault();
    }

    render() {
        if(this.state.currentRoomTitle) {
            // Scroll to the bottom upon render
            $('#message-list').scrollTop(Number.MAX_SAFE_INTEGER);
            return (
                <div>
                    <div id="message-list" className="pre-scrollable">
                        <ul className="list-group message-list">
                            {this.state.messages.map((messageListItem) => {
                                return <MessageListItem key={messageListItem.timestamp} info={messageListItem} />
                            })}
                        </ul>
                    </div>
                    <div>
                        <form>
                            <div className="form-group">
                                <label>Message:</label>
                                <textarea className="form-control" rows="3" id="message" onChange={this.handleChange}></textarea>
                            </div>
                            <button className="btn btn-info" onClick={this.handleSendMessage}>Send</button>
                        </form>
                    </div>
                </div>
            );
        } else{
            return(
                <div></div>
            )
        }
    }
}

MessageList.contextTypes = {
    server: PropTypes.shape({
        socketService: PropTypes.component
    }),
    routerHelper: PropTypes.shape({
        redirect: PropTypes.component
    })
};

export default MessageList;