import React from 'react';

const UserListItem = ({info}) => {
    //const {nickname} = info;
    return (
        <li className="list-group-item user-list-item">
            {info}
        </li>
        
    );
}

export default UserListItem;