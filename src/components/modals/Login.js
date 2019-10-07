import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Cookies from 'js-cookie'
import CustomizedSnackbars from '../information/CustomSnackbars'

class LoginDialog extends Component {

    constructor(props) {
        super(props);
        const peckish = {
            "variant": "error",
            "message": "Something went bang!"
        }

        this.state = {username: "",
                      password: "",
                      toggleModal: false,
                      showSnack: false,
                      duration: 6000,
                      loggedIn: Cookies.get('access-token') ? true : false,
                      date: new Date().getTime(),
                      peckish: peckish};

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.toggleSnack  = this.toggleSnack.bind(this)
        this.toggleModal  = this.toggleModal.bind(this)
        this.closeModal   = this.closeModal.bind(this)
        this.openSnack    = this.openSnack.bind(this)

        // if we're already logged in and the user hit's the login/out
        // button then if we are logged in we just remove cookie and
        // run close modal to logout
        if (this.state.loggedIn) {
            Cookies.remove('access-token')
            Cookies.remove('username')
            this.closeModal()
        }
    }

    toggleSnack() {
        this.setState({
            date: new Date().getTime()
        });
        this.setState({
            showSnack: !this.state.showSnack
        });
    } 

    openSnack() {
        if (this.state.showSnack === true) {
            this.toggleSnack()
        }
        this.setState({
            showSnack: true
        });        
    }

    toggleModal() {
        this.setState({
            toggleModal: !this.state.toggleModal
        });
    }

    closeModal() {
        this.props.loggedIn()    
        this.props.closePopup()
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {

        //TODO: clientside validation and error handling
        // and server error message handling
    
        event.preventDefault();
        const data = {
            "username": this.state.username,
            "password": this.state.password
        }

        const openSnack = this.openSnack.bind(this)
        const closeModal = this.closeModal.bind(this)
        
        const request = require('superagent')
        request.post('/authy/login')
               .send(JSON.stringify(data))
               .set('Accept', 'application/json')
               .set('Content-Type', 'application/json')
               .then(res => {
                    Cookies.set('access-token', res.body.token)             
                    Cookies.set('username', data.username)
                    closeModal()
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
                    //toggleSnk()
                    openSnack()
                });
    }

    render() {
        const key_date = this.state.date
        return (
            <div className="poptape-modal-outer">
            <div className="poptape-modal-inner poptape-login-modal-inner">
                <h3 className="poptape-h3-black">Login</h3>
                <form>
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
                <Button variant="outlined" onClick={this.props.closePopup} color="secondary">
                    Cancel
                </Button>
                &nbsp;
                <Button type="submit" variant="outlined" onClick={(event) => this.handleSubmit(event)} color="primary">
                    Login
                </Button>
                </form>
            </div>
            {this.state.showSnack ?
                <CustomizedSnackbars
                    duration={this.state.duration}
                    key_date={key_date}
                    variant={this.state.peckish.variant}
                    message={this.state.peckish.message}
                />
            : null
            }
            {this.state.toggleModal ?
                this.closeModal()
            : null
            }
            </div>
        );
  }
}

export default LoginDialog
