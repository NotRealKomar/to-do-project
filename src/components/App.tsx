import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { LoginState } from '../reducers/loginReducer'
import { Switch, Route } from 'react-router';
import { verifyAuth } from '../actions/loginActions';

import ProtectedRoute from './login/ProtectedRoute';
import Home from './Home';
import Login from './login/Login';

interface IProps {
  isAuthenticated: boolean;
  isVerifying: boolean;
  verifyAuth: () => void;
}

const App: React.FC<IProps> = (props) => {
    const { isAuthenticated, isVerifying, verifyAuth } = props;
    useEffect(() => {
      verifyAuth();
    }, [ verifyAuth ]);

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
const mapStateToProps = (state: LoginState) => (
  {
    isAuthenticated: state.login.isAuthenticated,
    isVerifying: state.login.isVerifying
  }
)

export default connect(mapStateToProps, { verifyAuth })(App);