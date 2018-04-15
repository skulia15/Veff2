import React from 'react';
import moment from 'moment';

const MessageListItem = ({info}) => {
    const {message, nick, timestamp} = info;
    return (
        <li className="list-group-item">
            {moment(timestamp).format('YYYY MMMM Do, h:mm:ss a')}<br />
            <b>{nick}:</b><br />
            {message}
            
        </li>
    );
}
export default MessageListItem;