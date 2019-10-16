import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import CustomizedSnackbars from '../information/CustomSnackbars'
import Cookies from 'js-cookie'
//import Button from '@material-ui/core/Button'
//import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
//import nophoto from '../no-photo-icon-faded.png'
import AuctionCard from './AuctionCard'
import Card from '@material-ui/core/Card'
//import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import InfoIcon from '@material-ui/icons/Info'
import IconButton from '@material-ui/core/IconButton'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Icon from '@material-ui/core/Icon'
import CircularProgress from '@material-ui/core/CircularProgress'

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
                       showTime: '',
                       auctionType: 'English auction',
                       time: {}, 
                       seconds: 0,
                       itemId: this.props.itemId,
                       date: new Date().getTime(),
                       peckish: peckish,
                       currentLot: {},
                       auction: {} }

        this.startTimer = this.startTimer.bind(this)
        this.displayTimer = this.displayTimer.bind(this)

        // check for passed in item_id
        if (this.props.itemId) {
            //this.state.showError = false

            const setOriginalTime = () => {
                // get end time and find seconds to go
                let t1 = new Date(this.state.currentLot.end_time)
                //console.log(t1.getTime())
                let now = new Date().getTime()
                //console.log(now)
                let diff = t1.getTime() - now

                this.setState({ seconds: diff/1000 },
                          () => { this.startTimer()})
            }

            const setCurrentLot = (lot) => {
                this.setState({ currentLot: lot },
                              () => { setOriginalTime()
                                      this.displayTimer() })
            }

            const request = require('superagent')
            const auctionhouseURL = '/auctionhouse/auction/item/'+this.state.itemId
            request.get(auctionhouseURL)
                   .set('Accept', 'application/json')
                   .set('Content-Type', 'application/json')
                   .set('x-access-token', Cookies.get('access-token'))
                   .then(res => {
                        console.log("Auction data found!!!")
                        this.state.showError = false
                        this.setState({ auction: res.body.auction },
                                      () => { 
                                            //console.log(this.state.auction)
                                            // need to set the current lot
                                            const lots = this.state.auction.lots
                                            const itemId = this.state.itemId
                                            lots.forEach(function(lot) {
                                                if (lot.item_id === itemId) {
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
        this.timer = 0
        //this.startTimer = this.startTimer.bind(this)
        this.countDown = this.countDown.bind(this)
        this.numberWithCommas = this.numberWithCommas.bind(this)
        //this.displayTimer = this.displayTimer.bind(this)
        //this.startTimer()
    }

    numberWithCommas = (n) => {
            return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    secondsToTime = (secs) => {

        let days = Math.floor(secs / (3600*24));
        let hours = Math.floor(secs % (3600*24) / 3600);
        let minutes = Math.floor(secs % 3600 / 60);
        let seconds = Math.floor(secs % 60);
        
        let obj = {
            "d": days,
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
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

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds)
        this.setState({ time: timeLeftVar })
    }

    startTimer = () => {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown = () => {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        })
    
        // Check if we're at zero.
        if (seconds === 0) { 
            clearInterval(this.timer);
        }
    }

    displayTimer = () => {

        if (this.state.currentLot.end_time && 
            new Date(this.state.currentLot.end_time).getTime() < new Date().getTime()) {
           return(
                <Typography style={{color: "#c9171f"}} variant="h5">
                    <span>Auction finished!<br /></span>
                </Typography>
            )            
        }

        if (this.state.time.d > 1) {
           return( 
                <Typography variant="subtitle1">
                    <span>Time left: &nbsp;{this.state.time.d}d {this.state.time.h}h<br /></span>
                </Typography>
            )
        } else if (this.state.time.d === 1) {
            return(
                <Typography variant="subtitle1">
                    <span>Time left: &nbsp;{this.state.time.d}d {this.state.time.h}h {this.state.time.m}m<br /></span>
                </Typography>
            )
        } else if (this.state.time.d === 0) {
            return(
                <Typography variant="subtitle1">
                    <span>Time left: &nbsp;{this.state.time.h}h {this.state.time.m}m {this.state.time.s}s<br /></span>
                </Typography>
             )
        } else if (this.state.time.d === 0 && this.state.time.h === 0) {
            return(
                <Typography variant="subtitle1">
                    <span>Time left: &nbsp;{this.state.time.m}m {this.state.time.s}s<br /></span>
                </Typography>
             )            
        }
    }

    render() {
        const key_date = this.state.date
        const { classes } = this.props
        let displayPrice = null
        let reserveMessage = null

        // set some display prices here
        if (this.state.currentLot.current_price) {
            displayPrice = this.state.currentLot.current_price
            displayPrice = this.numberWithCommas(displayPrice)
        } else if (this.state.currentLot.start_price) {
            displayPrice = this.state.currentLot.start_price
            displayPrice = this.numberWithCommas(displayPrice)
        }

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
                                {this.displayTimer()}
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
                                <div color='primary' className={classes.watching}>
                                        <Icon><VisibilityIcon /></Icon><span className={classes.watchingBlurb}> 12 people watching<br /></span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className={classes.rightCol}>
                        <AuctionCard />
                    </div>
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
