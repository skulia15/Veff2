import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/site';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Redirect} from 'react-router';
import SocketService from './services/socketService';
import HomePage from './components/homePage/homePage';
import LobbyPage from './components/lobbyPage/lobbyPage';
import CreateRoomPage from './components/createRoomPage/createRoomPage';


class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        // Connect to the server        
        SocketService.connect();
    }

    getChildContext() {
        return {
            routerHelper: {
                redirect: Redirect
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
                <Route exact path='/lobby' component={LobbyPage} />
                <Route exact path='/createRoom' component={CreateRoomPage} />
                <div> 
                    <div>404 not found</div>
                </div>
            </Switch>
        )
    }
}

App.childContextTypes = {
    server: PropTypes.shape({
        socketService: PropTypes.component
    }),
    
    routerHelper: PropTypes.shape({
        redirect: PropTypes.component,

    })
}

ReactDOM.render(<Router><App /></Router>, document.getElementById('app'));
