import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import GridFromListerMS from '../helpers/GridFromListerMS'

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

class RecentlyViewed extends Component {
  
    constructor(props){
        super(props)
     
        this.state = {

        }

    } 

    componentDidMount() {
        document.title = 'poptape auctions | my recently viewed items'
    }
    

    render() {
        const { classes } = this.props
        return (
            <Box>
                <Paper className={classes.paper}>
                    <Typography className={classes.title}>
                        Items you recently viewed
                    </Typography>
                    <Box>
                        <GridFromListerMS
                            listType = 'viewed'
                        />                        
                    </Box>
                </Paper>
            </Box>
        )
    }

}

export default withStyles(Styles)(RecentlyViewed)
