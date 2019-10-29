import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import AvatarChooser from '../helpers/AvatarChooser'
import Box from '@material-ui/core/Box'
import MetaViewerOther from '../reviews/MetaViewerOther'

const Styles = theme => ({
    paper: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 50,
        marginBottom: 50,
        paddingLeft: 20,
        paddingRight: 20,
    },
    title: {
        fontSize: "1.4em",
    },
})

class ProfileViewer extends Component {
  
    constructor(props){
        super(props)
     
        this.state = {
            username: this.props.username,
            publicId: null,
            aboutMe: "",
            chooser: "",
            reviewMeta: "",
        }

        const request = require('superagent')
        request.get('/authy/fetch/'+this.state.username)
               .set('Content-Type', 'application/json')
               .set('Accept', 'application/json')
               //.set('x-access-token',Cookies.get('access-token'))
               .then(res => {
                    this.setState({ publicId: res.body.public_id },
                        () => { 
                                const request2 = require('superagent')
                                request2.get('/profile/'+this.state.publicId)
                                        .set('Content-Type', 'application/json')
                                        .set('Accept', 'application/json')
                                        .then(res2 => {
                                            this.setState({ aboutMe: res2.body.about_me })
                                            const chosen = 
                                                <AvatarChooser
                                                    avatarSize = "xl"
                                                    publicId = {this.state.publicId}
                                                />
                                            this.setState({ chooser: chosen })
                                            const reviewed =
                                                <MetaViewerOther
                                                    publicId = {this.state.publicId}
                                                    username = {this.state.username}
                                                />
                                            this.setState({ reviewMeta: reviewed })
                                        })
                                        .catch(err => {
                                             console.log(err)
                                        });
                        })
                })
               .catch(err => {
                    console.log(err)
                });

    } 

    componentDidMount() {
        document.title = 'poptape auctions | '+this.state.username+' | profile'
    }
    

    render() {
        const { classes } = this.props
        return (
            <Box>
                <Paper className={classes.paper}>
                    <Typography className={classes.title}>
                        Profile of {this.state.username}
                    </Typography>
                    <Card>
                    <CardContent>
                    <Box display="flex" flexDirection="row">
                        <Box flex={1} className={classes.avatarBox}>
                            {this.state.chooser}
                        </Box>
                        <Box flex={2}>
                            {this.state.reviewMeta}
                        </Box>
                        <Box flex={5}>
                            <Typography variant="h5">
                                About {this.state.username}<br /><br />
                            </Typography>                            
                            <Typography variant="body1">
                                {this.state.aboutMe}
                            </Typography>
                        </Box>
                    </Box>
                    </CardContent>
                    </Card>
                </Paper>
            </Box>
        )
    }

}

export default withStyles(Styles)(ProfileViewer)
