import React from 'react';
import { connect } from 'react-redux';
import { getEmployees } from '../../actions/EmployeeActions';
import ListView from '../ListViewEmployees/ListViewEmployees';
import EmployeeItem from '../EmployeeItem/EmployeeItem';

class Employee extends React.Component {
    componentDidMount() {
        const { getEmployees } = this.props;
        getEmployees();
    }

    render() {
        const { localEmpl } = this.props;
        if (localEmpl) {
            return (
                <div className="menu-container">
                    <ListView>
                        {localEmpl.map((employeeItem) => (<EmployeeItem key={employeeItem.id}  employee={employeeItem} />))}
                    </ListView>
                </div>
            );
        } else {
            return (
                <p>Waiting for employees</p>
            );
        }
    };
};

const mapStateToProps = ({ employee }) => {
    return { localEmpl : employee };
}

export default connect(mapStateToProps, { getEmployees })(Employee);