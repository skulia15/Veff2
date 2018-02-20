import React from 'react';
import PropTypes from 'prop-types';
import MainContainer from '../mainContainer/mainContainer';

class CreateRoomModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            newRoomName: '',
            newRoomTopic: '',
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
        console.log('creating room with name: ' + this.state.newRoomName);
        let roomName = this.state.newRoomName;
        let topic = this.state.newRoomTopic;
        event.preventDefault();
        this.socketService.createRoom(roomName, topic, (success) => {
            if(success) {
                console.log('Created room');
                this.socketService.getRooms();
            }
        });
        let keys = Object.getOwnPropertyNames(this.props.rooms);        
        let indexOfJoinedRoom = keys.indexOf(roomName);
        let currentRoom = this.props.rooms[Object.keys(this.props.rooms)[indexOfJoinedRoom]];
        this.props.updateCurrentRoom(currentRoom, roomName, topic);
        // Close the modal
        this.props.onClose();
    }

    ShowCreateForm() {
        return(
            <div className="form-center">
                <h1 className="title">Create Room</h1>
                <div className="create-room-input ">
                    <form className="create-room-form">
                        <div className="form-group">
                            <label>
                                Room Name
                            </label>
                            <input type="text" className="form-control" value={this.state.newRoomName} onChange={this.handleChangeRoomName} autoFocus/>
                        </div>
                        <div className="form-group">                            
                            <label>
                                Topic
                            </label>
                            <input type="text" className="form-control" value={this.state.newRoomTopic} onChange={this.handleChangeTopic} />
                        </div>
                        <button onClick={this.handleSubmit} className="btn btn-primary btn-right">Create Room</button>
                        <button onClick={this.props.onClose} className="btn btn-danger btn-left">Cancel</button>                            
                    </form>
                </div>
            </div>
        )

    }

    render() {
    // Render nothing if the "show" prop is false
        if(!this.props.show) {
            // Hide modal
            return null;
        } else{
            // Show modal
            return (
                <div className="backdrop">
                    <div className="modal" id="createRoomModal">
                        <MainContainer>
                            {this.ShowCreateForm()}
                        </MainContainer>
    
                    </div>
                </div>
            );
        }        
    }
}

CreateRoomModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

CreateRoomModal.contextTypes = {
    server: PropTypes.shape({
        socketService: PropTypes.component
    }),
    
    routerHelper: PropTypes.shape({
        redirect: PropTypes.component,
    })
};
export default CreateRoomModal;