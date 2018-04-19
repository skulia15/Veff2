// import { GET_EMPLOYEES } from '../constants/EmployeeConstants';

// const EmployeeReducer = (state = [], action) => {
    
//     switch (action.type) {
//         case GET_EMPLOYEES:
//             return action.payload;
//         default:
//             return state;
//     }
// };

// export default EmployeeReducer;


import { GET_EMPLOYEES } from '../constants/EmployeeConstants';

const employeeReducer = (state = [], action) => {
    switch (action.type) {
        case GET_EMPLOYEES:
            return action.payload;
        default: return state;
    }
};

export default employeeReducer;