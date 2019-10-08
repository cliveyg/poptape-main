import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import CustomizedSnackbars from '../information/CustomSnackbars'
import Cookies from 'js-cookie'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import nophoto from '../no-photo-icon-faded.png'

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
  }
});

// the timer component for displaying countdowns
class Timer extends Component {
    render() {
        return (
            <div>
                <h5 style={{ fontSize: 20, marginLeft:100 }}>
                    {this.props.minutes}:{this.props.seconds}
                </h5>
            </div>
        );
   }
}

/*-----------------------------------------------------------------------------
 main component class
-----------------------------------------------------------------------------*/
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
                       time: {}, 
                       seconds: 0,
                       itemId: this.props.itemId,
                       date: new Date().getTime(),
                       peckish: peckish,
                       currentLot: {},
                       auction: {} }

        this.startTimer = this.startTimer.bind(this)

        // check for passed in item_id
        if (this.props.itemId) {
            this.state.showError = false

            const setOriginalTime = () => {
                // get end time and find seconds to go
                let t1 = new Date(this.state.currentLot.end_time)
                console.log(t1.getTime())
                let now = new Date().getTime()
                console.log(now)
                let diff = t1.getTime() - now

                this.setState({ seconds: diff/1000 },
                          () => { this.startTimer()})
            }

            const setCurrentLot = (lot) => {
                this.setState({ currentLot: lot },
                              () => { setOriginalTime() })
            }

            const request = require('superagent')
            const auctionhouseURL = '/auctionhouse/item/'+this.state.itemId
            request.get(auctionhouseURL)
                   .set('Accept', 'application/json')
                   .set('Content-Type', 'application/json')
                   .set('x-access-token', Cookies.get('access-token'))
                   .then(res => {
                        this.setState({ auction: res.body.auction },
                                      () => { 
                                            console.log(this.state.auction)
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
        //this.startTimer()
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

    render() {
        const key_date = this.state.date
        const { classes } = this.props

        return (
            <div>
            {this.state.showError ?
                <div>
                    <Typography variant="h5" component="h5">
                        Item not supplied<br />
                    </Typography>
                </div>
            :
                <div>
                    <div>
                        <Typography variant="h5" component="h5">
                            <b>Auction Me Baby!</b><br /><br />
                        </Typography>
                        {this.state.time.d > 1 ?
                        <span>Time left: &nbsp;{this.state.time.d}d {this.state.time.h}h<br /></span>
                        :
                        <span>Time left: &nbsp;{this.state.time.d}d {this.state.time.h}h {this.state.time.m}m {this.state.time.s}s<br /></span>
                        }
                        {this.state.currentLot.start_price > 0 ?
                            <>
                            <h2>£{this.state.currentLot.start_price}</h2>
                            </>
                        :
                            <>
                            <span className={classes.orange}>No starting price!</span><br />
                            </>
                        }
                        {!this.state.currentLot.reserve_price ?
                            <>
                            <span className={classes.red}>No reserve!</span><br />
                            </>
                        :
                            null
                        }
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
