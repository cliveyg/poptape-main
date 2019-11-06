import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Cookies from 'js-cookie'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import SideMenu from '../navigation/SideMenu'

const Styles = theme => ({
    itemName: {
        marginBottom: 25,
        fontSize: "1.6em",
    },
    itemDescriptionColumn: {
        //backgroundColor: "orange",
    },
    boxWidth: {
        width: "100%",
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
    title: {
        fontSize: "1.4em",
    },
});

class UserReviewsController extends Component {

    constructor(props){  
        super(props)

        this.state = { 

        }
        // bind me up baby
/*
        // loading this data here as it will never change
        const request = require('superagent')
        const auctionhouseURL = '/auctionhouse/auction/item/'
                                +this.state.item.item_id+'/'
        request.get(auctionhouseURL)
               .set('Accept', 'application/json')
               .set('Content-Type', 'application/json')
               .then(res => {
                    //console.log("[[ ItemPageController ]] -> constructor (After success!)")
                    this.setState({ auction: res.body.auction },
                                  () => {
                                        // need to set the current lot
                                        const lots = this.state.auction.lots
                                        const itemId = this.state.item.item_id
                                        let currLo = null
                                        lots.forEach(function(lot) {
                                            if (lot.item_id === itemId) {
                                                currLo = lot
                                            }
                                        });
                                        this.setCurrentLot(currLo)
                                  })
               })
               .catch(err => {
                    console.log(err)
               })
*/
        
    }
    
    componentDidMount() {
    
        console.log("[[ UserReviewsController -> componentDidMount [1] ]]")
        document.title = 'poptape auctions | '+Cookies.get('username')+' | reviews'
    }

    render() {
        const { classes } = this.props

        return (
            <Box>
                <Paper className={classes.paper}>
                <Typography className={classes.title}>
                    User reviews
                </Typography>
                <Box display="flex" flexDirection="row">
                    <Box className = {classes.menuBox}>
                        <SideMenu selected="reviews" />
                    </Box>
                    <Box flexGrow={1}>
                        Reviews stuff
                    </Box>
                </Box>
                </Paper>
            </Box>
        );
    }
}

export default withStyles(Styles)(UserReviewsController)
