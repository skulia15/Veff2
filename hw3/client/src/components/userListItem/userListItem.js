import React from 'react';



class UserListItem extends React.Component {
    constructor(props, ctx) {
        super(props,ctx);
        this.state = {
            isOp: false,
            nickname: this.props.info
        }
    }

    componentWillMount() { 
        this.setState({nickname: this.props.info});
    }



    render() {
        if(this.state.nickname) {
            return (
                <li className="list-group-item user-list-item">
                    <i className="fas fa-user icon icon-small"></i>
                    {this.state.nickname}
                    <button className="btn btn-warning" onClick={() => alert('Kicked')}>Kick</button>
                    <button className="btn btn-danger" onClick={() => alert('Banned')}>Ban</button>    
                    <button className="btn btn-primary" onClick={() => this.makeUserOp}>Make OP</button>              
                                    
                </li>
            );
        } else {
            return(
                <div>What a terrible error this is</div>
            );
        }
    }
}

export default UserListItem;