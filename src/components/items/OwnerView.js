import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Cookies from 'js-cookie'
import Typography from '@material-ui/core/Typography'

const Styles = theme => ({
});

class OwnerView extends Component {

    constructor(props){  
        super(props)
        console.log("[[ ItemOwner ]] -> constructor")

        this.state = { 
            item: this.props.item,
        }

    }

    componentDidMount() {

    }

    render() {
        const { classes } = this.props

        return (
            <div style={{width: "100%"}}>
                <div>
                    <Typography variant="h4" component="h4">
                     Item owner <br />
                    </Typography>
                </div>
            }
            </div>
        );
    }
}

export default withStyles(Styles)(OwnerView)
