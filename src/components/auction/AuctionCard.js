import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import blue from '@material-ui/core/colors/blue'
import pink from '@material-ui/core/colors/pink'
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt'
import VisibilityIcon from '@material-ui/icons/Visibility'
import CustomizedSnackbars from '../information/CustomSnackbars'
import Cookies from 'js-cookie'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles({
  card: {
    marginLeft: 5,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 5,
    minWidth: 275,
    //minHeight: 220,
    height: 220,
  },
  title: {
    fontSize: "1.1em",
  },
  watchthis: {
    display: "inline-flex",
    verticalAlign: "middle",
    lineHeight: "1.6em",
    color: "#1976d2",
    fontSize: "0.8em",
  },
  watchThisButton: {
    color: blue[600],
    textTransform: "none",
    "&:hover": {
      backgroundColor: blue[300],
      color: "white"
    },    
  },
  watchingThisButton: {
    backgroundColor: blue[300],
    color: "white",
    textTransform: "none",
    "&:hover": {
      color: blue[600],
      backgroundColor: "white"
    },
  },
  watchingBlurb: {
    marginLeft: 5,
  },
  fieldSurround: {
    borderRadius: 5,
    backgroundColor: blue[300],
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: "1.2em",
    textAlign: "center",
  },
  currText: {
    backgroundColor: "#ffffff",
  },
  bidbutt: {
    width: "100%",
    marginTop: 10,
    backgroundColor: pink[800], 
    marginBottom: 5,
    color: "white",
    "&:hover": {
      backgroundColor: pink[500],
    },    
  }
});

const peckish = {
    "variant": "warning",
    "duration": 1900,
    "message": "Ooopsy!"
}


export default function AuctionCard(props) {
    const classes = useStyles();

    const [bidValue, setBidValue] = useState(0.00)
    const [showSnack, setShowSnack] = useState(false)
    const [watching, setWatching] = useState(false)
    const minBid = props.minBid
    const formattedMinBid = numberWithCommas(props.minBid)

    function numberWithCommas(n) {
            return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function sendToWatchlist(putOnList) {

        const uuidData = { 'uuid': props.itemId }
        const request = require('superagent')

        if (putOnList) {
            request.post('/list/watchlist')
                   .send(JSON.stringify(uuidData))
                   .set('Accept', 'application/json')
                   .set('Content-Type', 'application/json')
                   .set('x-access-token', Cookies.get('access-token'))
                   .then(res => {
                        setWatching(true)
                    })
                   .catch(err => {
                        console.log(err)
                    })
        } else {
            request.delete('/list/watchlist')
                   .send(JSON.stringify(uuidData))
                   .set('Accept', 'application/json')
                   .set('Content-Type', 'application/json')
                   .set('x-access-token', Cookies.get('access-token'))
                   .then(res => {
                        setWatching(false)
                    })  
                   .catch(err => {
                        console.log(err)
                    })  
        }
    }

    // set the watching button
    const accessToken = Cookies.get('access-token')
    if (accessToken) {
        const request = require('superagent')
        request.get('/list/watchlist')
               .set('Accept', 'application/json')
               .set('Content-Type', 'application/json')
               .set('x-access-token', accessToken)
               .then(res => {
                    const favArray = res.body.watchlist
                    for (var i = 0; i < favArray.length; i++) {
                        if (favArray[i] === props.itemId) {
                            setWatching(true)
                        }
                    }  
                })
               .catch(err => {
                    console.log(err)
                })
    }    

    const bidField =
            <CurrencyTextField
                variant="outlined"
                value={bidValue}
                currencySymbol="£"
                outputFormat="number"
                decimalCharacter="."
                digitGroupSeparator=","
                InputProps={{
                    classes: { 
                        input: {fontSize: 25},
                    },
                }}
                style={{ borderRadius: 4, padding: 7, backgroundColor: "#ffffff"}}
                onChange={(event, value)=> onChange(value)}
            />

    function onChange(value) {
        setBidValue(value)
    }

    function openSnack() {
        if (showSnack === true) {
            setShowSnack(false)
            // absolutely horrible way to do this
            // but callbacks in functional compo
            // state vars are a right pita
            setTimeout(function(){
                setShowSnack(true)
            }, 500);            
        } else {
            setShowSnack(true)
        }
    }

    function onSubmit(e) {
        // pass the bid value back up to parent
        if (!Cookies.get('username')) {
            peckish.message = "You must be logged in to bid"
            openSnack()
        } else if (bidValue < minBid) {
            peckish.message = "You can't bid less than the minimum"
            openSnack()
        } else {
            //if (props.onSubmit) props.onSubmit(bidValue)
            if (props.gotBid) props.gotBid(bidValue)
            setBidValue(0.00)
        }
    }

    const keyDate = new Date().getTime()

    return (
        <>
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.fieldSurround}>
                {bidField}
            </div>
            <div>
              <Button
                variant="contained"
                className={classes.bidbutt}
                startIcon={<SentimentSatisfiedAltIcon />}
                onClick={(e) => onSubmit(e)}
              >
                Bid Now
              </Button>
            </div>
            <Box style={{marginTop: 5}} display="flex" flexDirection="row">
                <Box flex={2} style={{ paddingTop: 5}}>
                <Typography variant="body2" component="p">
                  Minimum bid is £{formattedMinBid}
                </Typography>
                </Box>
                <Box flex={1} align="right">
                {watching ?
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.watchingThisButton}
                        startIcon={<VisibilityIcon />}
                        onClick={(e) => sendToWatchlist(false)}
                    >
                        Watching
                    </Button>
                :
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.watchThisButton}
                        startIcon={<VisibilityIcon />}
                        onClick={(e) => sendToWatchlist(true)}
                    >
                        Watch
                    </Button>
                }
                </Box>
            </Box>
          </CardContent>
        </Card>
        {showSnack ?
            <CustomizedSnackbars
                duration = {peckish.duration}
                key_date = {keyDate}
                variant  = {peckish.variant}
                message  = {peckish.message}
            />
        : null
        }
        </>
    );
}

