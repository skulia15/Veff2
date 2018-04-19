// import { GET_EMPLOYEES } from '../constants/EmployeeConstants';
// import  EmployeeService from '../services/EmployeeService';
// import fetch from 'isomorphic-fetch';

// // export const getEmployees = () => {
// //     return dispatch => {
// //         EmployeeService.getEmployees().then(data => {
// //             dispatch(getEmployeesSuccess(data));
// //         });
// //     };
// // };
// export const getEmployees = () => {
//     return dispatch => EmployeeService.getEmployees()
//         .then(data => dispatch(getEmployeesSuccess(data)));
// };

// const getEmployeesSuccess = (employees) => {
//     return {
//         type: GET_EMPLOYEES,
//         payload: employees
//     };
// };

import { GET_EMPLOYEES } from '../constants/EmployeeConstants';
// import EmployeeService from '../services/EmployeeService';
// import fetch from 'isomorphic-fetch';

export const getEmployees = () => {
    
  return {
    type: GET_EMPLOYEES,
    payload: [
      {
        id: 1,
        name: 'Aragorn',
        jobtitle: 'Sword Wielder',
        image:
          'https://vignette.wikia.nocookie.net/lotr/images/b/b6/Aragorn_profile.jpg/revision/latest/scale-to-width-down/333?cb=20170121121423',
        started: 'Some time ago'
      },
      {
        id: 2,
        name: 'Legolas',
        jobtitle: 'Archer',
        image:
          'https://vignette.wikia.nocookie.net/lotr/images/3/33/Legolas_-_in_Two_Towers.PNG/revision/latest/scale-to-width-down/350?cb=20120916035151',
        started: 'A long time ago'
      },
      {
        id: 3,
        name: 'Gimli',
        jobtitle: 'Lumberjack',
        image:
          'https://vignette.wikia.nocookie.net/lotr/images/e/ec/Gimli_-_FOTR.png/revision/latest/scale-to-width-down/350?cb=20121008105956',
        started: 'Today'
      },
      {
        id: 4,
        name: 'Boromir',
        jobtitle: 'Fighter',
        image:
          'https://vignette.wikia.nocookie.net/lotr/images/b/b4/Seanbean_boromir.jpg/revision/latest/scale-to-width-down/343?cb=20110327195115',
        started: 'Too late'
      },
      {
        id: 5,
        name: 'Frodo',
        jobtitle: 'Ringbearer',
        image:
          'https://vignette.wikia.nocookie.net/lotr/images/5/54/Untitledjk.png/revision/latest/scale-to-width-down/350?cb=20130313174543',
        started: 'First day'
      },
      {
        id: 6,
        name: 'Gandalf',
        jobtitle: 'Wizard',
        image:
          'https://vignette.wikia.nocookie.net/lotr/images/e/e7/Gandalf_the_Grey.jpg/revision/latest/scale-to-width-down/350?cb=20121110131754',
        started: 'When the world was made'
      }
    ]
  };
};

// const getEmployeesSuccess = (employees) => {
//     return {
//         type: GET_EMPLOYEES,
//         payload: employees
//     };
// };
