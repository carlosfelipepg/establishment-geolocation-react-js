import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import Login from './views/authentication/login';
import Register from './views/authentication/register';
import App from './App';
import * as serviceWorker from './serviceWorker';
import history from './utils/history';

const Root = () => (
    <Router history={history}>
        <Switch>
            <Route exact path="/auth/login" component={Login} />
            <Redirect exact from="/" to="/auth/login" />
            <Route exact path="/auth/logout" render={() => {
                localStorage.clear();
                return (< Redirect exact to="auth/login" />)
            }} />
            <Route path="/auth/register" component={Register} />
            <PrivateRoute path="/app" component={App} />
        </Switch>
    </Router>
);
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem('token') ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/auth/login",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

ReactDOM.render(<Root />, document.getElementById("root"));
serviceWorker.unregister();
