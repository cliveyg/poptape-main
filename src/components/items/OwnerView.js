import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Cookies from 'js-cookie'
import Box from '@material-ui/core/Box'
import BidViewer from '../auction/BidViewer'
import SellerButtons from '../auction/SellerButtons'
import InformationBox from '../auction/InformationBox'

const Styles = theme => ({
    ownerBox: {
        borderRadius: 10,
        width: "100%",
        //backgroundColor: "red",
        //backgroundColor: "#e0e2e4",
        //backgroundColor: "#e7e6e6",
    }
});

class OwnerView extends Component {

    constructor(props){  
        super(props)
        console.log("[[ OwnerView ]] -> constructor")
        this.state = {
            item: this.props.item || null,
            auction: this.props.auction || null,
            currentLot: this.props.currentLot || null,
            currentBestBid: null,
            allBids: null,
            websocket: null,
            bidViewerComp: null,
        }

        // bind me baby
        this.createWebsocket = this.createWebsocket.bind(this)
        this.updateBidData = this.updateBidData.bind(this)
        this.setBidViewer = this.setBidViewer.bind(this)
        this.updateBidsFromMessage = this.updateBidsFromMessage.bind(this)
        this.onAction = this.onAction.bind(this)

        this.getBidDataFromAuctionHouse(this.state.currentLot.lot_id)

    }

    createWebsocket() {
        //console.log("[[ OwnerView ]] -> createWebsocket")
        const wsURL = "wss://poptape.club/auction/seller/"+
                      this.state.currentLot.lot_id
        const websocket = new WebSocket(wsURL, "json")
        websocket.onopen = (evt) => {
            websocket.send(
                JSON.stringify({ "x-access-token":  Cookies.get('access-token'),
                                 "lot_id": this.state.currentLot.lot_id })
            )
            //this.getBidDataFromAuctionHouse(this.state.currentLot.lot_id)
        }
        websocket.onmessage = (evt) => {
            const message = JSON.parse(evt.data)
            this.updateBidsFromMessage(message)
            //this.getBidDataFromAuctionHouse(this.state.currentLot.lot_id)
        }
        websocket.onerror = (evt) => {
            console.log("Something went bang!")
            console.log(evt)
        }
        websocket.onclose = (evt) => {
            //console.log("websocket closed")
            this.getBidDataFromAuctionHouse(this.state.currentLot.lot_id)
        }
        this.setState({ websocket: websocket })
    }

    updateBidsFromMessage(messageData) {

        if (typeof(messageData.bid_id) !== 'undefined') {
            let totalBids = []
            // check if bids already exist for us - either via
            // auctionhouse or rabbit messages
            if (this.state.allBids !== null) {
                totalBids = this.state.allBids
                if (totalBids.some(bid => bid.bid_id === messageData.bid_id)) {
                    // already in this.state.allBids so do nowt
                } else {
                    totalBids.unshift(messageData)
                    this.setState({ allBids: totalBids },
                          () => { this.updateBidData(totalBids) })
                }
            } else {
                totalBids.unshift(messageData)
                this.setState({ allBids: totalBids },
                      () => { this.updateBidData(totalBids) })
            } 
        }

    }

    getBidDataFromAuctionHouse(lot_id) {
        const request = require('superagent')
        const auctionhouseURL = '/auctionhouse/auction/lot/'+lot_id+'/'
        request.get(auctionhouseURL)
               .set('Accept', 'application/json')
               .set('Content-Type', 'application/json')
               .then(res => {
                    // need to set the current best bid
                    this.setState({ allBids: res.body.bids })
                    this.updateBidData(res.body.bids)
               })
               .catch(err => {
                    console.log(err)
               })
    }

    setBidViewer() {
        const bidViewer =
            <BidViewer
                currentBestBid = {this.state.currentBestBid}
                allBids = {this.state.allBids}
                viewerSize = "large"
            />
        this.setState({ bidViewerComp: bidViewer })
    }

    updateBidData(bids) {
        for (const bid of bids) {
            if (this.state.currentBestBid === null &&
                (bid.bid_status === 'winning' || bid.bid_status === 'none' )) {
                this.setState({ currentBestBid: bid},
                              () => { this.setBidViewer() })
            } else if (this.state.currentBestBid !== null &&
                       bid.bid_status === 'winning' &&
                       bid.bid_id !== this.state.currentBestBid.bid_id &&
                       parseFloat(bid.bid_amount) > parseFloat(this.state.currentBestBid.bid_amount)) {
                bid.bid_amount = parseFloat(bid.bid_amount).toFixed(2)
                this.setState({ currentBestBid: bid},
                              () => { this.setBidViewer() })
            }
        }
        this.setBidViewer()
    }

    componentDidMount() {
        if (!this.state.auction) console.log("NO AUCTION!")
        if (!this.state.currentLot) console.log("NO CURRENT LOT!")
        if (!this.state.item) console.log("NO ITEM!")
        this.createWebsocket()
    }

    onAction = (sellerAction) => {
        console.log("[[ OwnerView ]] -> onAction")
        console.log("Action is ["+sellerAction+"]")
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.bidderBox}>
                <Box display="flex" flexDirection="row">
                    <Box flex={1}>
                        <InformationBox
                            currentLot = {this.state.currentLot}
                            auction = {this.state.auction}
                            item = {this.state.item}
                            currentBestBid = {this.state.currentBestBid}
                        />  
                    </Box>
                    <Box flex={1}>
                        <SellerButtons
                            onAction = {(sellerAction) => {this.onAction(sellerAction)}}
                        />
                    </Box>
                </Box>
                <Box>
                    { this.state.bidViewerComp }
                    <br />
                </Box>
            </div>
        );
    }
}

export default withStyles(Styles)(OwnerView)
