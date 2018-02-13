import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/site';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import SocketService from './services/socketService';
import HomePage from './components/homePage/homePage';
import LobbyPage from './components/lobbyPage/lobbyPage';
import CreateRoomPage from './components/createRoomPage/createRoomPage';


class App extends React.Component {
    constructor(props) {
        super(props);
        // Connect to the server        
        SocketService.connect();
    }

    getChildContext() {
        return {
            routerHelper: {
                history: Redirect
            }, 
            server: {
                socketService: SocketService
            }
        }
    }
    
    render() {
        return (
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/lobby' component={LobbyPage} />
                <Route path='/createRoom' component={CreateRoomPage} />
                <Route render={({location}) => (
                    <div> 
                        <div>404 not found</div>
                        <div>{location.pathname} was not found! </div>
                    </div>
                )}/>
            </Switch>
        );
    }
}

App.childContextTypes = {
    server: PropTypes.shape({
        socketService: PropTypes.component
    }),
    
    routerHelper: PropTypes.shape({
        history: PropTypes.component
    })
}

ReactDOM.render(<Router><App /></Router>, document.getElementById('app'))