import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import blue from '@material-ui/core/colors/blue'
import AvatarChooser from '../helpers/AvatarChooser'
import Cookies from 'js-cookie'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const Styles = theme => ({
  card: {
    margin: 6,
    minWidth: 275,
    minHeight: 200,
  },
  title: {
    fontSize: "1.2em",
  },
  cardActs: {
    paddingTop: 0,
    paddingLeft: 8,
    paddingRight: 8,
  },
  linky: {
    //color: blue[900],
    color: blue[700],
    "&:visited": {
      //color: blue[900],
      color: blue[700],
    },
    textDecoration: "none",
  },
  progress: {
    verticalAlign: "middle",
    textAlign: "center"
  },
  username: {
    //fontSize: "1.2em",
    //width: 150
  },
  smallbutts: {
    textTransform: "none",
    marginRight: 10
  },
  usernameContainer: {
    display: "flex",
    flexFlow: "row",
  },
  bidderContainer: {
    //display: "flex",
    //flexFlow: "row",
  },
  avatar: {
    order: 1,
    flex: 1,
    //width: 17,
    maxWidth: 30,
    verticalAlign: "middle",
    height: "100%",
  },
  userDetails: {
    order: 2,
    flex: 1,
    align: "left",
    verticalAlign: "middle",
    //minWidth: 90,
    height: "100%",
  },
  amount: {
    fontWeight: "bold",
  },
  tableHead: {
    fontWeight: "bold",
  },
  message: {
    width: "40%",
  },
  status: {
    width: "20%",
  },
  smaller: {
    fontSize: "0.6em",
    marginLeft: 8,
  },
  cwUser: {
    fontSize: "0.6em",
    //marginLeft: 8,
    fontWeight: "bold",
    color: "#1976d2",
  },
  cwNoOne: {
    //marginLeft: 8,
    fontWeight: "bold",    
    fontSize: "0.6em",
    color: "#b0bec5",
  },
  best: {
    backgroundColor: "#c5e1a5",
  }
});


class BidPlayerLarge extends Component {

    constructor(props) { 
        super(props)
        console.log("[BidPlayerLarge]")

        this.state = { showCard: false,
                       lines: [],
                       dataLoaded: false,
                       currentBest: null,
                       currentLot: props.currentLot,
                       ws: null,
                       allBids: [] }

        this.buildRows = this.buildRows.bind(this)
        this.testAdd = this.testAdd.bind(this)
        this.passBackToDad = this.passBackToDad.bind(this)
        this.numberForDisplay = this.numberForDisplay.bind(this)
        this.check = this.check.bind(this)

        // we need to get data from two places - the auctioneer and the auctionhouse
        // this is so we can make sure we have all the data. we may even have dupes 
        // that we need to get rid of
        const request = require('superagent')
        const auctionhouseURL = '/auctionhouse/auction/lot/'+props.currentLot.lot_id+'/'
        request.get(auctionhouseURL)
               .set('Accept', 'application/json')
               .set('Content-Type', 'application/json')
               .then(res => {
                    this.setState({ allBids: res.body.bids })
                    const bidLines = this.buildRows(res.body.bids)
                    let bidLinesArr = ''
                    if (bidLines.length === 1) {
                        bidLinesArr = [bidLines] 
                    } else {
                        bidLinesArr = bidLines
                    }
                    this.setState({ lines: bidLinesArr },
                                  () => { this.setState({ dataLoaded: true  },
                                        () => { this.setState({ showCard: true })})})
                })
               .catch(err => {
                    console.log(err)
                })
    } // end of constructor

    componentDidMount() {
        this.connect()
    }

