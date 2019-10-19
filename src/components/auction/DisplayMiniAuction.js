import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import CustomizedSnackbars from '../information/CustomSnackbars'
//import Cookies from 'js-cookie'
//import Button from '@material-ui/core/Button'
//import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
//import nophoto from '../no-photo-icon-faded.png'
import AuctionCard from './AuctionCard'
import Timer from './Timer'
import SellerButtons from './SellerButtons'
import Card from '@material-ui/core/Card'
//import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import InfoIcon from '@material-ui/icons/Info'
import IconButton from '@material-ui/core/IconButton'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Icon from '@material-ui/core/Icon'
import CircularProgress from '@material-ui/core/CircularProgress'

import SellerInfoCard from '../seller/SellerInfoCard'
import AuctionOptions from '../auction/AuctionOptions'
import BidPlayerLarge from '../auction/BidPlayerLarge'

const styles = theme => ({
  dropzone: {
   fontSize: 12,
   padding: 10,
  },
  root: {
    padding: theme.spacing(3, 2),
  },
  displayLinebreak: {
    //padding: theme.spacing(3, 2),
    fontSize: "0.8em",
    whiteSpace: "pre-line"
  },
  itemName: {
    fontStyle: "italic"
  },
  divbuttons: {
    width: "100%",
  },
  dropbuttons: {
    textTransform: "none",
    marginRight: 20
  },
  buttons: {
    float: "right",
    marginLeft: 20
  },
  progress: {
    verticalAlign: "middle",
    textAlign: "center"
  },
  imageWrapper: {
    display: "flex",
    marginTop: 10,
    flexWrap: "wrap",
    marginBottom: 15,
  },
  carouselBox: {
    float: "right",
    width: "50%",
    height: 650,
  },
  auctionBox: {
    float: "left",
    width: "48%",
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    background: "#e6e2e1",
    padding: 10,
    //marginRight: 30,
  },
  blurb: {
    //display: "inline"
  },
  topSection: {
    overflow: "hidden",
    position: "relative",
    width: "100%",
  },
  purp: {
    color: "#9c27b0",
  },
  orange: {
    color: "#ff8f00"
  },
  red: {
    color: "#c9171f"
  },
  green: {
    color: "#349433"
  },
  main: {
    display: "flex",
    flexFlow: "row",
  },
  leftCol: {
    order: 1,
    flex: 1,
    minWidth: 210,
    //backgroundColor: "#ff8f00",
    padding: 5
  },
  card: {
    minWidth: 200,
    minHeight: 250,
  },
  rightCol: {
    order: 2,
    flex: 1,
    minWidth: "50%",
    //backgroundColor: "#349433",
    padding: 5
  },
  infoIcon: {
    color: "#9cd0ee",
    fontSize: "0.8em",
  },
  displayPrice: {
    marginTop: "9px"
  },
  auctionType: {
    fontSize: "1.2em",
  },
  watching: {
    display: "inline-flex",
    verticalAlign: "middle",
    lineHeight: "1.6em",
    color: "#1976d2",
    fontSize: "0.8em",
  },
  watchingBlurb: {
    marginLeft: 5,
  }
});


/*-----------------------------------------------------------------------------
 main component class
-----------------------------------------------------------------------------*/
//TODO: maybe wrap all auction components in a get auction data wrapper component 
// to which is passed the auction component(s) to display. Saves repeating calls to 
// the auction/auctionhouse microservices
class DisplayMiniAuction extends Component {

