import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions";
import Button from "@material-ui/core/Button";
class Home extends Component {
    state = {
        todo: '',
        todos: [{
            text: 'A new todo name',
            done: false,
        }],
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
        const { isLoggingOut, logoutError } = this.props;
        return (
            <div class="title">
                <center>
                    <div class="title_for_homepage">
                        <h1>Hello to your login page!</h1>
                        <main className="col col-12">
                            <form onSubmit={this.handleSubmit} style={{ marginBottom: '20px' }}>
                                <input name="todo" onChange={this.handleChange} value={todo} className="form-control" type="text" placeholder="Enter todo here...[Press Enter]" autoComplete="off" />
                            </form>
                            <ul className="todos">
                                {(todos.length === 0)
                                    ? (<li className="todo list-group-item">No todos yet</li>)
                                    : (todos.map((item, key) => (
                                        <li checked={item.done} key={`list-${(key + 1)}`} className="todo">
                                            <input onChange={() => this.handleCheckbox(key)} checked={item.done} type="checkbox" />
                                            <span style={{

                                                textDecoration: (item.done) ? 'line-through' : 'none',
                                            }}>{item.text}</span>
                                            <button onClick={() => this.handleRemove(key)} type="button"
                                                className="btn btn-sm btn-danger"
                                                style={{
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
                        </main>
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