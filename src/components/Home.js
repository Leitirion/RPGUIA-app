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
import * as firebase from 'firebase/app';
import TodoListItem from './todo-list-item';
import TodoHeader from './todo-header';
import { database } from "../firebase/firebase";
import { myFirebase } from "../firebase/firebase";





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
    componentDidMount() {
        // fetch posts from Firebase
        console.log('my props', this.props);
        database.ref('todos').orderByChild('timestamp').on('value', (snapshot) => {
            this.newTodos = [];
            snapshot.forEach((todo) => {
                this.newTodos.push({ id: todo.key, ...todo.val() });
            });
            this.setState({ todos: this.newTodos });
        });
    }


    handleCheck = (id, checked) => {
        database.ref('todos').child(id).update({ checked: !checked });
    }

    handleDelete = (id) => {
        database.ref('todos').child(id).remove();
    }

    handleEdit = (id) => {
        const { todos } = this.state;
        todos.forEach((todo) => {
            if (todo.id === id) {
                database.ref('todos').child(id).update({ edit: true });
            }
        });
    }

    handleEditSubmit = (e, title, id) => {
        e.preventDefault();
        if (title.length === 0) {
            alert('new title can not be 0');
            return;
        }


        const { todos } = this.state;
        todos.forEach((todo) => {
            if (todo.id === id) {
                database.ref('todos').child(id).update({ title, edit: false });
            }
        });
    }


    getFilteredTodos = (todos) => {
        const { filter } = this.state;

        if (filter === 'open') {
            return todos.filter(todo => !todo.checked);
        } else if (filter === 'done') {
            return todos.filter(todo => todo.checked);
        }
        return todos;
    }

    sortTodos = () => {
        const { todos } = this.state;
        return todos.sort((a, b) => b.timestamp - a.timestamp);
    }



    handleLogout = () => {
        const { dispatch } = this.props;
        dispatch(logoutUser());

    };

    renderTodos = () => {
        const sortedTodos = this.sortTodos();
        const filteredAndSortedTodos = this.getFilteredTodos(sortedTodos);

        return filteredAndSortedTodos.map((todo, id) => (

            <TodoListItem

                title={todo.title}
                key={id}
                checked={todo.checked}
                id={todo.id}
                handleCheck={this.handleCheck}
                handleDelete={this.handleDelete}
                edit={todo.edit}
                handleDoubleClick={this.handleEdit}
                handleEditSubmit={this.handleEditSubmit}
            />

        ));
    }
    render() {
        const { classes, isLoggingOut, logoutError, user } = this.props;
        if (!this.state.todos) {
            return <div> Loading </div>;
        }
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
                                            ? < h2 >Hello {user.displayName}</h2>
                                            : <h2>Hello to your login page!</h2>
                                    }
                                </center>
                            </div>
                        </div>
                    </div>
                    <div>
                        <TodoHeader style={{ marginTop: 100 }} filterTodos={this.setFilter} />
                        {this.renderTodos()}

                    </div>
                    {isLoggingOut && <p>Logging Out....</p>}
                    {logoutError && <p>Error logging out</p>}
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