    constructor(props){  
        super(props);  
        const peckish = {
            "variant": "info",
            "message": "Added to auction"
        }

        this.state = { showSnack: false,
                       showError: true,
                       duration: 1900,
                       auctionType: 'English auction',
                       itemId: this.props.itemId,
                       timerComponent: 'Time passes',
                       bidPlayerComponent: 'Weeee',
                       itemOwner: this.props.itemOwner,
                       item: this.props.item,
                       date: new Date().getTime(),
                       peckish: peckish,
                       currentBestBid: null,
                       currentLot: {},
                       auction: {} }

        // check for passed in item_id
        if (this.props.itemId) {

            // this seems a very fiddly way to get the currentLot stuff 
            // just to load some components. sure there's a better way
            const setCurrentLot = (lot) => {
                this.setState({ currentLot: lot },
                              () => { 
                                      this.setState({
                                          timerComponent: 
                                              this.getTimerComp(
                                                  this.state.currentLot.end_time
                                              ) 
                                      })
                                      this.setState({
                                          bidPlayerComponent:
                                              this.getBidPlayerComp(
                                                  this.state.currentLot
                                              )
                                      })
                                    }
                             )
            }

            const request = require('superagent')
            const auctionhouseURL = '/auctionhouse/auction/item/'+this.state.itemId+"/"
            request.get(auctionhouseURL)
                   .set('Accept', 'application/json')
                   .set('Content-Type', 'application/json')
                   .then(res => {
                        this.state.showError = false
                        this.setState({ auction: res.body.auction },
                                      () => { 
                                            // need to set the current lot
                                            const lots = this.state.auction.lots
                                            const itemId = this.state.itemId
                                            lots.forEach(function(lot) {
                                                if (lot.item_id === itemId) {
                                                    //console.log(lot)
                                                    setCurrentLot(lot)
                                                }
                                            });
                                      })
                   })
                   .catch(err => {
                        console.log(err)
                        if (err.status === 401) {
                            const peckish = {
                                variant: "error",
                                message: "Sorry Dave, I can't let you do that"
                            }
                            this.setState({ peckish: peckish })
                        } else if (err.status === 502) {
                            const peckish = {
                                variant: "error",
                                message: "Computer says no"
                            }
                            this.setState({ peckish: peckish })
                        } else {
                            const peckish = {
                                variant: "warning",
                                message: "Something went bang"
                            }
                            this.setState({ peckish: peckish })
                        }
                        this.openSnack()
                   });
        }
        
        this.openSnack    = this.openSnack.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleButton = this.handleButton.bind(this)
        this.numberWithCommas = this.numberWithCommas.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.getCurrentBest = this.getCurrentBest.bind(this)
    }

