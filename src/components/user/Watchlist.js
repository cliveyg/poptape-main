import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import GridFromListerMS from '../helpers/GridFromListerMS'
import SideMenu from '../navigation/SideMenu'

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
    menuBox: {
        paddingRight: 20,
        //width: 400,
    },
})

class Watchlist extends Component {
  
    constructor(props){
        super(props)
     
        this.state = {

        }

    } 

    componentDidMount() {
        document.title = 'poptape auctions | my watchlist'
    }
    

    render() {
        const { classes } = this.props
        return (
            <Box>
                <Paper className={classes.paper}>
                    <Typography className={classes.title}>
                        Your watchlist
                    </Typography>
                    <Box display="flex" flexDirection="row">
                        <Box className = {classes.menuBox}>
                            <SideMenu selected="watchlist" />
                        </Box>
                        <Box flexGrow={1}>
                            <GridFromListerMS
                                listType = 'watchlist'
                            />                        
                        </Box>
                    </Box>
                </Paper>
            </Box>
        )
    }

}

export default withStyles(Styles)(Watchlist)
