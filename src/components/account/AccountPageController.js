import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
//import Cookies from 'js-cookie'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

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
                    <Box>
                    <Typography className={classes.username} variant="h4" component="h4">
                        Account details for {this.props.username}
                    </Typography>
                    </Box>
                    <Box display="flex" flexDirection="row">
                        <Box flex={5}>
                            Oooh looky here
                        </Box>
                        <Box flex={5} className={classes.itemDescriptionColumn}>
                            Box 2
                        </Box>
                    </Box>
                </Box>
            }
            </div>
        );
    }
}

export default withStyles(Styles)(AccountPageController)
