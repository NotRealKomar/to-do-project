import React, { useState, FormEvent } from 'react'
import { loginUser } from "../../actions/loginActions";
import { connect } from 'react-redux';
import { LoginState } from '../../reducers/loginReducer';
import { Redirect } from 'react-router';

interface IProps {
    loginUser: (email: string, password: string) => void;
    isAuthenticated: boolean;
}

const Login: React.FC<IProps> = (props) => {
    const { loginUser, isAuthenticated } = props; 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleOnEmailChange: (event: FormEvent<HTMLInputElement>) => void = (event) => {
        setEmail(event.currentTarget.value);
    }

    const handleOnPasswordChange: (event: FormEvent<HTMLInputElement>) => void = (event) => {
        setPassword(event.currentTarget.value);
    }

    const handleOnSubmit: (event: FormEvent) => void = (event) => {
        event.preventDefault();

        loginUser(email, password);
    }

    if (isAuthenticated) {
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

const mapStateToProps = (state: LoginState) => (
    {
        isLoggingIn: state.login.isLoggingIn,
        loginError: state.login.loginError,
        isAuthenticated: state.login.isAuthenticated
    }
);

export default connect(mapStateToProps, { loginUser })(Login);
