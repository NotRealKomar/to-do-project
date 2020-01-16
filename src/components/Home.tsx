import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions/loginActions";
import { LoginState } from "../reducers/loginReducer";

import List from "./toDo/List";
class Home extends Component<any> {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };
  render() {
    const { isLoggingOut, logoutError } = this.props;
    return (
      <div>
        <List></List>
        
        <button onClick={this.handleLogout}>Logout</button>
        {isLoggingOut && <p>Logging Out....</p>}
        {logoutError && <p>Error logging out</p>}
      </div>
    );
  }
}
function mapStateToProps(state: LoginState) {
  return {
    isLoggingOut: state.login.isLoggingOut,
    logoutError: state.login.logoutError
  };
}
export default connect(mapStateToProps)(Home);