import React from 'react';

const MessageListItem = ({info}) => {

    return (
        <li className="list-group-item message-list-item">
            <button className="btn btn-success" value={info}>
                {info}
            </button>
        </li>
    );
}
export default MessageListItem;