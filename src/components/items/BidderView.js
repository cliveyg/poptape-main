import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Cookies from 'js-cookie'
import Box from '@material-ui/core/Box'
import BidViewer from '../auction/BidViewer'
import AuctionCard from '../auction/AuctionCard'
import InformationBox from '../auction/InformationBox'
import SellerInfoCard from '../seller/SellerInfoCard'

const Styles = theme => ({
    bidderBox: {
        borderRadius: 10,
        width: "100%", 
        //backgroundColor: "red",
        //backgroundColor: "#e0e2e4",
        //backgroundColor: "#e7e6e6",
    },
    paddingBeLess: {
        padding: 2,
    //backgroundColor: "red",
    },
});

class BidderView extends Component {

    constructor(props){  
        super(props)

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
        this.gotBid = this.gotBid.bind(this)
        this.updateBidData = this.updateBidData.bind(this)
        this.setBidViewer = this.setBidViewer.bind(this)
        this.updateBidsFromMessage = this.updateBidsFromMessage.bind(this)
        this.calculateMinimumBid = this.calculateMinimumBid.bind(this)
        
        this.getBidDataFromAuctionHouse(this.state.currentLot.lot_id)

    } // end of constructor 

    gotBid(bid) {
        //console.log("[[ ItemViewer ]] -> gotBid")
        if (!this.state.websocket) {
            // create websocket and send bid
            this.createWebsocket(bid)
        } else {
            // send bid to auction ms
            if (this.state.websocket.readyState === WebSocket.CLOSED) {
                this.createWebsocket(bid)
            } else {
                this.state.websocket.send(
                    JSON.stringify({ "x-access-token":  Cookies.get('access-token'),
                                     "username": Cookies.get('username'),
                                     "lot_id": this.state.currentLot.lot_id,
                                     "bid_amount": bid.toString() })
                )
            }
        }
    }

    createWebsocket(bid) {
        //console.log("[[ BidderView ]] -> createWebsocket")
        const wsHost = "wss://poptape.club/auction/bid/"+
                       this.state.auction.auction_id+
                       "/"+this.state.currentLot.lot_id
        const websocket = new WebSocket(wsHost, "json")
        websocket.onopen = (evt) => {
            websocket.send(
                JSON.stringify({ "x-access-token":  Cookies.get('access-token'),
                                 "username": Cookies.get('username'), 
                                 "lot_id": this.state.currentLot.lot_id,
                                 "bid_amount": bid.toString() })
            )
            this.getBidDataFromAuctionHouse(this.state.currentLot.lot_id) 
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
            totalBids = this.state.allBids
            // check if bids already exist for us - either via
            // auctionhouse or rabbit messages
            if (totalBids.some(bid => bid.bid_id === messageData.bid_id)) {
                // already in this.state.allBids so do nowt
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
        //this.getBidDataFromAuctionHouse(this.state.currentLot.lot_id)
    }

    calculateMinimumBid() {
        if (this.state.currentLot) {
            let miniChange = 0
            if (typeof(this.state.currentLot.min_increment) !== 'undefined') {
                miniChange = parseFloat(this.state.currentLot.min_increment)
            } else if (typeof(this.state.currentLot.min_decrement) !== 'undefined') { 
                miniChange = -parseFloat(this.state.currentLot.min_decrement)
            }
            if (this.state.currentBestBid) {
                return parseFloat(this.state.currentBestBid.bid_amount) + miniChange 
            } else if (this.state.currentLot.start_price) {
                return parseFloat(this.state.currentLot.start_price) + miniChange
            } else {
                return 0
            } 
        }
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
                        <AuctionCard 
                            gotBid = {(bid) => {this.gotBid(bid)}}
                            minBid = {this.calculateMinimumBid()}
                        />
                    </Box>
                </Box>
                <Box>
                    <SellerInfoCard
                        publicId = {this.state.auction.public_id}
                        auction = {this.state.auction}
                        itemLocation = {this.state.item.location}
                    />
                </Box>
                <Box>
                    { this.state.bidViewerComp }
                    <br />
                </Box>
            </div>
        );
    }
}

export default withStyles(Styles)(BidderView)
