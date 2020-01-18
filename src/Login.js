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
import {
  Redirect,
  Link
} from "react-router-dom"




export default class LoginPage extends Component {

  state = {
    login: '',
    password: '',
    redirect: false
  }


  onChange = (event) => this.setState({ [event.target.name]: event.target.value })
  validateEmpty = () => this.state.login.length > 0 && this.state.password.length > 0
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  login = () => {


    if (!this.validateEmpty()) {
      alert('fill all the fields!')
    } else {
      alert(`ok,login:${this.state.login},password:${this.state.password}`);
      this.setState({
        redirect: true
      })
    }
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/dashboard' />

    }
  }


  render() {
    return (
      < Grid centered columns={2} style={{ paddingTop: 40 }
      }>
        <Grid.Column>
          <Header as="h2" textAlign="center">

            Welcome! Login:

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

              <div>
                {this.renderRedirect()}
                <Button color="green" fluid size="large" onClick={this.login} >
                  Login
              </Button>


              </div>


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
