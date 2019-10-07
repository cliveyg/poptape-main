import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Cookies from 'js-cookie'
import CustomizedSnackbars from '../information/CustomSnackbars'

class SignupDialog extends Component {

    constructor(props) {
        super(props);
        const peckish = {
            "variant": "error",
            "message": "Something went bang!"
        }
        Cookies.remove('access-token')
        Cookies.remove('username')

        this.state = {username: "",
                      password: "",
                      confirm_password: "",
                      email: "",
                      toggleModal: false,
                      showSnack: false,
                      duration: 1900,
                      loggedIn: false,
                      date: new Date().getTime(),
                      peckish: peckish};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleSnack  = this.toggleSnack.bind(this);
        this.toggleModal  = this.toggleModal.bind(this);
        this.closeModal   = this.closeModal.bind(this);
        this.openSnack  = this.openSnack.bind(this);
    
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
        event.preventDefault();
        var data = {
            "username":this.state.username,
            "password":this.state.password,
            "confirm_password":this.state.confirm_password,
            "email":this.state.email
        }
        const openSnack = this.openSnack.bind(this)
        const closeModal = this.closeModal.bind(this)

        const request = require('superagent')
        request.post('/authy/user')
               .send(JSON.stringify(data))
               .set('Accept', 'application/json')
               .set('Content-Type', 'application/json')
               .then(res => {
                    Cookies.set('access-token', res.body.token)
                    Cookies.set('username', data.username)
                    const peckish = {
                        variant: "success",
                        message: "User [ "+data.username+" ] successfully created"
                    }
                    this.setState({ peckish: peckish })
                    openSnack()
                    // set a timer so snackbar appears and disappears
                    setTimeout(function(){
                        closeModal()
                    }, 2000);
                })
               .catch(err => {
                    if (err.status === 401 || err.status === 400) {
                        const peckish = {
                            variant: "error",
                            message: "Check your inputs again"
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
    }

    render() {
        const key_date = this.state.date 
        return (
            <div className="poptape-modal-outer">
            <div className="poptape-modal-inner poptape-signup-modal-inner">
                <h3 className="poptape-h3-black">Signup</h3>
                <form>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    label="Username"
                    name="username"
                    type="text"
                    value={this.state.username}
                    onChange = {this.handleChange}
                />
                <br />
                <TextField
                    required
                    margin="dense"
                    label="Email"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange = {this.handleChange}
                />
                <br />
                <TextField
                    required
                    margin="dense"
                    label="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange = {this.handleChange}
                />
                <br />
                <TextField
                    required
                    margin="dense"
                    label="Confirm password"
                    name="confirm_password"
                    type="password"
                    value={this.state.confirm_password}
                    onChange = {this.handleChange}
                />
                <br /><br />
                <Button variant="outlined" onClick={this.props.closePopup} color="secondary">
                    Cancel
                </Button>
                &nbsp;
                <Button type="submit" variant="outlined" onClick={(event) => this.handleSubmit(event)} color="primary">
                    Signup
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

export default SignupDialog
