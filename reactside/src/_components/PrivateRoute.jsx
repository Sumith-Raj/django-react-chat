import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, redirectTo }) {
    return (
        localStorage.getItem('user1')
            ? children
            :  <Navigate to={redirectTo} />)
}

export { PrivateRoute };

// export const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => (
//         localStorage.getItem('user1')
//             ? <Component {...props} />
//             : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
//     )} />
// )