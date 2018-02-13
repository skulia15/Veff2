import React from 'react';
import PropTypes from 'prop-types';
//import InfoContainer from '../../components/infoContainer/infoContainer';
import MainContainer from '../../components/mainContainer/mainContainer';
import LoginForm from '../../components/loginForm/loginForm';
import {Link} from 'react-router-dom';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="main-content">
                <h1 className="title">
                    <i className="fab fa-rocketchat"></i>
                 ChatterBox</h1>
                <MainContainer>
                    <LoginForm />
                    <Link to="/lobby" className="btn btn-primary">Lobby</Link>
                </MainContainer>
            </div>
        );
    }
}

HomePage.contextTypes = {
    server: PropTypes.shape({
        socketService: PropTypes.component
    }),
    
    routerHelper: PropTypes.shape({
        history: PropTypes.component,
    })
};


export default HomePage;