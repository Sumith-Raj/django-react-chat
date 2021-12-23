import { Fragment, useEffect } from 'react';
import { Router, Route, Switch, Redirect} from 'react-router-dom';
import { history } from './_helpers/history';
import { alertActions } from './_actions/alert.action';
import { LoginPage } from './LoginPage/LoginPage';
import { RegisterPage } from './RegisterPage/RegisterPage';
import { HomePage } from './HomePage/HomePage';
import { PrivateRoute } from './_components/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
            <div className="container">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/register" component={RegisterPage} />
                            <Redirect from="*" to="/pagenotfound" />
                        </Switch>
                    </Router>
                </div>
          
    );
}

export { App };


// class App extends React.Component{
//     constructor(props) {
//       super(props);

//       history.listen((location, action) =>{
//         this.props.clearAlerts()
//       });
//     }

// render() {
//   const { alert }= this.props;
//   return (
//     <div className="jumbotron">
//     <div className="container">
//         <div className="col-sm-8 col-sm-offset-2">
//             {alert.message &&
//               <div className={`alert ${alert.type}`}>{alert.message}</div>
//             }
//             <Router history={history}>
//               <Switch>
//                 <PrivateRoute exact path="/" component={HomePage} />
//                 <Route path="/login" component={LoginPage}/>
//                 <Route path="/register" component={RegisterPage} />
//                 <Redirect from="*" to="/" />
//               </Switch>
//             </Router>
//         </div>
//     </div>
//     </div>
//   );
//  }
// }

// function mapState(state) {
//   const { alert } = state;
//   return { alert };
// }

// const actionCreators = {
//   clearAlerts: alertActions.clear
// };

// const connectedApp = connect(mapState, actionCreators)(App);
// export { connectedApp as App };












// import './App.css';
// import { useEffect, useState } from "react"

// function App() {
//   const[details,setdetails] = useState()

//   useEffect(() => {
//     fetch('http://localhost:8000/myapp/wel/').then((response) =>
//      response.json().then((data) =>{
//       setdetails(data)
//       console.log("h",data)
//     }))
//   }, [])
//   return (
//     <div className="App">
//       <header className="App-header">
//       <div>
//       <div>
//             {details.map((detail, id) =>  (
//             <div key={id}>
//             <div >
//                   <div >
//                         <h1>{detail.detail} </h1>
//                         <footer >--- by
//                         <cite title="Source Title">
//                         {detail.name}</cite>
//                         </footer>
//                   </div>
//             </div>
//             </div>
//             )
//         )}
//       </div>
//       </div>
//       </header>
//     </div>
//   );
// }

// export default App;
