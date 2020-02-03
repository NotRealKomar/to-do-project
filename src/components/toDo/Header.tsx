import React from 'react';
import '../../styles/header.scss';
import '../../styles/fontawesome/fontawesome.scss';
import { Dispatch, ActionCreator, bindActionCreators } from 'redux';
import * as ActionCreators from '../../actions/loginActions';
import { IAction } from '../../actions/loginActions';
import { connect } from 'react-redux';
import { LoginState } from '../../reducers/loginReducer';

interface IDispatchProps {
	logoutUser: () => void;
}

interface IStateProps {
	isLoggingOut: boolean;
	logoutError: boolean;
}

type Props = IDispatchProps & IStateProps

const Header: React.FC<Props> = (props) => {
	const { logoutUser } = props;

	return (
		<header className="header header_light">
			<h4 className="header__content">
					[<i className="fas fa-clipboard-list"></i>]
					To-Dooooooooo...ooo
			</h4>

			<button className="header__button-logout" onClick={logoutUser}>Logout</button>
		</header>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
