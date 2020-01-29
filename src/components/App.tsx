import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { LoginState } from '../reducers/loginReducer';
import { Switch, Route } from 'react-router';
import * as ActionCreators from '../actions/loginActions';

import ProtectedRoute from './login/ProtectedRoute';
import Home from './Home';
import Login from './login/Login';
import { Dispatch, bindActionCreators, ActionCreator } from 'redux';

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
				component={Home}
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

const mapDispatchToProps: (dispatch: Dispatch, actions: ActionCreator<any>) => IDispatchProps = (dispatch, actions) => (
	bindActionCreators(ActionCreators, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
