import React, { useState, FormEvent } from 'react';
import { connect } from 'react-redux';
import { LoginState } from '../../reducers/loginReducer';
import { Redirect } from 'react-router';
import { Dispatch, bindActionCreators, ActionCreator } from 'redux';
import * as ActionCreators from '../../actions/loginActions';
import { IAction } from '../../actions/loginActions';
import '../../styles/login.scss';

interface IStateProps {
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  loginError: boolean;
}

interface IDispatchProps {
  loginUser: (email: string, password: string) => void;
}

type Props = IStateProps & IDispatchProps

const Login: React.FC<Props> = (props) => {
  const { loginUser, isAuthenticated, isLoggingIn, loginError } = props; 
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
    <div className="container">
      <div className="container__login">
        <div className="container__login-header">
          <h3>Login</h3>
        </div>
        <form onSubmit={handleOnSubmit}>
          <div className="container__login-input">
            <label htmlFor="EmailInput">Email</label>
            <input id="EmailInput" placeholder="example@dot.com" onChange={handleOnEmailChange}></input>
          </div>
          <div className="container__login-input">
            <label htmlFor="PasswordInput">Password</label>
            <input id="PasswordInput" type="password" placeholder="Password" onChange={handleOnPasswordChange}></input>
          </div>
          <button className="container__login-submit" type="submit">Login</button>
        </form>
        {isLoggingIn && <h3>Loading...</h3>}
        {loginError && <h3>Login failed.</h3>}
      </div>
    </div>
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
