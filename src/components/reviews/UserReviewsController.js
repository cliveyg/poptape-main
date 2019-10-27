import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Cookies from 'js-cookie'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const Styles = theme => ({
    itemName: {
        marginBottom: 25,
        fontSize: "1.6em",
    },
    itemDescriptionColumn: {
        //backgroundColor: "orange",
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
            <Box style={{width: "100%"}}>
                <Typography variant="h5" component="h5">
                    User reviews<br />
                </Typography>
            </Box>
        );
    }
}

export default withStyles(Styles)(UserReviewsController)
