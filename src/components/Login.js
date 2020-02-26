import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { Redirect } from "react-router-dom";
import { loginUser } from "../actions";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import Image from './img/channel_decor1.jpg';
import Toolbar from '@material-ui/core/Toolbar';
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from '@material-ui/core/Tooltip';
import withFirebaseAuth from 'react-with-firebase-auth'
import { myFirebase } from "../firebase/firebase";
import * as firebase from 'firebase/app';
import Image1 from './img/google.png';

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

function SimpleSnackbar() {
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
                open={open}
                autoHideDuration={60000}
                message="Like many websites, ours uses cookies. Cookies are small text files that we put on your computer, that allow us to provide you with a better browsing experience. By using this website, you agree to let us use cookies. "
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={handleClose}>
                            OK
                        </Button>
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={handleClose}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
}

const styles = () => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(' + Image + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    image1: {
        backgroundImage: 'url(' + Image1 + ')',
        width: 15,
        height: 30
    },
    paper: {
        marginLeft: 30,
        marginRight: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    toolbar: {
        marginTop: 100
    },
    avatar: {
        backgroundColor: "#f92343",
        margin: 5
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: 1,
    },
    errorText: {
        color: "#f50057",
        marginBottom: 10,
        textAlign: "center"
    }

});
class Login extends Component {

    state = { email: "", password: "", redirect: false };

    handleEmailChange = ({ target }) => {
        this.setState({ email: target.value });
    };

    handlePasswordChange = ({ target }) => {
        this.setState({ password: target.value });
    };

    handleSubmit = () => {
        const { dispatch } = this.props;
        const { email, password } = this.state;

        dispatch(loginUser(email, password));
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
            return <Redirect to='/signup' />

        }
    }
    keyPressed(event) {
        if (event.key === "Enter") {
            document.getElementById("signin").click();
        }
    }

    render() {
        const { classes, loginError, isAuthenticated, signInWithGoogle } = this.props;
        if (isAuthenticated) {
            return <Redirect to="/" />;
        } else {
            return (
                <Grid container component="main" className={classes.root} >
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={7} className={classes.image} />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Toolbar className={classes.toolbar}>
                                <Avatar className={classes.avatar}>
                                    <LockOutlinedIcon />
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Welcome! Sign in:
                            </Typography>
                            </Toolbar>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
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
                                required
                                name="password"
                                label="Password"
                                type="password"
                                id="password"

                                onChange={this.handlePasswordChange}
                                onKeyPress={this.keyPressed}
                            />
                            {loginError && (
                                <Typography component="p" className={classes.errorText}>
                                    Incorrect email or password. Please try again.
                                </Typography>)}
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Tooltip title="Sing in">
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            id="signin"
                                            className={classes.submit}
                                            onClick={this.handleSubmit}
                                        >Sign In with email
                                        </Button>
                                    </Tooltip>
                                </Grid>
                                {this.renderRedirect()}
                                <Grid item xs={12} sm={6}>
                                    <Tooltip title="Sing in with Google">
                                        <Button
                                            fullWidth
                                            type="button"
                                            id="signupGoogle"
                                            variant="outlined"
                                            onClick={signInWithGoogle}>
                                            Sign in with Google
                                        </Button>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                            <Button
                                style={{ marginTop: 10 }}
                                type="button"
                                id="signup"
                                className={classes.submit}
                                onClick={this.handleSubmit2}
                            >Not registered yet? Sign Up!
                            </Button>
                            <Box mt={2}>
                                <Copyright />
                            </Box>
                            <SimpleSnackbar />
                        </div>
                    </Grid>
                </Grid>
            );
        }
    }
}
const firebaseAppAuth = myFirebase.auth();

const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
};
function mapStateToProps(state) {
    return {
        isLoggingIn: state.auth.isLoggingIn,
        loginError: state.auth.loginError,
        isAuthenticated: state.auth.isAuthenticated
    };
}

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(withStyles(styles)(connect(mapStateToProps)(Login)));
