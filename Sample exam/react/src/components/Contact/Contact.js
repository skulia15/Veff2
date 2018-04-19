import React from 'react';
import TextInput from '../TextInput/TextInput'
import { connect } from 'react-redux';
import { getEmployees } from '../../actions/EmployeeActions'
import { RemoteSelectItem } from '../RemoteSelectItem/RemoteSelectItem'


const initialState = {
    fields: {
        name: '',
        email: '',
        employee: 'None',
        subject: '',
        message: '',
        formIsValid: false
    }
};

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState
    }
    componentDidMount() {
        const { getEmployees } = this.props;
        getEmployees();
    }

    onInput(e) {
        let fields = Object.assign({}, this.state.fields);
        fields[e.target.name] = e.target.value;
        this.setState({ fields });
        console.log(this.state.fields);
    };

    render() {

        const { name, email, employee, subject, formIsValid } = this.state.fields;
        const { localEmpl } = this.props;
        // let empls = getEmployees();

        if(localEmpl){
            return (
                <div className="container container-narrow has-background">
                    <h1 className="menu-item-title">Contact</h1>
                    <form action="" method="get" className="form-container" onSubmit={(e) => this.onFormSubmit(e)}>
                        <div className="form-container">
                            <label>Name</label>
                            <TextInput
                                onChange={e => this.onInput(e)}
                                name="name"
                                value={name}
                                validate={val => !val ? 'Name is required' : ''} />
                        </div>
                        <div className="form-container">
                            <label className="form-title">Email:</label>
                            <TextInput
                                onChange={e => this.onInput(e)}
                                name="email"
                                value={email}
                                validate={val => !val ? 'Email is required' : ''} />
                        </div>
                        <div className="form-container">
                            <label className="form-title">Employee:</label>
                            <select name="employee" onChange={e => this.onInput(e)}>
                                <option value='None'> </option>
                                {localEmpl.map((emplItem) => (<option key={emplItem.id} value={emplItem} >{emplItem.name}</option>))}
                            </select>
                        </div>
                        <div className="form-container">
                            <label className="form-title">Subject:</label>
                            <TextInput
                                onChange={e => this.onInput(e)}
                                name="subject"
                                value={subject}
                                validate={val => !val ? 'Subject is required' : ''} />
                        </div>
                        <div className="form-container">
                            <label className="form-title">Message:</label>
                            <div>
                                <textarea rows="4" cols="50"
                                    onChange={e => this.onInput(e)}>
                                </textarea>
                            </div>
                        </div>
                        <button type="submit" className="btn" disabled={!name || !email || !subject || employee == 'None'}>Submit</button>
                    </form>
                </div>
            )
        } 
        else{
            return(
                <div>
                    <h2>Loading</h2>
                </div>
            );
        }
        
    }
};

const mapStateToProps = ({ employee }) => {
    return { localEmpl : employee };
}

export default connect(mapStateToProps, { getEmployees })(Contact);
//export default Contact;
