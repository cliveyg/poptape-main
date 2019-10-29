import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Favorite from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import CircularProgress from '@material-ui/core/CircularProgress'
import blue from '@material-ui/core/colors/blue'
import AvatarChooser from '../helpers/AvatarChooser'
import Box from '@material-ui/core/Box'
import Cookies from 'js-cookie'
import CustomizedSnackbars from '../information/CustomSnackbars'

const Styles = theme => ({
  card: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    minWidth: 275,
  },
  paddingBeLess: {
    paddingLeft: 2,
    paddingRight: 2,
    paddingBottom: 2,
    paddingTop: 0,
    //backgroundColor: "red",
  },
  title: {
    fontSize: "1.0em",
  },
  linky: {
    color: blue[700],
    "&:visited": {
      color: blue[700],
    },
    textDecoration: "none",
  },
  progress: {
    verticalAlign: "middle",
    textAlign: "center"
  },
  username: {
    fontSize: "1.2em",
  },
  smallbutts: {
    textTransform: "none",
    marginRight: 0,
    //marginTop: 5,
  },
  payDetails: {
    fontSize: "0.75em",
    textAlign: "top",
  },
});

class SellerInfoCard extends Component {

    constructor(props){
        super(props)
        const peckish = {
            "variant": "info",
            "message": "You must be logged in to save a favourite"
        }
     
        this.state = {
            showCard: false,
            showSnack: false,
            date: new Date().getTime(),
            peckish: peckish,
            duration: 1400,
            reviews: 0,
            publicId: this.props.publicId,
            auction: this.props.auction, 
            itemLocation: this.props.itemLocation,
            favChecked: false,
            favText: "Save this seller",
            username: null,
            loaded: false
        }
        this.callAuthyAndReviews = this.callAuthyAndReviews.bind(this)
    } 

    componentDidMount() {
        this.callAuthyAndReviews()
        //this.setState({ loaded: true },
        //              () => { this.setState({ showCard: true })})
        //console.log(this.state.auction)
    }

