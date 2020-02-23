import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { signup } from "../actions";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/styles";


const styles = () => ({
    "@global": {
        body: {
            backgroundColor: "#fff"
        }
    },
    paper: {
        marginTop: 100,
        display: "flex",
        padding: 20,
        flexDirection: "column",
        alignItems: "center"
    },
    avatar: {
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#f92343"
    },
    form: {
        marginTop: 1
    },
    errorText: {
        color: "#f50057",
        marginBottom: 5,
        textAlign: "center"
    }
});

class Signup extends Component {
    state = { email: "", password: "", redirect: false };

    handleEmailChange = ({ target }) => {
        this.setState({ email: target.value });
    };

    handlePasswordChange = ({ target }) => {
        this.setState({ password: target.value });
    };
    validateEmpty = () => this.state.email.length > 0 && this.state.password.length > 0
    handleSubmit = () => {
        const { dispatch } = this.props;
        const { email, password } = this.state;

        dispatch(signup(email, password));
    };
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    handleSubmit2 = () => {
        this.setState({
            redirect: true
        })
    };
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />

        }
    }

    render() {
        const { classes, signUpfail } = this.props;

        return (

            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        For registration type your email and password:
            </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        onChange={this.handleEmailChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={this.handlePasswordChange}
                    />
                    {signUpfail && (
                        <Typography component="p" className={classes.errorText}>

                        </Typography>
                    )}

                    <div className="form-group"  >
                        <Button
                            id="reg_button"
                            type="button"
                            variant="contained"
                            color="primary"
                            //className={classes.submit}
                            onClick={this.handleSubmit}
                        >Register</Button>
                        {this.renderRedirect()}
                        <Button
                            id="back_button"
                            type="button"
                            onClick={this.handleSubmit2}
                        >Back</Button>
                    </div>
                </Paper>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        loginSuccess: state.auth.loginSuccess,
        isAuthenticated: state.auth.isAuthenticated,
        signUpfail: state.auth.signUpfail

    };
}

export default withStyles(styles)(connect(mapStateToProps)(Signup));


