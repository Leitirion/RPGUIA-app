/*import React from 'react';
import './App.css';
import { Container } from 'semantic-ui-react';
import Login from './Login';



const App = () => (

  <Container>
    <Login />
  </Container>
);
export default App;
*/

import React from "react";

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App(props) {
  const { isAuthenticated, isVerifying, isRegistred } = props;
  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/"
        component={Home}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
        isRegistred={isRegistred}
      />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying,
    isRegistred: state.auth.isRegistred
  };
}

export default connect(mapStateToProps)(App);