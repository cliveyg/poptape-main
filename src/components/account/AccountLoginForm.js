import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

class AccountLoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        }

        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onSubmit(event) {

        event.preventDefault()

        const data = {
            "username": this.state.username,
            "password": this.state.password
        }

        this.props.onSubmit(event, data)

/*
        const request = require('superagent')
        request.post('/authy/login')
               .send(JSON.stringify(data))
               .set('Accept', 'application/json')
               .set('Content-Type', 'application/json')
               .then(res => {
                    Cookies.set('account-access-token', res.body.token)             
                    window.location.reload()
                })
               .catch(err => {
                    if (err.status === 400 || err.status === 401) {
                        const peckish = {
                            variant: "warning",
                            message: "Username and/or password is incorrect"
                        }
                        this.setState({ peckish: peckish })
                    }
                    if (err.status === 502) {
                        const peckish = {
                            variant: "error",
                            message: "Sorry, we're unable to log you in at this time"
                        }
                        this.setState({ peckish: peckish })
                    }
                    openSnack()
                });
*/
    }

    render() {
        return (
            <div>
                <form>
                <Typography style={{ margin: 30 }} variant="h5">
                    Account page login
                </Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Username"
                    name="username"
                    type="text"
                    value={this.state.username}
                    onChange = {this.handleChange}
                />
                <br />
                <TextField
                    margin="dense"
                    label="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange = {this.handleChange}
                />
                <br /><br />
                <Button type="submit" variant="outlined" onClick={(event) => this.onSubmit(event)} color="primary">
                    Login
                </Button>
                </form>
            </div>
        );
  }
}

export default AccountLoginForm
