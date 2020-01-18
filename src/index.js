import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {
    Header
} from 'semantic-ui-react';

const root = () => (
    <Router>
        <div>
            <div class="ui tabular menu">
                <a class="item active">
                    <i class="home icon"></i>
                    <Link to="/">RPGUIA</Link>

                </a>
                <a class="item">
                    <i class="help icon"></i>
                    <Link to="/about">About</Link>
                </a>
                <a class="item">
                    <i class="book icon"></i>
                    <Link to="/links">Links</Link>
                </a>
                <a class="item">
                    <i class="user icon"></i>
                    <Link to="/login">Login</Link>
                </a>
            </div>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
                <Route path="/about">
                    <div class="ui buttons"><div class="ui labeled icon button">
                        <i class="left chevron icon"></i>
                        <Link to="/">Back</Link>
                    </div>
                    </div>
                    <Header as="h2" textAlign="center">
                        <span>About</span>
                    </Header>
                </Route>
                <Route path="/dashboard">
                    <div class="ui buttons"><div class="ui labeled icon button">
                        <i class="left chevron icon"></i>
                        <Link to="/">Back</Link>
                    </div>
                    </div>
                    <ul>
                        <Header as="h2" textAlign="center">
                            <span>Hello!</span>
                        </Header>
                    </ul>
                </Route>
                <Route path="/links">
                    <div class="ui buttons"><div class="ui labeled icon button">
                        <i class="left chevron icon"></i>
                        <Link to="/">Back</Link>
                    </div>
                    </div>
                    <ul>
                        <Header as="h2" textAlign="center">
                            <span>Some links</span>
                        </Header>
                    </ul>
                </Route>
                <Route path="/login">
                    <App />
                </Route>
                <Header as="h2" textAlign="center">
                    <span>Welcome to RPGUIA!</span>
                </Header>
            </Switch>

        </div>

    </Router>
)
ReactDOM.render(root(), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
