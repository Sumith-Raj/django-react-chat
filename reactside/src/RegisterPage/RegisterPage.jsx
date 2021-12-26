import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../_actions/user.actions';
import '../Styles/style.css'

function RegisterPage() {
    const [userinput, setUser] = useState({
        email: '',
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const registering = useSelector(state => state.registration.registering);
    const dispatch = useDispatch();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser(userinput => ({ ...userinput, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (userinput.email && userinput.username && userinput.password) {
            dispatch(userActions.register(userinput));
        }
    }

    return (
        <div className="container col-6 mt-5 p-4" id="box">
            <h3>Register</h3>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group pt-2">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" value={userinput.email} onChange={handleChange} className={'form-control' + (submitted && !userinput.email ? ' is-invalid' : '')} />
                    {submitted && !userinput.email &&
                        <div className="invalid-feedback">Email is required</div>
                    }
                </div>
                <div className="form-group pt-2">
                    <label className="form-label">Username</label>
                    <input type="text" name="username" value={userinput.username} onChange={handleChange} className={'form-control' + (submitted && !userinput.username ? ' is-invalid' : '')} />
                    {submitted && !userinput.username &&
                        <div className="invalid-feedback">Username is required</div>
                    }
                </div>
                <div className="form-group pt-2">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" value={userinput.password} onChange={handleChange} className={'form-control' + (submitted && !userinput.password ? ' is-invalid' : '')} />
                    {submitted && !userinput.password &&
                        <div className="invalid-feedback">Password is required</div>
                    }
                </div>
                <div className="col mt-4">
                    <button className="btn btn-primary">
                        {registering && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Register
                    </button>
                    <a href="/login" className="btn btn-link">Cancel</a>
                </div>
            </form>
        </div>
    );
}

export { RegisterPage };


// className RegisterPage extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             userinput: {
//                 username:'',
//                 password:''
//             },
//             submitted: false
//         };

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(event) {
//         const { name, value } = event.target;
//         const { userinput } = this.state;
//         this.setState({
//             userinput: {
//                 ...userinput,
//                 [name]: value
//             }
//         });
//     }
    
//     handleSubmit(event) {
//         event.preventDefault();

//         this.setState({ submitted: true });
//         const { userinput } = this.state;
//         if (userinput.username && userinput.password) {
//             this.props.register(userinput);
//         }
//     }

//     render() {
//         const { registering  } = this.props;
//         const { userinput, submitted } = this.state;
//         return (
//             <div className="col-md-6 col-md-offst-3">
//                 <h2>Register</h2>
//                 <form name="form" onSubmit={this.handleSubmit}>
//                     <div className={'form-group'+ (submitted && !userinput.username ? 'has-error':'')}>
//                         <label htmlFor="username">Username</label>
//                         <input type="text" className="form-control" name="username" value={userinput.username} onChange={this.handleChange} />
//                         {submitted && !userinput.username &&
//                             <div className="help-block">Username is required</div>
//                         }
//                     </div>
//                     <div className={'form-group' + (submitted && !userinput.password ? ' has-error' : '')}>
//                         <label htmlFor="password">Password</label>
//                         <input type="password" className="form-control" name="password" value={userinput.password} onChange={this.handleChange} />
//                         {submitted && !userinput.password &&
//                             <div className="help-block">Password is required</div>
//                         }
//                     </div>
//                     <div className="form-group">
//                         <button className="btn btn-primary">Register</button>
//                         {registering && 
//                             <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
//                         }
//                         <Link to="/login" className="btn btn-link">Cancel</Link>
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }

// function mapState(state) {
//     const { registering } = state.registration;
//     return { registering };
// }

// const actionCreators = {
//     register: userActions.register
// }

// const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
// export { connectedRegisterPage as RegisterPage };