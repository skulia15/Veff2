import React from 'react';

// import { connect } from 'react-redux';

class Receipt extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="container has-background text-center">
                <h1 className="title">YOUR RECEIPT</h1>
                <p>Your pizza is going in the oven!</p>
            </div>
        )
    }
};

// const mapStateToProps = (state) => {
//     return {
//         order: state.order
//     }
// }

// export default connect(mapStateToProps, { getOrder })(Receipt);
export default Receipt;
