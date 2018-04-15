import React from 'react';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            username: ''
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.socketService = this.context.server.socketService;
    }
    
    handleChange(event) {
        this.setState({username: event.target.value});
    }

    handleSubmit(event) {
        // Create a user with the provided nickname
        console.log('creating user with nickname: ' + this.state.username);
        let nickname = this.state.username;
        var thisProps = this.props;
        this.socketService.createUser(nickname).then((valid) => {
            if(valid) {
                thisProps.loginState(nickname);
            } else{
                alert('The Nickname ' + nickname + ' is already taken');
            }
        });

        event.preventDefault();
    }
    
    render() {
        return (
            <div className="login-input">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label className="title-info">
                            Choose a Nickname:
                        </label>
                        <input type="text" className="form-control" value={this.state.username} onChange={this.handleChange} autoFocus/>
                    </div>
                    <button type="submit" className="btn btn-primary">Enter</button>
                </form>
            </div>
        );
    }
}

LoginForm.contextTypes = {
    server: PropTypes.shape({
        socketService: PropTypes.component
    }),
    router: PropTypes.shape({
        redirect: PropTypes.component
    })
};

export default LoginForm;