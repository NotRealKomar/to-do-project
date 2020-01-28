import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions/loginActions";
import { LoginState } from "../reducers/loginReducer";

import List from "./toDo/List";

interface IProps {
  logoutUser: () => void;
  isLoggingOut: boolean;
  logoutError: boolean;
}

class Home extends Component<IProps> {
  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const { isLoggingOut, logoutError } = this.props;
    return (
      <div>
        <List />
        
        <button onClick={this.handleLogout}>Logout</button>
        {isLoggingOut && <p>Logging Out....</p>}
        {logoutError && <p>Error logging out</p>}
      </div>
    );
  }
}
const mapStateToProps = (state: LoginState) => {
  return {
    isLoggingOut: state.login.isLoggingOut,
    logoutError: state.login.logoutError
  };
}
export default connect(mapStateToProps, { logoutUser })(Home);