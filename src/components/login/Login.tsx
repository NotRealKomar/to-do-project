import React, { useState, FormEvent } from 'react';
import { connect } from 'react-redux';
import { LoginState } from '../../reducers/loginReducer';
import { Redirect } from 'react-router';
import { Dispatch, bindActionCreators, ActionCreator } from 'redux';
import * as ActionCreators from '../../actions/loginActions';
import { IAction } from '../../actions/loginActions';

interface IStateProps {
	isAuthenticated: boolean;
}

interface IDispatchProps {
	loginUser: (email: string, password: string) => void;
}

type Props = IStateProps & IDispatchProps

const Login: React.FC<Props> = (props) => {
	const { loginUser, isAuthenticated } = props; 
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleOnEmailChange: (event: FormEvent<HTMLInputElement>) => void = (event) => {
		setEmail(event.currentTarget.value);
	};

	const handleOnPasswordChange: (event: FormEvent<HTMLInputElement>) => void = (event) => {
		setPassword(event.currentTarget.value);
	};

	const handleOnSubmit: (event: FormEvent) => void = (event) => {
		event.preventDefault();

		loginUser(email, password);
	};

	if (isAuthenticated) {
		return <Redirect to="/" />;
	} 
	return (
		<form onSubmit={handleOnSubmit}>
			<input placeholder="Email" onChange={handleOnEmailChange}></input>
			<input placeholder="Password" onChange={handleOnPasswordChange}></input>
			<button type="submit">submit</button>
		</form>
	);
};

const mapStateToProps: (state: LoginState) => IStateProps = (state) => (
	{
		isLoggingIn: state.login.isLoggingIn,
		loginError: state.login.loginError,
		isAuthenticated: state.login.isAuthenticated
	}
);

const mapDispatchToProps: (dispatch: Dispatch, actions: ActionCreator<IAction>) => IDispatchProps = (dispatch, actions) => (
	bindActionCreators(ActionCreators, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
