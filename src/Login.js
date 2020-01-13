import React, { Component } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';



export default class LoginPage extends Component {

  state = {
    login: '',
    password: ''
  }
  onChange = (event) => this.setState({ [event.target.name]: event.target.value })
  validateEmpty = () => this.state.login.length > 0 && this.state.password.length > 0
  login = () => {

    if (!this.validateEmpty()) {
      alert('fill all the fields!')
    } else {
      alert(`ok,login:${this.state.login},password:${this.state.password}`);
    }
    render() {
      return (
        <Grid centered columns={2} style={{ paddingTop: 40 }}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
              Login
          </Header>
            <Segment>
              <Form size="large">
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Email address"
                  name='login'
                  onChange={this.onChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name='password'
                  onChange={this.onChange}
                />
                <Button color="blue" fluid size="large" onClick={this.login}>
                  Login
              </Button>
              </Form>
            </Segment>
            <Message>
              Not registered yet? <a href="#">Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid >
      )
    }
  }