    connect() {
       
        const wsURL = "wss://poptape.club/auction/seller/"+this.state.currentLot.lot_id 
        const ws = new WebSocket(wsURL, "json")
        let that = this; // cache the this
        var connectInterval

        // websocket onopen event listener
        ws.onopen = () => {
            console.log("connected websocket main component")
            this.setState({ ws: ws })
            that.timeout = 2500 // reset timer to 250 on open of websocket connection 
            clearTimeout(connectInterval) // clear Interval on on open of websocket connection
            ws.send(JSON.stringify({ "x-access-token":  Cookies.get('access-token') }))
        }

        // websocket onclose event listener
        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                )} second.`,
                e.reason
            )

            that.timeout = that.timeout + that.timeout //increment retry interval
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)) //call check function after timeout
        }

        ws.onmessage = evt => {
            console.log("YOU GOT MAIL!")
            // here we need to check messages against our state var allBids 
            const messageData = JSON.parse(evt.data)
            let totalBids = []
            totalBids = this.state.allBids
            if (typeof(messageData.bid_id) !== 'undefined') {
                if (totalBids.some(bid => bid.bid_id === messageData.bid_id)) {
                    // do nowt
                } else {
                    // this might be a bit unsafe. i'm assuming that a new bid id 
                    // means it's the latest bid and to put it first in the array
                    // TODO: may need to revisit this
                    
                    totalBids.unshift(messageData)
                    const bidLines = this.buildRows(totalBids)
                    this.setState({ lines: bidLines }, 
                                  () => { this.setState({ allBids: totalBids })})
                }
            } 
        }

        // websocket onerror event listener
        ws.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            )

            ws.close()
        }
    }

    check() {
        const ws  = this.state.ws
        if (!ws || ws.readyState === WebSocket.CLOSED) this.connect() //check if websocket instance is closed, if so call `connect` function.
    }

    passBackToDad() {
        if (this.props.getCurrentBest) this.props.getCurrentBest(this.state.currentBest)
    }

    numberForDisplay(n) {
            return '£'+n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    buildRows(bids) {
        const { classes } = this.props
        
        const bidLines = bids.map((bid, idx) => {

            if (this.state.currentBest === null &&
                bid.bid_status === 'winning' ) {
                this.setState({ currentBest: bid},
                              () => { this.passBackToDad() }) 
            } else if (this.state.currentBest !== null &&
                       bid.bid_status === 'winning' &&
                       bid.bid_id !== this.state.currentBest.bid_id &&
                       parseFloat(bid.bid_amount) > parseFloat(this.state.currentBest.bid_amount)) {
                //const bidAmt = parseFloat(bid.bid_amount).toFixed(2)
                bid.bid_amount = parseFloat(bid.bid_amount).toFixed(2)
                this.setState({ currentBest: bid},
                              () => { this.passBackToDad() })
            }
            return  <TableRow key={bid.bid_id}>
                       <TableCell align="left" className={classes.username}>
                           <div className={classes.usernameContainer}>
                               <div className={classes.avatar}>
                                   <AvatarChooser
                                       avatarName="random"
                                       avatarSize="small"
                                   />  
                               </div>
                               <div className={classes.userDetails}>{bid.username}</div>
                           </div>
                       </TableCell>
                       <TableCell
                            className={classes.amount}
                            align="left"
                        >{this.numberForDisplay(bid.bid_amount)}</TableCell>
                        <TableCell align="left" component="th" scope="row">{bid.message}</TableCell>
                        <TableCell align="left">{bid.bid_status}</TableCell>
                    </TableRow>
        })
        return bidLines
    }

    testAdd(e) {
        console.log("[BidPlayerLarge] testAdd()")
        const uuidv4 = require('uuid/v4');
        const uuid = uuidv4()

        function randomIntFromInterval(min, max) { // min and max included 
          return Math.floor(Math.random() * (max - min + 1) + min);
        }

        if (this.state.dataLoaded) {
            let biddy = []
            biddy = this.state.allBids

            let min = Math.round(this.state.currentBest.bid_amount - 700)
            let max = Math.round(this.state.currentBest.bid_amount + 1000)
            let randBid = randomIntFromInterval(min, max) + 200
            let randStat = 'quack'
            if (randBid > this.state.currentBest.bid_amount) {
                randStat = 'winning'
            } else {
                randStat = 'failed'
            }

            let newBid = { 
                           username: 'mikiemouse',
                           bid_id: uuid,
                           bid_amount: randBid,
                           bid_status: randStat,
                           reserve_message: 'Reserve met',
                           message: 'yippee kaiyay'
                         }
            biddy.unshift(newBid)

            const bidLines = this.buildRows(biddy)
            this.setState({ lines: bidLines }, 
                          () => { this.setState({ allBids: biddy })})
        }
    }
    

    render() {
        const { classes } = this.props
        //<span className={classes.smaller}>(most recent first)</span>
        return (
            <Card className={classes.card}>
              {this.state.showCard ?
              <>
              <CardContent style={{ marginBottom: 0, paddingBottom: 5}}>
                {this.state.currentBest ?
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Bidding information<br />
                        <span className={classes.cwUser}>{this.state.currentBest.username} is currently winning with a bid of {this.numberForDisplay(this.state.currentBest.bid_amount)}</span>
                    </Typography>
                :
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Bidding information<br />
                        <span className={classes.cwNoOne}>No-one is currently winning this lot</span>
                    </Typography>
                }
                <div className={classes.bidderContainer}>
                    <div style={{ overflow: 'auto', height: '300px' }}>
                    <Table stickyHeader size="small" aria-label="bid table">
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.tableHead}>Bidder</TableCell>
                          <TableCell className={classes.tableHead} align="left">Bid</TableCell>
                          <TableCell className={classes.tableHead} align="left">Message</TableCell>
                          <TableCell className={classes.tableHead} align="left">Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>{this.state.lines}</TableBody>
                    </Table>
                    </div>
                </div>
              </CardContent>
                      <Button
                        variant="contained"
                        onClick={(e) => this.testAdd(e)}
                      >
                        Add Row Test
                      </Button>
              </>
              :
              <>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Bidding information
                </Typography>
                <div className={classes.progress}>
                    <br /><CircularProgress />
                </div> 
              </CardContent>
              </> 
              }     
            </Card>
        );
    }
}

export default withStyles(Styles)(BidPlayerLarge)
