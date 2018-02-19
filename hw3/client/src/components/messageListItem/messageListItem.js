import React from 'react';

const MessageListItem = ({info}) => {
    const {message, nick, timestamp} = info;
    return (
        <li className="list-group-item">
            <p>{timestamp}</p>
            <p><b>{nick}:</b></p>
            <p>{message}</p>
            
        </li>
    );
}
export default MessageListItem;