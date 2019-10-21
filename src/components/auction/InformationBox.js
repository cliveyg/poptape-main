import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Timer from './Timer'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import InfoIcon from '@material-ui/icons/Info'
import IconButton from '@material-ui/core/IconButton'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Icon from '@material-ui/core/Icon'

const styles = theme => ({
  progress: {
    verticalAlign: "middle",
    textAlign: "center"
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
  card: {
    marginBottom: 5,
    marginRight: 5,
    marginTop: 10,
    marginLeft: 10,
    minWidth: 200,
    minHeight: 240,
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
class InformationBox extends Component {

    constructor(props){  
        super(props);  

        this.state = { 
            timerComponent: null,
            item: this.props.item || null,
            auction: this.props.auction || null,
            currentLot: this.props.currentLot || null,
            currentBestBid: props.currentBestBid || null,
            auctionType: null,
            peopleWatching: this.props.peopleWatching || 0,
        }
        
        this.numberWithCommas = this.numberWithCommas.bind(this)
    }

    componentDidMount() {
        if (!this.state.auction) console.log("NO AUCTION!")
        if (!this.state.currentLot) console.log("NO CURRENT LOT!")
        if (!this.state.item) console.log("NO ITEM!")
        //if (!this.state.currentBestBid) console.log("NO CURRENT BESTBID!")
        this.setState({
            timerComponent: this.getTimerComp(this.state.currentLot.end_time)
        })
        let aType = null
        switch (this.state.auction.type) {
            case "EN": aType = "English auction"
                       break
            case "DU": aType = "Dutch auction"
                       break
            case "BN": aType = "Buy now"
                       break
            default:   aType = null
                      
        }
        this.setState({ auctionType: aType })
    }

    numberWithCommas = (n) => {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    getTimerComp = (endTime) => {
        return ( 
            <Timer
                endTime = {endTime}
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
        //console.log("[[ InformationBox  ]] -> render() currentBestBid is ["+this.props.currentBestBid+"]") 
        if (this.props.currentBestBid) {
            displayPrice = this.numberWithCommas(this.props.currentBestBid.bid_amount)
        } else if (this.state.currentLot.start_price) {
            displayPrice = this.numberWithCommas(this.state.currentLot.start_price)
        }

        if (this.state.currentLot.reserve_price &&
            this.props.currentBestBid) {
            reserveMessage = this.props.currentBestBid.reserve_message
        }

        return (
            <div>
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
                            <Typography variant="h3" className={classes.displayPrice}>
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
                                <Icon><VisibilityIcon /></Icon>
                                <span className={classes.watchingBlurb}> {this.state.peopleWatching} people watching<br /></span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(InformationBox)
