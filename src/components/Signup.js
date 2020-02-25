import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { signup } from "../actions";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/styles";
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Tooltip from '@material-ui/core/Tooltip';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <i>By GIF</i>
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const styles = () => ({
    root: {
        height: '100vh',
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marginTop: 100,
        backgroundColor: "#f92343"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
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
        const { classes } = this.props;
        return (
            <React.Fragment>
                <AppBar style={{ background: '#444242' }}>
                    <Toolbar>
                        <AccountCircleOutlinedIcon style={{
                            color: 'red'
                        }}></AccountCircleOutlinedIcon>
                        <Tooltip title="Home">
                            <Button>
                                <Typography variant="h5" noWrap onClick={this.handleSubmit2}>
                                    RPGUIA
                            </Typography>
                            </Button>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            For registration type your email and password:
                        </Typography>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            id="email"
                            label="Email Address"
                            name="email"
                            onChange={this.handleEmailChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            required
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={this.handlePasswordChange}
                        />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Tooltip title="Register your account">
                                    <Button
                                        id="reg_button"
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={this.handleSubmit}
                                    >Register</Button></Tooltip>
                            </Grid>
                            {this.renderRedirect()}
                            <Grid item xs={12} sm={6}>
                                <Tooltip title="Back to login page">
                                    <Button
                                        id="back_button"
                                        type="button"
                                        variant="outlined"
                                        fullWidth
                                        onClick={this.handleSubmit2}
                                    >Back</Button></Tooltip>
                            </Grid>
                        </Grid>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Container>
            </React.Fragment>
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


