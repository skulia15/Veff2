import React from 'react';
import PropTypes from 'prop-types';
import MainContainer from '../mainContainer/mainContainer';


class CreateRoomPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            newRoomName: '',
            newRoomTopic: '',
            createRoomSuccess: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeRoomName = this.handleChangeRoomName.bind(this);
        this.handleChangeTopic = this.handleChangeTopic.bind(this);        
        this.socketService = this.context.server.socketService;
        this.redirect = this.context.routerHelper.redirect;
    }

    handleChangeRoomName(event) {
        this.setState({newRoomName: event.target.value});
    }

    handleChangeTopic(event) {
        this.setState({newRoomTopic: event.target.value});
    }

    handleSubmit(event) {
       
        console.log('creating room with name: ' + this.state.roomName);
        let roomName = this.state.newRoomName;
        let topic = this.state.newRoomTopic;
        // Joins 
        event.preventDefault();
        this.socketService.createRoom(roomName, topic, (success) => {
            if(success) {
                this.setState({createRoomSuccess: success})
            }
        });
        
    }

    ShowCreateForm() {
        if(this.state.createRoomSuccess === false) {
            return(
                <div className="form-center">
                    <h1 className="title">Create Room</h1>
                    <div className="create-room-input ">
                        <form className="create-room-form">
                            <div className="form-group">
                                <label>
                                    Room Name
                                </label>
                                <input type="text" className="form-control" value={this.state.newRoomName} onChange={this.handleChangeRoomName} />
                            </div>
                            <div className="form-group">                            
                                <label>
                                    Topic
                                </label>
                                <input type="text" className="form-control" value={this.state.newRoomTopic} onChange={this.handleChangeTopic} />
                            </div>
                            <button onClick={this.handleSubmit} className="btn btn-primary btn-right">Create Room</button>
                        </form>
                    </div>
                </div>
            )
        } else {
            return(
                <this.redirect to={{
                    pathname: '/lobby'
                }} />
            )
        }
    }
    
    render() {
        return (
            <MainContainer>
                {this.ShowCreateForm()}
            </MainContainer>
        )
    }

}

CreateRoomPage.contextTypes = {
    server: PropTypes.shape({
        socketService: PropTypes.component
    }),
    
    routerHelper: PropTypes.shape({
        redirect: PropTypes.component,
    })
};

export default CreateRoomPage;