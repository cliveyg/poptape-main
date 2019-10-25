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

})

class ProfileOwner extends Component {
  
    constructor(props){
        super(props)
     
        this.state = {
        }
    } 

    componentDidMount() {

    }

    render() {
        const { classes } = this.props
        return (
            <Box>
                <Paper>
                    <Typography variant="body2">
                        Profile owner
                    </Typography>
                </Paper>
            </Box>
        )
    }
}

export default withStyles(Styles)(ProfileOwner)
