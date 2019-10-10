import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
//import blue from '@material-ui/core/colors/blue'

const useStyles = makeStyles({
  card: {
    margin: 6,
    minWidth: 275,
    maxHeight: 170,
  },
  title: {
    fontSize: "1.2em",
  },
  progress: {
    verticalAlign: "middle",
    textAlign: "center"
  },
});

export default function AuctionOptions(props) {
    const classes = useStyles();
  
    const [showCard, setShowCard] = useState(false)
    //const [username, setUsername] = useState(null)
    //const [loaded, setLoaded]     = useState(false)

    console.log(props.publicId)
//    console.log(props.auctionData)
/*
    // this url doesn't exist so we will mock for now
    const request = require('superagent')
    request.get('/profile/payments'+props.publicId)
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .then(res => {
                console.log(res.body)
            })
           .catch(err => {
                console.log(err)
                
            })        
*/
    if (!showCard) {
        setTimeout(function(){
            setShowCard(true)
        }, 3000)
    }
    
return (
    <Card className={classes.card}>
      {showCard ?
      <>
      <CardContent style={{ marginBottom: 0, paddingBottom: 5}}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Auction options
        </Typography>
        <div>
            <Typography variant="body1">
              Postage: n/a<br />
              Collection only<br />
              Payments accepted: Visa, Mastercard, Cheque, Paypal, Cash, Bank Transfer, Bitcoin<br /><br />
            </Typography>
        </div>
      </CardContent>
      </>
      :
      <>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Auction options
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

