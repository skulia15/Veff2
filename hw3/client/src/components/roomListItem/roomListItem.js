import React from 'react';

const RoomListItem = ({info}) => {
    const {topic} = info;
    console.log(topic)
    return (
        <li className="room-list-item">
            <h3>
                hello
                {info.topic}
            </h3>
        </li>
        
    );
}

export default RoomListItem;