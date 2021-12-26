import { userConstants } from "../_constants/user.constants";
import { userService } from "../_services/user.service";
import { alertActions } from './alert.action';
import { history } from '../_helpers/history';

export const userActions = {
    login,
    logout,
    register,
    getUserChat,
    postUserChat,
    getUserList
    // delete: _delete
};

function login(email, password, from) {
    return dispatch => {
        dispatch(request({email}));

        userService.login(email, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push(from);
                    // window.location.reload();
                    
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    };
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getUserList() {
    return dispatch => {
        dispatch(request());

        userService.getUserList()
            .then(
                userlist => dispatch(success(userlist)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETUSERLIST_REQUEST } }
    function success(userlist) { return { type: userConstants.GETUSERLIST_SUCCESS, userlist } }
    function failure(error) { return { type: userConstants.GETUSERLIST_FAILURE, error } }
}

function getUserChat(senduser,replieduser) {
    return dispatch => {
        dispatch(request(senduser,replieduser));

        userService.getUserChat(senduser,replieduser)
            .then(
                user => dispatch(success(user)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETUSER_REQUEST } }
    function success(user) { return { type: userConstants.GETUSER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GETUSER_FAILURE, error } }
}

function postUserChat(chatinput) {
    return dispatch => {
        dispatch(request(chatinput));

        userService.postUserChat(chatinput)
            .then(
                userchat => dispatch(success(userchat)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.POSTUSERCHAT_REQUEST } }
    function success(userchat) { return { type: userConstants.POSTUSERCHAT_SUCCESS, userchat } }
    function failure(error) { return { type: userConstants.POSTUSERCHAT_FAILURE, error } }
}