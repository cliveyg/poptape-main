import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'
import Cookies from 'js-cookie'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
//import CircularProgress from '@material-ui/core/CircularProgress'
//import blue from '@material-ui/core/colors/blue'
import Box from '@material-ui/core/Box'
import AvatarChooser from '../helpers/AvatarChooser'
import AvatarGrid from '../helpers/AvatarGrid'
import {DropzoneDialog} from 'material-ui-dropzone'
import CustomizedSnackbars from '../information/CustomSnackbars'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import MaxTextField from '../helpers/MaxTextField'

import MetaViewer from '../reviews/MetaViewer'

import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'

const Styles = theme => ({
    paper: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 50,
        marginBottom: 50,
        paddingLeft: 20,
        paddingRight: 20,
    },
    dropbuttons: {
        marginTop: 15,
        textTransform: "none",
        marginRight: 15,
    },
    buttons: {
        textTransform: "none",
    },
    buttonBox: {
        //verticalAlign: "middle",
        //display: "inline",
    },
    avatarBox: {
        marginRight: 15,
    },
    title: {
        fontSize: "1.4em",
    },
    about_me: {
        marginTop: 10
    },
})

class ProfileOwner extends Component {
  
    constructor(props){
        super(props)
        const peckish = {
            "variant": "success",
            "message": "Profile updated"
        }
     
        this.state = {
            showSnack: false,
            duration: 1500,
            peckish: peckish,
            date: new Date().getTime(),
            openUpload: false,
            openDialog: false,
            avatarObj: null,
            username: Cookies.get('username'),
            aboutMe: "",
        }
        this.updateAvatar = this.updateAvatar.bind(this)
    } 

    // open dropzone dialog
    handleOpen = () => {
        this.setState({
            openUpload: true,
        });
    }

    // open snackbar
    openSnack = () => {
        if (this.state.showSnack === true) {
            this.setState({
                showSnack: false
            }, () => {
                this.setState({
                    showSnack: true
                });
            });
        } else {
            this.setState({
                showSnack: true
            });
        }
    }

    // close dropzone dialog
    handleClose = () => {
        this.setState({
            openUpload: false
        })
        this.setState({
            openDialog: false
        })        
    }

    selectTile = (tile) => {
        this.handleClose()
        const request = require('superagent')
        request.post('/profile/avatar')
               .send(JSON.stringify({'standard_avatar': tile.name}))
               .set('Accept', 'application/json')
               .set('Content-Type', 'application/json')
               .set('x-access-token',Cookies.get('access-token'))
               .then(res => {
                    this.setState({ avatarName: tile.name })
                    this.setState({ avatarObj: tile.img })
                })
               .catch(err => {
                    console.log(err)
                });
    }

    submitAboutMe = () => {
        //console.log(this.state.aboutMe)
        const request = require('superagent')
        request.post('/profile')
               .send(JSON.stringify({'about_me': this.state.aboutMe}))
               .set('Accept', 'application/json')
               .set('Content-Type', 'application/json')
               .set('x-access-token',Cookies.get('access-token'))
               .then(res => {
                    const peckish = {
                        variant: "success",
                        message: "Profile updated"
                    }
                    this.setState({ peckish: peckish },
                                  () => { this.openSnack() })
                })
               .catch(err => {
                    console.log(err)
                    const peckish = {
                        variant: "error",
                        message: "Computer says no"
                    }
                    this.setState({ peckish: peckish },
                                  () => { this.openSnack() })
                });
    }

    handleStandard = () => {
        this.setState({ openDialog: true })
    }

    updateAvatar = (file) => {
        this.setState({ avatarObj: file }, 
                      () => { this.setState({ openUpload: false })})
    }

    handleSave = (files) => {
        const reader  = new FileReader()
        let formData = {}

        reader.onload = (event) => {
            
            formData['bespoke_avatar'] = event.target.result
            const request = require('superagent')
            request.post('/profile/avatar')
                   .send(JSON.stringify(formData))
                   .set('Content-Type', 'application/json')
                   .set('Accept', 'application/json')
                   .set('x-access-token',Cookies.get('access-token'))
                   .then(res => {
                        this.updateAvatar(formData['bespoke_avatar'])
                    })
                   .catch(err => {
                        console.log(err)
                    });
        }
        reader.readAsDataURL(files[0])
    }
    
    onChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }

    handleButton = () => {
        console.log("handleButton")
    }

    componentDidMount() {
        document.title = 'poptape auctions | '+Cookies.get('username')+' | profile'

        const request = require('superagent')
        request.get('/profile')
               .set('Content-Type', 'application/json')
               .set('Accept', 'application/json')
               .set('x-access-token',Cookies.get('access-token'))
               .then(res => {
                    if (res.body.about_me !== null && res.body.about_me !== '') {
                        this.setState({ aboutMe: res.body.about_me }) 
                    }
                })
               .catch(err => {
                    console.log(err)
                });

    }

    render() {
        const { classes } = this.props
        return (
            <Box>
                <Paper className={classes.paper}>
                    <Typography className={classes.title}>
                        Your profile
                    </Typography>
                    <Card>
                    <CardContent>                    
                    <Box display="flex" flexDirection="row">
                        <Box flex={1} className={classes.avatarBox}>
                        <AvatarChooser
                            avatarSize = "xl"
                            avatarObj = {this.state.avatarObj}
                        />
                        </Box>
                        <Box flex={2}>
                            <Box display="flex" flexDirection="column">
                                <Box>
                                <Button
                                    className = {classes.dropbuttons}
                                    color = "secondary"
                                    variant="outlined"
                                    size="small" 
                                    onClick={this.handleOpen.bind(this)}
                                >
                                    Upload avatar
                                </Button>
                                </Box>
                                <Box>
                                <Button
                                    className = {classes.dropbuttons}
                                    color = "secondary"
                                    variant="outlined"
                                    size="small"
                                    onClick={this.handleStandard.bind(this)}
                                >
                                    Select from existing
                                </Button>
                                </Box>
                            </Box>
                        </Box>
                        <Box flex={2}>
                                <Button
                                    className = {classes.dropbuttons}
                                    color = "primary"
                                    variant="outlined"
                                    size="small"
                                    onClick={() => this.props.history.push('/user/'+this.state.username+'/watchlist')}
                                >
                                    My watchlist
                                </Button>
                                <br />
                                <Button
                                    className = {classes.dropbuttons}
                                    color = "primary"
                                    variant="outlined"
                                    size="small"
                                    onClick={() => this.props.history.push('/user/'+this.state.username+'/favourites')}
                                >
                                    My favourites
                                </Button>
                                <br />
                                <Button
                                    className = {classes.dropbuttons}
                                    color = "primary"
                                    variant="outlined"
                                    size="small"
                                    onClick={() => this.props.history.push('/user/'+this.state.username+'/viewed')}
                                >
                                    My recently viewed
                                </Button>
                                <br />
                                <Button
                                    className = {classes.dropbuttons}
                                    color = "primary"
                                    variant="outlined"
                                    size="small"
                                    onClick={() => this.props.history.push('/user/'+this.state.username+'/purchased')}
                                >
                                    My purchase history
                                </Button>
                        </Box>
                        <Box flex={2}>
                            <MetaViewer />
                        </Box>
                        <Box flexGrow={5}>
                            
                        </Box>
                    </Box>
                    </CardContent>
                    </Card>
                    <Box className={classes.about_me}>
                        <MaxTextField
                            multiline
                            rows={5}
                            margin="dense"
                            label="About you"
                            name="about_me"
                            type="text"
                            inputProps={{
                                maxLength: 500
                            }}
                            characterLimit={500}
                            helperText="Number of characters:&nbsp;&nbsp;&nbsp;"
                            fullWidth
                            value={this.state.aboutMe}
                            onChange = {(e) => {this.onChange(e, 'aboutMe')}}
                        /><br />
                        <Button
                            className = {classes.dropbuttons}
                            color = "secondary"
                            variant="outlined"
                            size="small"
                            onClick={this.submitAboutMe.bind(this)}
                        >
                            Update about you
                        </Button><br /><br />
                    </Box>
                    <Box>
                        <DropzoneDialog
                            open = {this.state.openUpload}
                            onSave = {this.handleSave.bind(this)}
                            acceptedFiles = {['image/jpeg', 'image/png']}
                            showPreviews={false}
                            showAlerts={false}
                            showPreviewsInDropzone={true}
                            dropzoneText = "&nbsp;&nbsp;Drag and drop an image file here or click&nbsp;&nbsp;"
                            dropzoneParagraphClass = {{ fontSize: 12, padding: 10 }}
                            maxFileSize = {60000}
                            filesLimit = {1}
                            onClose = {this.handleClose.bind(this)}
                        />
                    </Box>
                    <Box>
                        <Dialog 
                            onClose={this.handleClose.bind(this)} 
                            aria-labelledby="customized-dialog-title" 
                            open={this.state.openDialog}
                        >
                            <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                                Select avatar
                            </DialogTitle>
                            <DialogContent dividers>
                                <AvatarGrid 
                                    selectTile = {this.selectTile.bind(this)}
                                />
                            </DialogContent>
                        </Dialog>                            
                    </Box>
                </Paper>
                {this.state.showSnack ?
                    <CustomizedSnackbars
                        duration = {this.state.duration}
                        key_date = {this.state.date}
                        variant  = {this.state.peckish.variant}
                        message  = {this.state.peckish.message}
                    />
                : null
                }
            </Box>
        )
    }
}

export default compose(withStyles(Styles))(withRouter(ProfileOwner))
