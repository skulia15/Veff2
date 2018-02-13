import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


class CreateRoomPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            roomName: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.socketService = this.context.server.socketService;
    }

    handleChange(event) {
        this.setState({roomName: event.target.value});
    }

    handleSubmit(event) {
        // Create a user with the provided nickname
        console.log('creating room with name: ' + this.state.roomName);
        let roomName = this.state.username;
        // Joins 
        this.socketService.joinRoom(roomName).then(function(success) {
            if(success) {
                // Redirect here
                alert('Your Nickname is ' + nickname);
            } else{
                alert('The Nickname ' + nickname + ' is already taken');
            }
        });
        //Validate
        //route to lobby
        

        event.preventDefault();
    }
    
    render() {
        return (
            <Container>
                <h1>Create Room</h1>
                <div className="create-room-input">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>
                                Room Name
                                <input type="text" className="form-control" value={this.state.username} onChange={this.handleChange} />
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary">Create Room</button>
                    </form>
                </div>
                <Link to="/lobby" className="btn btn-primary">Lobby</Link>
            </Container>
        );
    }
}

CreateRoomPage.contextTypes = {
    server: PropTypes.shape({
        socketService: PropTypes.component
    }),
    
    routerHelper: PropTypes.shape({
        history: PropTypes.component,
    })
};

export default CreateRoomPage;