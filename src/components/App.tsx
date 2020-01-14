import React from 'react'
import { connect } from 'react-redux';
import { LoginState } from '../reducers/loginReducer'
import { Switch, Route } from 'react-router';

import ProtectedRoute from './login/ProtectedRoute';
import Home from './Home';
import Login from './login/Login';

function App(props: any) {
    const { isAuthenticated, isVerifying } = props;
    return (
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          component={Home}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
        />
        <Route path="/login" component={Login} />
      </Switch>
    );
  }
function mapStateToProps(state: LoginState) {
    return {
        isAuthenticated: state.login.isAuthenticated,
        isVerifying: state.login.isVerifying
    };
}
export default connect(mapStateToProps)(App);