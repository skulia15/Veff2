import React from 'react';
import PropTypes from 'prop-types';

class MessageList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            messages: []
        }

        this.socketService = this.context.server.socketService;
        // this.handleJoinMessage = this.handleJoinMessage.bind(this);

        // Send emit to messages
        this.socketService.getMessages();
        // Grab the event when server returns messages
        this.socketService.messageListener((messageList) =>{
            this.setState({messages: messageList});
            console.log('Messages: ');
            console.log(this.state.messages);
        })
    }

    handleJoinMessage(event) {
        console.log(event.target.value);
        this.socketService.joinMessage(event.target.value);
    }

    render() {
        return (
            <div>
                <ul className="list-group message-list" onClick={this.handleJoinMessage}>
                    {Object.keys(this.state.messages).map((messageListItem) => {
                        return <MessageListItem info={messageListItem} />
                    })}
                </ul>
            </div>
        );
    }
}

MessageList.contextTypes = {
    server: PropTypes.shape({
        socketService: PropTypes.component
    }),
    routerHelper: PropTypes.shape({
        history: PropTypes.component
    })
};

export default MessageList;