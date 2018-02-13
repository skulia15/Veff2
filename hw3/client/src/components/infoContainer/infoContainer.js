import React from 'react';

class InfoContainer extends React.Component {
    render() {
        return (
            <div className="container container-fluid info-container ">
                <div className="row">
                    <div className="col-lg-6">
                        {this.props.children}
                    </div>
                </div>
            </div>
            
        );
    }
}

export default InfoContainer;