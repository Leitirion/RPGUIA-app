import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import Button from "@material-ui/core/Button";
class Home extends Component {
    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch(logoutUser());
    };
    render() {
        const { isLoggingOut, logoutError } = this.props;
        return (
            <div class="title">
                <center>
                    <div class="title_for_homepage">
                        <h1>Hello to your login page!</h1>
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        id="logout"
                        onClick={this.handleLogout}>Logout</Button>
                </center>
                {isLoggingOut && <p>Logging Out....</p>}
                {logoutError && <p>Error logging out</p>}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError
    };
}
export default connect(mapStateToProps)(Home);