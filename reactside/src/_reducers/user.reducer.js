import { userConstants } from '../_constants/user.constants';

export function user(state = {}, action) {
    switch (action.type) {
        // case userConstants.GETUSER_REQUEST:
        //     return {
        //         loading: true
        //     };
        case userConstants.GETUSER_SUCCESS:
            return {
                detail: action.user
            };
        case userConstants.GETUSER_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}