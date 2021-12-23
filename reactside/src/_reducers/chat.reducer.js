import { userConstants } from '../_constants/user.constants';

export function userchat(state = {}, action) {
    switch (action.type) {
        case userConstants.POSTUSERCHAT_REQUEST:
            return {
                loading: true
            };
        // case userConstants.POSTUSERCHAT_SUCCESS:
        //     return {
                
        //     };
        case userConstants.POSTUSERCHAT_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}