import React from 'react';
import TextInput from '../TextInput/TextInput'
import { Redirect } from 'react-router-dom';
// import { PropTypes } from 'prop-types';

class PhoneInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            telephone: '',
            formIsValid: false
        }
    }
    onInput(e) {
        this.setState({ telephone: e.target.value });
    };
    onFormSubmit(e) {
        e.preventDefault();
        if (this.state.telephone === '' || this.state.telephone === undefined) {
            alert('Please enter a phone number');
            return false;
        }
        // updating value
        this.setState({ formIsValid: true});
    }
   
    render() {
        // If the state of the form is valid, go to the previous order page
        if (this.state.formIsValid) {
            return <Redirect to={{pathname: '/orders/' + this.state.telephone}} />
        }
        return (
            <div className="container container-narrow has-background">
                <h1 className="menu-item-title">ORDER HISTORY</h1>
                <form action="" method="get" className="form-container" onSubmit={(e) => this.onFormSubmit(e)}>
                    <label className="form-title">Enter your phone number:</label>
                    <TextInput
                        onChange={e => this.onInput(e)}
                        name="telephone"
                        value={this.state.telephone}
                        validate={val => !val ? 'Please provide a telephone number' : ''} />
                    <button type="submit" className="btn">SEARCH</button>
                </form>
            </div>
        )
    }
};

// PhoneInput.propTypes = {
//     telephone: PropTypes.shape({
//         telephone: PropTypes.string
//     })
// };

export default PhoneInput;