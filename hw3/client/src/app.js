import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/site';
import PropTypes from 'prop-types';
import Container from './components/container/container';
import SocketService from './services/socketService'

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    getChildContext() {
        return {
            server : {
                socketService: SocketService
            }
        }
    }
    
    render() {
        return (
            <Container>
                <h2>
                    I am a title
                </h2>
            </Container>
        );
    }
}

App.childContextTypes = {
    server: PropTypes.shape({
        socketService: PropTypes.component
    })
}

ReactDOM.render(<App />, document.getElementById('app'));
