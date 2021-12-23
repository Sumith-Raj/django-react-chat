import { urlConstant } from "../_constants/url.constants";
import { authHeader } from '../_helpers/auth-header';

export const userService = {
    login,
    logout,
    register,
    getUserChat,
    postUserChat,
    getUserList
    // getById,
    // update,
    // delete: _deletereturn 
};

function login(email, password) {
    const data = {
        user: { email, password }
    };

    return fetch(urlConstant.LOGIN_URL, 
        { method: 'POST', body: JSON.stringify(data),
         headers: { 'Content-Type': 'application/json' } })
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user1', JSON.stringify(user));
            return user;
        })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user1');
}

function register(userinput) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify({user:userinput}),
        headers: { 'Content-Type': 'application/json' },
    };
    console.log('regis',requestOptions.body)

    return fetch(urlConstant.REGISTER_URL, requestOptions).then(handleResponse);
}
function getUserChat(senduser,replieduser) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${urlConstant.USER_CHAT_DATA}/${senduser}/${replieduser}`, requestOptions).then(handleResponse);
}


function postUserChat(chatinput) {
    
    return fetch(`${urlConstant.USER_CHAT_DATA}/${chatinput.senduser}/${chatinput.replieduser}`, {
        method: 'POST',
        body: JSON.stringify({message:chatinput}),
        headers: {'Content-Type': 'application/json',...authHeader()}
        
    }).then(handleResponse);
}

function getUserList() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(urlConstant.USER_LIST, requestOptions).then(handleResponse);
}



function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                // location.reload(true);

            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}