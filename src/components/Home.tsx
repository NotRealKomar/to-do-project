import React from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../actions/loginActions';
import { IAction } from '../actions/loginActions';
import { LoginState } from '../reducers/loginReducer';
import { Dispatch, bindActionCreators, ActionCreator } from 'redux';

import List from './toDo/List';

interface IDispatchProps {
	logoutUser: () => void;
}

interface IStateProps {
	isLoggingOut: boolean;
	logoutError: boolean;
}

type Props = IDispatchProps & IStateProps

const Home: React.FC<Props> = (props) => {
	const { isLoggingOut, logoutError, logoutUser } = props;

	const handleLogout = () => {
		logoutUser();
	};
	
	return (
		<div>
			<List />
			
			<button onClick={handleLogout}>Logout</button>
			{isLoggingOut && <p>Logging Out....</p>}
			{logoutError && <p>Error logging out</p>}
		</div>
	);
};

const mapStateToProps: (state: LoginState) => IStateProps = (state) => (
	{
		isLoggingOut: state.login.isLoggingOut,
		logoutError: state.login.logoutError
	}
);

const mapDispatchToProps: (dispatch: Dispatch, actions: ActionCreator<IAction>) => IDispatchProps = (dispatch, actions) => (
	bindActionCreators(ActionCreators, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
