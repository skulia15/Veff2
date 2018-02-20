import React from 'react';
import PropTypes from 'prop-types';
import MainContainer from '../mainContainer/mainContainer';

class DisplayPrivateMessageModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            receivedMsgFrom: this.props.receivedMsgFrom,
            receivedMsg: this.props.receivedMsg
        }

        this.handleClose = this.handleClose.bind(this);       
        this.socketService = this.context.server.socketService;
        this.redirect = this.context.routerHelper.redirect;
    }

    componentWillReceiveProps() {
        this.setState({receivedMsg: this.props.receivedMsg});
        this.setState({receivedMsgFrom: this.props.receivedMsgFrom});
    }

    handleClose(event) {
        event.preventDefault();
        this.props.onClose();
    }

    ShowReceivedMessage() {
        return(
            <div className="form-center">
                <h1 className="title">You received a message from {this.props.receivedMsgFrom}</h1>
                <div className="create-room-input ">
                    <form className="create-room-form">
                        <div className="form-group">
                            <h3>{this.props.receivedMsg}</h3>
                        </div>
                        <button onClick={this.props.onClose} className="btn btn-primary btn-right">Done</button>                            
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
        } else {
            // Show modal
            if(this.props.receivedMsg && this.props.receivedMsgFrom) {
                return (
                    <div className="backdrop">
                        <div className="modal" id="display-private-message-modal">
                            <MainContainer>
                                {this.ShowReceivedMessage()}
                            </MainContainer>
                        </div>
                    </div>
                );
            } else {
                console.log('in Error');
                console.log('received msg in error:');
                console.log(this.props.receivedMsg);
                console.log('received from in error:');            
                console.log(this.props.receivedMsgFrom);
                return(
                    <div>Error receiving message</div>
                )
            }
        }        
    }
}

DisplayPrivateMessageModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

DisplayPrivateMessageModal.contextTypes = {
    server: PropTypes.shape({
        socketService: PropTypes.component
    }),
    
    routerHelper: PropTypes.shape({
        redirect: PropTypes.component,
    })
};
export default DisplayPrivateMessageModal;