import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import PropTypes from "prop-types";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import { makeStyles } from "@material-ui/core/styles";
import FormatListNumberedOutlinedIcon from '@material-ui/icons/FormatListNumberedOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import withFirebaseAuth from 'react-with-firebase-auth'
import { myFirebase } from "../firebase/firebase";
import * as firebase from 'firebase/app';

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
const useStyles = makeStyles(theme => ({
    root: {
        position: "fixed",
        bottom: theme.spacing(2),
        left: theme.spacing(2)
    }
}));

const styles = () => ({
    root: {
        height: '100vh'
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        flexGrow: 1,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: 1
    }
});

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100
    });

    const handleClick = event => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            "#back-to-top-anchor"
        );

        if (anchor) {
            anchor.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                {children}
            </div>
        </Zoom>
    );
}

class Home extends Component {
    state = {
        todo: '',
        todos: [{
            text: 'A new todo name',
            done: false,
        }]
    };
    handleRemove = (index) => {
        // grab original todos from state
        const { todos } = this.state;
        // create an array excluding the array value based on the index
        this.setState({
            todo: '',
            todos: [
                ...todos.slice(0, index),
                ...todos.slice(index + 1),
            ],
        });
    }
    handleSubmit = (event) => {
        // grab original todos from state 
        const { todos } = this.state;
        // todo text is result
        // append new todo with default state to todos
        this.setState({
            todo: '',
            todos: [
                {
                    text: event.currentTarget.todo.value,
                    done: false,
                },
                ...todos,
            ],
        });
        event.preventDefault();
    }
    handleCheckbox = (index) => {
        const { todos } = this.state;
        todos[index].done = !todos[index].done;
        this.setState({
            todos,
        });
    }
    handleChange = (event) => {
        this.setState({
            todo: event.currentTarget.value,
        });
    }
    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch(logoutUser());

    };
    render() {
        const { todo, todos } = this.state;
        const { classes, isLoggingOut, logoutError, user } = this.props;
        return (
            <React.Fragment>
                <AppBar style={{ background: '#444242' }}>
                    <Toolbar>
                        <FormatListNumberedOutlinedIcon style={{
                            color: 'red'
                        }}></FormatListNumberedOutlinedIcon>
                        <Button>
                            <Tooltip title="Home">
                                <Typography variant="h5" color="inherit" noWrap onClick={this.handleSubmit2}>
                                    RPGUIA
                            </Typography>
                            </Tooltip>
                        </Button>
                        <Typography variant="h5" color="inherit" noWrap className={classes.title} >
                        </Typography>
                        <Tooltip title="Logout from account">
                            <Button
                                id="logout"
                                onClick={this.handleLogout}>Logout</Button></Tooltip>
                    </Toolbar>
                </AppBar>
                <Toolbar id="back-to-top-anchor" />
                <Container component="main" >
                    <CssBaseline />
                    <div className="title">
                        <div className={classes.paper}>
                            <div className="title_for_homepage" style={{ marginTop: 10 }}>
                                <center>
                                    {
                                        user
                                            ? < h2 > Hello {user.displayName}!</h2>
                                            : <h2>Hello to your login page!</h2>
                                    }
                                </center>
                            </div>
                            <div className="container-fluid">
                                <div className="row">
                                    <header style={{ margin: '20px 0 40px 0' }} className="App-header col col-12"></header>
                                    <main className="col col-12">
                                        <form onSubmit={this.handleSubmit} style={{ marginBottom: '20px' }}>
                                            <input id="todo" name="todo" onChange={this.handleChange} value={todo} className="form-control" type="text" placeholder="Enter todo here...[Press Enter]" autoComplete="off" />
                                        </form>
                                        <ul className="todos list-groups" style={{ padding: 0 }}>
                                            {(todos.length === 0)
                                                ? (<li className="todo list-group-item" style={{
                                                    color: 'rgb(100, 100, 100)'
                                                }}
                                                > No todos yet</li>)
                                                : (todos.map((item, key) => (
                                                    <li checked={item.done} key={`list-${(key + 1)}`} className="todo list-group-item">
                                                        <input onChange={() => this.handleCheckbox(key)} checked={item.done} className="form-control" type="checkbox" />
                                                        <span id="item_text" style={{
                                                            color: 'rgb(100, 100, 100)',
                                                            top: 0,
                                                            bottom: 0,
                                                            left: '3rem',
                                                            right: '5rem',
                                                            lineHeight: '62px',
                                                            display: 'block',
                                                            position: 'absolute',
                                                            textDecoration: (item.done) ? 'line-through' : 'none',
                                                        }}>{item.text}</span>
                                                        <Tooltip title="Delete current todo">
                                                            <button id="del_button" onClick={() => this.handleRemove(key)} type="button"
                                                                className="btn btn-sm btn-danger"
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: 0,
                                                                    bottom: 0,
                                                                    right: '1.25rem',
                                                                    margin: 'auto 0',
                                                                    height: '25px',
                                                                    paddingTop: 0,
                                                                    paddingBottom: 0,
                                                                }}>&times;</button></Tooltip>
                                                    </li>
                                                )))
                                            }
                                        </ul>
                                    </main>
                                </div>
                            </div>
                            {isLoggingOut && <p>Logging Out....</p>}
                            {logoutError && <p>Error logging out</p>}
                        </div>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Container>
                <ScrollTop {...Home}>
                    <Fab color="secondary" size="medium" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>
            </React.Fragment>
        );
    }
}
const firebaseAppAuth = myFirebase.auth();

const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
};
function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError
    };
}
export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(withStyles(styles)(connect(mapStateToProps)(Home)));