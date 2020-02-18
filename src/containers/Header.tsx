import React, { useEffect } from 'react';
import { Dispatch, ActionCreator, bindActionCreators } from 'redux';
import * as ActionCreators from '../actions/loginActions';
import { IAction } from '../actions/loginActions';
import { connect } from 'react-redux';
import { LoginState } from '../reducers/loginReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

interface IDispatchProps {
  logoutUser: () => void;
}

interface IStateProps {
  isLoggingOut: boolean;
  logoutError: boolean;
  isAuthenticated: boolean;
}

type Props = IDispatchProps & IStateProps

const Header: React.FC<Props> = (props) => {
  const { logoutUser, isAuthenticated } = props;

  return (
    <header className="header header_light">
      <h4 className="header__content">
          [<FontAwesomeIcon icon={faClipboardList} />]
          To-Dooooooooo...ooo
      </h4>

      {isAuthenticated && (
        <button className="header__button-logout" onClick={logoutUser}>Logout</button>
      )}
    </header>
  );
};

const mapStateToProps: (state: LoginState) => IStateProps = (state) => (
  {
    isLoggingOut: state.login.isLoggingOut,
    logoutError: state.login.logoutError,
    isAuthenticated: state.login.isAuthenticated
  }
);

const mapDispatchToProps: (dispatch: Dispatch, actions: ActionCreator<IAction>) => IDispatchProps = (dispatch, actions) => (
  bindActionCreators(ActionCreators, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
