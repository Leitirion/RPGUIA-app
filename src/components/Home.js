import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from "@material-ui/core/Typography";

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
    }
});

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
        const { classes, isLoggingOut, logoutError } = this.props;
        return (
            <Container component="main" >
                <CssBaseline />
                <div class="title">
                    <div className={classes.paper}>
                        <div class="title_for_homepage">
                            <center>
                                <h1>Hello to your login page!</h1>
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
                                                        }}>&times;</button>
                                                </li>
                                            )))
                                        }

                                    </ul>
                                    <center>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            id="logout"
                                            onClick={this.handleLogout}>Logout</Button>
                                    </center>
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
            </Container >
        );
    }
}
function mapStateToProps(state) {
    return {
        isLoggingOut: state.auth.isLoggingOut,
        logoutError: state.auth.logoutError
    };
}
export default withStyles(styles)(connect(mapStateToProps)(Home));