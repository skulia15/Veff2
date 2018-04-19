import React from 'react';
import { connect } from 'react-redux';

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer-section image-section">
                    <p>this is a footer</p>
                </div>
            </footer>
        );
    };
};

const mapStateToProps = (state) => {
    return { user: state.user };
};

export default connect(mapStateToProps)(Footer);