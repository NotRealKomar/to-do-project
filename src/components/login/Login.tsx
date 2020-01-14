import React, { useState } from 'react'
import { loginUser } from "../../actions/loginActions";
import { connect } from 'react-redux';
import { LoginState } from '../../reducers/loginReducer';
import { Redirect } from 'react-router';

function Login(props: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleOnEmailChange = (event: any) => {
        setEmail(event.target.value);
    }

    const handleOnPasswordChange = (event: any) => {
        setPassword(event.target.value);
    }

    const handleOnSubmit = (event: any) => {
        event.preventDefault();
        const { dispatch } = props;

        dispatch(loginUser(email, password));
    }

    if (props.isAuthenticated) {
        return <Redirect to="/" />;
    } else {
        return (
            <form onSubmit={handleOnSubmit}>
                <input placeholder="Email" onChange={handleOnEmailChange}></input>
                <input placeholder="Password" onChange={handleOnPasswordChange}></input>
                <button type="submit">submit</button>
            </form>
        )
    }
}

function mapStateToProps(state: LoginState) {
    return {
      isLoggingIn: state.login.isLoggingIn,
      loginError: state.login.loginError,
      isAuthenticated: state.login.isAuthenticated
    };
  }
  
  export default connect(mapStateToProps)(Login);
  