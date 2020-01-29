import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/loginActions';
import { LoginState } from '../reducers/loginReducer';

import List from './toDo/List';

interface IProps {
	logoutUser: () => void;
	isLoggingOut: boolean;
	logoutError: boolean;
}

const Home: React.FC<IProps> = (props) => {
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

const mapStateToProps = (state: LoginState) => (
	{
		isLoggingOut: state.login.isLoggingOut,
		logoutError: state.login.logoutError
	}
);

export default connect(mapStateToProps, { logoutUser })(Home);
