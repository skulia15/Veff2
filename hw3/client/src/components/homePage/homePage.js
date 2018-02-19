import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../../components/loginForm/loginForm';
//import {Link} from 'react-router-dom';
import HomeContainer from '../homeContainer/homeContainer';

class HomePage extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoggedIn: false,
            nickname: ''
        }
        this.socketService = this.context.server.socketService;
        this.redirect = this.context.routerHelper.redirect;
        this.TriggerLogin = this.TriggerLogin.bind(this);
    }
    
    ShowLogin() {
        if(this.state.isLoggedIn === false) {
            return(
                <LoginForm loginState={this.TriggerLogin}/>
            )
        } else {
            return(
                <this.redirect to={{
                    pathname: '/lobby',
                }} />
            )
        }
    }

    TriggerLogin(nickname) {
        this.setState({isLoggedIn: true})
        this.setState({nickname: nickname})
    }
    
    render() {
        return (
            <div className="main-content">
                <h1 className="title">
                    
                 Welcome to <br/>ChatterBox<i className="fab fa-rocketchat icon icon-large"></i></h1> 
                <HomeContainer>
                    {this.ShowLogin()}
                </HomeContainer>
            </div>
        );
    }
}

HomePage.contextTypes = {
    server: PropTypes.shape({
        socketService: PropTypes.component
    }),
    
    routerHelper: PropTypes.shape({
        redirect: PropTypes.component,
    })
};

export default HomePage;