    callAuthyAndReviews() {
        const request = require('superagent')
        request.get('/authy/username/'+this.state.publicId)
               .set('Accept', 'application/json')
               .set('Content-Type', 'application/json')
               .then(res => {
                    this.setState({ username: res.body.username },
                    () => {
                        const request2 = require('superagent')
                        request2.get('/reviews/of/user/'+this.state.publicId+'?totalonly=true')
                        .set('Accept', 'application/json')
                        .set('Content-Type', 'application/json')
                        .then(res => {
                            this.setState({ reviews: res.body.total_reviews },
                            () => {
                                this.callFavourites()
                                this.setState({ loaded: true },
                                              () => { this.setState({ showCard: true })})
                            })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                    })

                })
               .catch(err => {
                    console.log(err)
                })        
    }

    callFavourites = () => {

        const accessToken = Cookies.get('access-token')
        if (accessToken) {
            const request = require('superagent')
            request.get('/list/favourites')
                   .set('Accept', 'application/json')
                   .set('Content-Type', 'application/json')
                   .set('x-access-token', accessToken)
                   .then(res => {
                        const favArray = res.body.favourites
                        for (var i = 0; i < favArray.length; i++) {
                            if (favArray[i] === this.props.publicId) {
                                this.setState({ favChecked: true },
                                              () => { 
                                                  this.setState(
                                                    { favText: "Favourite seller!" })
                                              })    
                            }
                        }  
                        //this.setState({ reviews: res.body.total_reviews })
                    })
                   .catch(err => {
                        console.log(err)
                    })
        }
    }

    favChange = () => {
        if (Cookies.get('access-token')) {
            if (this.state.favChecked) {
                const uuidData = { 'uuid': this.props.publicId }
                const request = require('superagent')
                request.delete('/list/favourites')
                       .send(JSON.stringify(uuidData))
                       .set('Accept', 'application/json')
                       .set('Content-Type', 'application/json')
                       .set('x-access-token', Cookies.get('access-token'))
                       .then(res => {
                                    this.setState({ favChecked: false },
                                                  () => {
                                                      this.setState(
                                                        { favText: "Save this seller" })
                                                  })
                        })
                       .catch(err => {
                            console.log(err)
                        })
            } else {
                const uuidData = { 'uuid': this.props.publicId }
                const request = require('superagent')
                request.post('/list/favourites')
                       .send(JSON.stringify(uuidData))
                       .set('Accept', 'application/json')
                       .set('Content-Type', 'application/json')
                       .set('x-access-token', Cookies.get('access-token'))
                       .then(res => {
                                    this.setState({ favChecked: true },
                                                  () => {
                                                      this.setState(
                                                        { favText: "Favourite seller!" })
                                                  })
                        })
                       .catch(err => {
                            console.log(err)
                        })
            }
        } else {
            this.openSnack()
        }
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

    getDeliveryOptions() {
        const delOpts = this.state.auction.delivery_options
        if (delOpts.collection &&
            !delOpts.delivery &&
            !delOpts.postage) {
            return "Collection only"
        } else if (!delOpts.collection &&
                   delOpts.delivery &&
                   delOpts.postage) {
            return "Courier or post"
        } else if (!delOpts.collection &&
                   delOpts.delivery &&
                   !delOpts.postage) {
            return "Courier only"
        } else if (!delOpts.collection &&
                   !delOpts.delivery &&
                   delOpts.postage) {
            return "Post only"
        } else {
            return "Contact seller for delivery options"
        }
    }

    getPaymentOptions() {
        const payArray = Object.entries(this.state.auction.payment_options)
        let displayString = ''
        //TODO: make this better!
        for (const [paytype, value] of payArray) {
            if (paytype === 'cash' && value === true) {
                displayString = 'Cash, '+ displayString
            }
            if (paytype === 'cheque' && value === true) {
                displayString = 'Cheque, '+ displayString
            }
            if (paytype === 'bank_transfer' && value === true) {
                displayString = 'Bank transfer, '+ displayString
            }
            if (paytype === 'paypal' && value === true) {
                displayString = 'Paypal, '+ displayString
            }
            if (paytype === 'venmo' && value === true) {
                displayString = 'Venmo, '+ displayString
            }
            if (paytype === 'visa' && value === true) {
                displayString = 'Visa, '+ displayString
            }
            if (paytype === 'mastercard' && value === true) {
                displayString = 'Mastercard, '+ displayString
            }
            if (paytype === 'amex' && value === true) {
                displayString = 'Amex, '+ displayString
            }
            if (paytype === 'bitcion' && value === true) {
                displayString = 'Bitcoin, '+ displayString
            }
        }
        // remove trailing comma
        displayString = displayString.substring(0, displayString.length - 2)
        return displayString
    }
    
    render() {
        const { classes } = this.props
        return (
            <Card className={classes.card}>
              {this.state.showCard ?
                  <>
                    <CardContent className={classes.paddingBeLess}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Seller information
                        </Typography>
                        <Box display="flex" flexDirection="row">
                            <Box flex={2} alignItems="flex-start">
                                <AvatarChooser publicId={this.props.publicId} avatarSize="large" />
                            </Box>
                            <Box flex={6} alignItems="flex-start">
                                <Typography variant="h5" className={classes.username}>
                                  {this.state.username}<br />
                                </Typography>
                                <Typography variant="subtitle1" style={{ marginBottom: 0, paddingBottom: 0}}>
                                    {this.state.reviews === "1" ?
                                        <><a href="#ss" className={classes.linky}>{this.state.reviews} review</a><br /></>
                                    :
                                        <><a href="#ss" className={classes.linky}>{this.state.reviews} reviews</a><br /></>
                                    }
                                    <a href="#de" className={classes.linky}>98% rating</a>
                                </Typography>
                            </Box>
                            <Box flex={6} style={{backgroundColor: "white"}} alignItems="flex-start">
                                <Box display="flex" flexDirection="column">
                                    <Box flex={1}>
                                        <Button
                                            className={classes.smallbutts}
                                            size="small"
                                            color = "secondary"
                                            variant="outlined"
                                        >
                                            Contact
                                        </Button>
                                    </Box>
                                    <Box flex={1}>
                                        <Button
                                            className={classes.smallbutts}
                                            size="small"
                                            color = "secondary"
                                            variant="outlined"
                                            style={{marginTop: 10}}
                                        >
                                            See other items
                                        </Button>
                                    </Box>
                                    <Box flex={1}>
                                        <FormControlLabel
                                            style={{fontSize: "0.8em" }}
                                            control={<Checkbox 
                                                        icon={<FavoriteBorder />} 
                                                        checkedIcon={<Favorite />} 
                                                        onChange={e => this.favChange(e)}
                                                        checked={this.state.favChecked}
                                                        value={this.props.publicId} 
                                                     />}
                                            label={this.state.favText}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Box flex={7}>
                                <Typography className={classes.payDetails}>
                                    <b>Item location:</b> {this.state.itemLocation}<br />
                                    <b>{this.getDeliveryOptions()}</b><br />
                                    <b>Payment options:</b><br />
                                    {this.getPaymentOptions()}<br />
                                </Typography>
                            </Box>
                        </Box>
                      </CardContent>
                  </>
              :
                <>
                    <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Seller information
                    </Typography>
                    <div className={classes.progress}>
                        <br /><CircularProgress />
                    </div> 
                    </CardContent>
                </> 
              }     
              {this.state.showSnack ?
                  <CustomizedSnackbars
                      duration = {this.state.duration}
                      key_date = {this.state.date}
                      variant  = {this.state.peckish.variant}
                      message  = {this.state.peckish.message}
                  />
              : null
              }
            </Card>
        );
    }

}

export default withStyles(Styles)(SellerInfoCard)