    numberWithCommas = (n) => {
            return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    onSubmit = (bid) => {
        console.log("YEEEEA")
        console.log(bid)
    }

    getCurrentBest = (currentBest) => {
        console.log("[DisplayMiniAuction] CURRENT BEST") 
        console.log(currentBest)
        this.setState({ currentBestBid: currentBest })
    }

    handleChange = (e, key) => {
        const value = e.target.value
        this.setState({
            [key]: value
        })
    }

    handleButton = (e, aucType) => {
        console.log(":::::::")
        console.log(aucType)
    }

    // open snackbar
    openSnack = () => {
        if (this.state.showSnack === true) {
            this.setState({
                showSnack: false
            }, () => {
                this.setState({
                    showSnack: true
                });                
            });
        } else {        
            this.setState({
                showSnack: true
            });
        }
    }

    getTimerComp = (endTime) => {
        return ( 
            <Timer
                endTime = {endTime}
            />
        )
    } 

    getBidPlayerComp = (currentLot) => {
        return (
            <BidPlayerLarge
                item = {this.state.item}
                currentLot = {currentLot}
                getCurrentBest = {(currentBest) => {this.getCurrentBest(currentBest)}}
            />
        )
    }

    render() {
        const key_date = this.state.date
        const { classes } = this.props
        let displayPrice = null
        let reserveMessage = null

        // set some display prices here
        //if (this.state.currentLot.current_price) {
        if (this.state.currentBestBid) {
            displayPrice = this.state.currentBestBid.bid_amount
            displayPrice = this.numberWithCommas(displayPrice)
        } else if (this.state.currentLot.start_price) {
            displayPrice = this.state.currentLot.start_price
            displayPrice = this.numberWithCommas(displayPrice)
        }

        if (this.state.currentLot.reserve_price &&
            this.state.currentBestBid) {
            reserveMessage = this.state.currentBestBid.reserve_message
        }

/*
        if (this.state.currentLot.reserve_price &&
            this.state.currentLot.current_price && 
            this.state.currentLot.reserve_price > this.state.currentLot.current_price ) {
            reserveMessage = 'Reserve not met'
        } else if (this.state.currentLot.reserve_price) {
            reserveMessage = 'Reserve not met'
        } else if (this.state.currentLot.reserve_price && 
                   this.state.currentLot.current_price &&
                   this.state.currentLot.current_price >= this.state.currentLot.reserve_price ) {
            reserveMessage = 'Reserve met'
        }
*/
        return (
            <div>
            {this.state.showError ?
                <div style={{width: "100%", margin: 6 }}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h5">
                                Auction details...<br />
                            </Typography>
                            <div className={classes.progress}>
                            <br /><br /><CircularProgress />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            :
                <div>
                <div className={classes.main}>
                    <div className={classes.leftCol}>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography variant="h5">
                                    <span className={classes.auctionType}>{this.state.auctionType}</span>
                                    <IconButton aria-label={`Info about auction type`} className={classes.infoIcon}>
                                        <InfoIcon />
                                    </IconButton>
                                    <br />
                                </Typography>
                                {this.state.timerComponent}
                                {displayPrice ?
                                    <>
                                    <Typography variant="h4" className={classes.displayPrice}>
                                        £{displayPrice}
                                    </Typography>
                                    </>
                                :
                                    <>
                                    <Typography variant="h5" className={classes.displayPrice}>
                                        <span className={classes.orange}>No starting price!</span><br />
                                    </Typography>
                                    </>
                                }
                                {!reserveMessage ?
                                    <>
                                    <Typography variant="subtitle1">
                                        <span className={classes.red}>No reserve!</span><br />
                                    </Typography>
                                    </>
                                :
                                null
                                }
                                {reserveMessage === "Reserve met" ?
                                    <>
                                    <Typography variant="subtitle1">
                                        <span className={classes.green}>{reserveMessage}</span><br />
                                    </Typography>
                                    </> 
                                :
                                null
                                }
                                {reserveMessage === "Reserve not met" ?
                                    <>
                                    <Typography variant="subtitle1">
                                        <span className={classes.orange}>{reserveMessage}</span><br />
                                    </Typography>
                                    </>
                                : 
                                null                                    
                                }
                                {reserveMessage === "Reee" ?
                                    <>
                                    <Typography variant="subtitle1">
                                        <span className={classes.purp}>{reserveMessage}</span><br />
                                    </Typography>
                                    </>
                                :
                                null   
                                }
                                <div color='primary' className={classes.watching}>
                                        <Icon><VisibilityIcon /></Icon><span className={classes.watchingBlurb}> 12 people watching<br /></span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className={classes.rightCol}>
                        {!this.state.itemOwner ?
                            <AuctionCard
                                onSubmit = {(bid) => {this.onSubmit(bid)}}
                                minBid = {10000}
                            />
                        :
                            <SellerButtons />
                        }
                    </div>
                </div>
                        {!this.state.itemOwner ?
                            <div>
                            <SellerInfoCard
                                publicId = {this.state.item.public_id}
                            />
                            <AuctionOptions
                                publicId = {this.state.item.public_id}
                                itemId = {this.state.item.item_id}
                            />
                            </div>
                        :
                            <>
                            {this.state.bidPlayerComponent}
                            </>
                        }
</div>
            }

            {this.state.showSnack ?
                <CustomizedSnackbars
                    duration = {this.state.duration}
                    key_date = {key_date}
                    variant  = {this.state.peckish.variant}
                    message  = {this.state.peckish.message}
                />
            : null
            }
            </div>
        );
    }
}

export default withStyles(styles)(DisplayMiniAuction)
