import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Cookies from 'js-cookie'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import OwnerView from './OwnerView'
import BidderView from './BidderView'
import Gallery from '../helpers/Gallery'
import DisplayFields from './DisplayFields'

const Styles = theme => ({
    itemName: {
        marginBottom: 25,
        fontSize: "1.6em",
    },
    itemDescriptionColumn: {
        //backgroundColor: "orange",
    },
});

class ItemPageController extends Component {

    constructor(props){  
        super(props)

        this.state = { 
            showError: true,
            ownerView: false,
            ownerViewComp: null,
            bidderViewComp: null, 
            item: this.props.item || null,
            auction: null,
            currentLot: null,
        }
        // bind me up baby
        this.setCurrentLot = this.setCurrentLot.bind(this)
        this.setAuctionLotData = this.setAuctionLotData.bind(this)

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
        
    }
    
    setCurrentLot(lot) {
        this.setState({ currentLot: lot },
                      () => { this.setAuctionLotData() })
    }

    setAuctionLotData() {
        const ownerViewComp = 
                    <OwnerView
                        item = {this.state.item}
                        auction = {this.state.auction}
                        currentLot = {this.state.currentLot}
                    />

        this.setState({ ownerViewComp: ownerViewComp })

        const bidderViewComp = 
                    <BidderView
                        item = {this.state.item}
                        auction = {this.state.auction}
                        currentLot = {this.state.currentLot}
                    />
        this.setState({ bidderViewComp: bidderViewComp })
    }

    componentDidMount() {
    
        if (this.state.item) {
            //console.log("[[ ItemPageController -> componentDidMount [1] ]]")
            //console.log(this.state.item)
            if (this.state.item.public_id === Cookies.get('public_id')) {
                this.setState({ ownerView: true })
            }
            this.setState({ showError: false })
            document.title = 'poptape auctions | item | '+ this.state.item.name
        } else {
            document.title = 'poptape auctions | item'
        }

        //TODO: post to recently viewed for logged in users

    }

    render() {
        const { classes } = this.props

        return (
            <div style={{width: "100%"}}>
            {this.state.showError ?
                <div>
                    <Typography variant="h5" component="h5">
                        Item not supplied<br />
                    </Typography>
                </div>
            :
                <>
                <div>
                    <Typography className={classes.itemName} variant="h4" component="h4">
                        {this.state.item.name}
                    </Typography>
                </div>
                <Box display="flex" flexDirection="row">
                    <Box flex={5}>
                        {this.state.ownerView ?
                            <>
                            {this.state.ownerViewComp}
                            </>
                        :
                            <>
                            {this.state.bidderViewComp}
                            </>
                        }
                    </Box>
                    <Box flex={5} className={classes.itemDescriptionColumn}>
                        <Gallery 
                            item = {this.state.item}
                        />
                    </Box>
                </Box>
                <Box>
                    <DisplayFields
                        item = {this.state.item}
                    />
                </Box>
                </>
            }
            </div>
        );
    }
}

export default withStyles(Styles)(ItemPageController)
