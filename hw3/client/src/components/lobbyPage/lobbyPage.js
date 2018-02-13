import React from 'react';
import InfoContainer from '../../components/infoContainer/infoContainer';
import RoomContainer from '../../components/roomContainer/roomContainer';
import RoomList from '../roomList/roomList';
import UserList from '../userList/userList';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import MainContainer from '../mainContainer/mainContainer';

class LobbyPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    
    render() {
        return (
            <MainContainer>
                <InfoContainer>
                    <h1>This is the Lobby</h1>

                    <h3>Here is the list of users</h3>                
                    <UserList />
                    <h3>Here is the list of rooms</h3>                                
                    <RoomList />
                    <Link to="/createRoom" className="btn btn-success">Create Room</Link>
                </InfoContainer>

                <RoomContainer>
                    <h1>Messages come here</h1>

                    <h3>Here is the list of users</h3>  
                    
                </RoomContainer>
            </MainContainer>
        );
    }
}

LobbyPage.contextTypes = {
    server: PropTypes.shape({
        socketService: PropTypes.component
    }),
    
    routerHelper: PropTypes.shape({
        history: PropTypes.component,
    })
};

export default LobbyPage;