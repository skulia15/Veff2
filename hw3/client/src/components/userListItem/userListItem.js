import React from 'react';

const UserListItem = ({info}) => {
    //const {nickname} = info;
    return (
        <li className="list-group-item user-list-item">
            <i className="fas fa-user icon icon-small"></i>
            {info}
        </li>
        
    );
}

export default UserListItem;