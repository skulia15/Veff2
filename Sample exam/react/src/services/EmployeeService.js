
import { getByCriteria } from './common';
import fetch from 'isomorphic-fetch';

const EmployeeService = () => {
    return {
        getEmployees: (predicate) => {
            return getByCriteria('../../resources/employees.json', predicate, 'employees');
        }
    };
};

export default EmployeeService();