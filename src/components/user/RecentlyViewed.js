import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import GridFromListerMS from '../helpers/GridFromListerMS'
import Cookies from 'js-cookie'
import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'
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

class RecentlyViewed extends Component {
  
    constructor(props){
        super(props)
     
        this.state = {
            username: Cookies.get('username'),
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
                    <Box display="flex" flexDirection="row">
                        <Box className = {classes.menuBox}>
                            <SideMenu selected="viewed" />
                        </Box>
                        <Box flexGrow={1}>
                            <GridFromListerMS
                                listType = 'viewed'
                            />                        
                        </Box>
                    </Box>
                </Paper>
            </Box>
        )
    }

}

export default compose(withStyles(Styles))(withRouter(RecentlyViewed))
