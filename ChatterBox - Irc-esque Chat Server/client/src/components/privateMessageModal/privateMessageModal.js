import React from 'react';
import PropTypes from 'prop-types';
import MainContainer from '../mainContainer/mainContainer';

class CreateRoomModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            messageContent: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);        
        this.socketService = this.context.server.socketService;
        this.redirect = this.context.routerHelper.redirect;
    }

    handleChange(event) {
        this.setState({messageContent: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.socketService.sendPrivateMessage(this.props.sendTo, this.state.messageContent);
        // Close the modal
        this.props.onClose();
    }

    ShowSendMessageForm() {
        return(
            <div className="form-center">
                <h2 className="title">Send a private message to {this.props.sendTo}</h2>
                <div className="create-room-input ">
                    <form className="create-room-form">
                        <div className="form-group">
                            <label>Message:</label>
                            <textarea className="form-control" rows="3" id="message" onChange={this.handleChange} autoFocus></textarea>
                        </div>
                        <button onClick={this.handleSubmit} className="btn btn-primary btn-right">Send Message</button>
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
                    <div className="modal" id="privateMessageModal">
                        <MainContainer>
                            {this.ShowSendMessageForm()}
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