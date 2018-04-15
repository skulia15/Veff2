import React from 'react';

const RoomListItem = ({info}) => {

    return (
        <li className="list-group-item room-list-item">
            <i className="fas fa-comments icon icon-small"></i>
            {info}
            <button id="join-button"className="btn btn-success join-button" value={info}>
                Join
            </button>
        </li>
    );
}
export default RoomListItem;