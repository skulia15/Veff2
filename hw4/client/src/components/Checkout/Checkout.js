import React from 'react';
import TextInput from '../TextInput/TextInput'
import { Redirect } from 'react-router-dom';
import { createCustomer } from '../../actions/customerActions';
import { connect } from 'react-redux';

const initialState = {
    fields: {
        deliveryMethod: 'pickup',
        name: '',
        address: '',
        city: '',
        telephone: '',
        postalCode: '',
        formIsValid: false
    }
};

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState
    }
    onInput(e) {
        let fields = Object.assign({}, this.state.fields);
        fields[e.target.name] = e.target.value;
        this.setState({ fields });
    };
    onFormSubmit(e) {
        const { name, telephone, address, city, postalCode, deliveryMethod } = this.state.fields;
        if (deliveryMethod === 'pickup') {
            if (name === '' || telephone === '') {
                alert('Please fill out all required fields');
                return false;
            }
        } else if (deliveryMethod === 'delivery') {
            if (name === '' || telephone === '' || address === '' || city === '' || postalCode === '') {
                alert('Please fill out all required fields');
                return false;
            }
        }
        // creating copy of object
        var fields = Object.assign({}, this.state.fields);
        // updating value
        fields.formIsValid = true;
        this.setState({fields});
        const { createCustomer } = this.props;
        let newCustomer = { name: name, address: address, city: city, telephone: telephone, postalCode: postalCode, deliveryMethod: deliveryMethod };
        createCustomer(newCustomer);
        e.preventDefault();
    }
    
    showDeliveryFields() {
        const { deliveryMethod, address, city, postalCode } = this.state.fields;
        if (deliveryMethod === 'delivery') {
            return (
                <div>
                    <label className="form-title">Address:</label>
                    <TextInput
                        onChange={e => this.onInput(e)}
                        name="address"
                        value={address}
                        validate={val => !val ? 'Please provide a valid address' : ''} />
                    <label className="form-title">City:</label>
                    <TextInput
                        onChange={e => this.onInput(e)}
                        name="city"
                        value={city}
                        validate={val => !val ? 'Please provide a valid city' : ''} />
                    <label className="form-title">Postal Code:</label>
                    <TextInput
                        onChange={e => this.onInput(e)}
                        name="postalCode"
                        value={postalCode}
                        validate={val => !val ? 'Please provide a valid postal code' : ''} />
                </div>
            );
        }
    }
    render() {
        const { name, telephone, formIsValid } = this.state.fields;
        // If the state of the form is valid, go to the review page
        if (formIsValid) {
            return <Redirect to={{pathname: '/review'}} />
        }
        return (
            <div className="container has-background">
                <h1 className="text-center title">CHECKOUT</h1>
                <form action="" method="get" className="form-container" onSubmit={(e) => this.onFormSubmit(e)}>
                    <div className="form-container">
                        <label className="form-title">Delivery Method:</label>
                        <select name="deliveryMethod" onChange={e => this.onInput(e)}>
                            <option value="pickup">Pickup</option>
                            <option value="delivery">Delivery</option>
                        </select>
                    </div>
                    <div className="form-container">
                        <label className="form-title">Name:</label>
                        <TextInput
                            onChange={e => this.onInput(e)}
                            name="name"
                            value={name}
                            validate={val => !val ? 'Name is required' : ''} />
                        <label className="form-title">Telephone:</label>
                        <TextInput
                            onChange={e => this.onInput(e)}
                            name="telephone"
                            value={telephone}
                            validate={val => !val ? 'Please provide a telephone number' : ''} />
                        {this.showDeliveryFields()}
                    </div>

                    <button type="submit" className="btn">CONFIRM</button>
                </form>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps, { createCustomer })(Checkout);