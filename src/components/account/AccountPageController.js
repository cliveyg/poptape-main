import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import SideMenu from '../navigation/SideMenu'
import Paper from '@material-ui/core/Paper'

const Styles = theme => ({
    username: {
        marginBottom: 25,
        fontSize: "1.2em",
    },
    itemDescriptionColumn: {
        //backgroundColor: "orange",
    },
    nonCenter: {
        textAlign: "justify",
    },
    menuBox: {
        paddingRight: 20,
        //width: 400,
    },
    paper: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 50,
        marginBottom: 50,
        paddingLeft: 20,
        paddingRight: 20,
    },
});

class AccountPageController extends Component {

    constructor(props){  
        super(props)

        this.state = { 
            showError: false,
        }
        // bind me up baby

        // loading this data here as it will never change
        
    }
    
    componentDidMount() {
    
    }

    render() {
        const { classes } = this.props

        return (
            <div style={{width: "100%"}}>
            {this.state.showError ?
                <div>
                    <Typography variant="h5" component="h5">
                        Account data not supplied<br />
                    </Typography>
                </div>
            :
                <Box className={classes.nonCenter}>
                    <Paper className={classes.paper}>
                    <Typography className={classes.username} variant="h4" component="h4">
                        Account details for {this.props.username}
                    </Typography>
                    <Box display="flex" flexDirection="row">
                        <Box className = {classes.menuBox}>
                            <SideMenu selected="account" />
                        </Box>
                        <Box flexGrow={1}>
                            Accounty stuff
                        </Box>
                    </Box>
                    </Paper>
                </Box>
            }
            </div>
        );
    }
}

export default withStyles(Styles)(AccountPageController)
