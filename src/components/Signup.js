import React from 'react';
import {
    Grid,
    Header,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { Link } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";





class RegisterPage extends React.Component {
    render() {
        return (
            < Grid centered columns={2} style={{ paddingTop: 40 }
            }>
                <Grid.Column>
                    <Header as="h2" textAlign="center">

                        For registration type your email and password:


                    </Header>
                    <TextField
                        variant="outlined"
                        margin="normal"
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
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={this.handlePasswordChange}
                    />

                    <div className="form-group"  >
                        <Button ctype="button"
                            variant="contained"
                            color="primary"
                        >Register</Button>
                        <Link to="/login" >Cancel</Link>
                    </div>



                </Grid.Column>
            </Grid >
        )
    }
}
export { RegisterPage as Signup };


