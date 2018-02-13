import React from 'react';
import PropTypes from 'prop-types';


class RoomContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            currentRoom: ''
        }

        this.socketService = this.context.server.socketService;

    }
    render() {
        return (
            <div className="container container-fluid room-container">
                <div className="row">
                    <div className="col-lg-6">

                        <h1>Room Name Here</h1>
                        {this.props.children}
                        <div class="form-group">
                            <label for="message">Message:</label>
                            <textarea class="form-control" rows="5" id="message"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RoomContainer.contextTypes = {
    server: PropTypes.shape({
        socketService: PropTypes.component
    }),
    
    routerHelper: PropTypes.shape({
        history: PropTypes.component,
    })
};

export default RoomContainer;