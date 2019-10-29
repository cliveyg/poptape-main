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

class Watchlist extends Component {
  
    constructor(props){
        super(props)
     
        this.state = {

        }

    } 

    componentDidMount() {
        document.title = 'poptape auctions | your watchlist'
    }
    

    render() {
        const { classes } = this.props
        return (
            <Box>
                <Paper className={classes.paper}>
                    <Typography className={classes.title}>
                        Your watchlist
                    </Typography>
                    <Box>
                        <GridFromListerMS
                            listType = 'watchlist'
                        />                        
                    </Box>
                </Paper>
            </Box>
        )
    }

}

export default withStyles(Styles)(Watchlist)
