import initialState from './initialState'
import { REQUEST_CONTENT, REQUEST_DETAILED, GET_CONTENT, GET_DETAILED } from "../actions/actionTypes";

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_CONTENT:
            return { ...state, searchLoading: true };
        case GET_CONTENT:
            return { ...state, content: action.payload, searchLoading: false };
        case REQUEST_DETAILED:
            return { ...state, detailedLoading: true };
        case GET_DETAILED:
            return { ...state, detailed: action.payload, detailedLoading: false };
        default:
            return state;
    }
};

export default reducer;