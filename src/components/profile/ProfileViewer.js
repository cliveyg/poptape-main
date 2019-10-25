import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
//import Card from '@material-ui/core/Card'
import Paper from '@material-ui/core/Paper'
//import CardContent from '@material-ui/core/CardContent'
//import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
//import CircularProgress from '@material-ui/core/CircularProgress'
//import blue from '@material-ui/core/colors/blue'
//import AvatarChooser from '../helpers/AvatarChooser'
import Box from '@material-ui/core/Box'

const Styles = theme => ({
    paper: {
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
    },

})

class ProfileViewer extends Component {
  
    constructor(props){
        super(props)
     
        this.state = {
            username: this.props.username 
        }
    } 

    componentDidMount() {

    }

    render() {
        const { classes } = this.props
        return (
            <Box>
                <Paper className={classes.paper}>
                    <Typography variant="h5">
                        Profile of {this.state.username}
                    </Typography>

                </Paper>
            </Box>
        )
    }

}

export default withStyles(Styles)(ProfileViewer)
