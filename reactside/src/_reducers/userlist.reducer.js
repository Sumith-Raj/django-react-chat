import { userConstants } from '../_constants/user.constants';

export function userlist(state = {}, action) {
    switch (action.type) {
        case userConstants.GETUSERLIST_REQUEST:
            return {
                loading: true
            };
        case userConstants.GETUSERLIST_SUCCESS:
            return {
                detail: action.userlist
            };
        case userConstants.GETUSERLIST_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}