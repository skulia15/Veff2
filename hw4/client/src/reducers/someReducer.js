import { DO_SOMETHING } from '../constants/constants';

const someReducer = (state = {}, action) => {
    switch (action.type) {
        case DO_SOMETHING:
            const { something } = action.payload;
            return Object.assign({}, state, { something });
        default: return state;
    }
};

export default someReducer;