import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { LoginState } from '../reducers/loginReducer';
import { Switch, Route } from 'react-router';
import * as ActionCreators from '../actions/loginActions';
import { IAction } from '../actions/loginActions';
import { Dispatch, bindActionCreators, ActionCreator } from 'redux';

import ProtectedRoute from '../components/login/ProtectedRoute';
import List from './login/List';
import Login from './login/Login';

interface IStateProps {
  isAuthenticated: boolean;
  isVerifying: boolean;
}

interface IDispatchProps {
  verifyAuth: () => void;
}

type Props = IStateProps & IDispatchProps

const App: React.FC<Props> = (props) => {
  const { isAuthenticated, isVerifying, verifyAuth } = props;
  useEffect(() => {
    verifyAuth();
  }, [ verifyAuth ]);

  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={List}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path="/login" component={Login} />
    </Switch>
  );
};

const mapStateToProps: (state: LoginState) => IStateProps = (state) => (
  {
    isAuthenticated: state.login.isAuthenticated,
    isVerifying: state.login.isVerifying
  }
);

const mapDispatchToProps: (dispatch: Dispatch, actions: ActionCreator<IAction>) => IDispatchProps = (dispatch, actions) => (
  bindActionCreators(ActionCreators, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
