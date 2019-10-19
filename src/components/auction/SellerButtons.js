import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
//import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
//import Typography from '@material-ui/core/Typography'
//import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import blue from '@material-ui/core/colors/blue'
import pink from '@material-ui/core/colors/pink'
import green from  '@material-ui/core/colors/green'
import amber from  '@material-ui/core/colors/amber'
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'

//import Icon from '@material-ui/core/Icon'
//import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    minHeight: 250,
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
    //backgroundColor: blue[300],
    //color: "white",
    //color: blue[300],
    color: blue[600],
    //width: "100%",
    textTransform: "none",
    "&:hover": {
      //backgroundColor: blue[900],
      backgroundColor: blue[300],
      color: "white"
    },    
  },
  watchingBlurb: {
    marginLeft: 5,
  },
  fieldSurround: {
    borderRadius: 5,
    //backgroundColor: "#1976d2",
    backgroundColor: blue[300],
    paddingLeft: 35,
    paddingRight: 35,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: "1.2em",
  },
  currText: {
    backgroundColor: "#ffffff",
  },
  bidbutt: {
    width: "100%",
    marginTop: 10,
    backgroundColor: pink[800], 
    marginBottom: 10,
    height: 50,
    color: "white",
    "&:hover": {
      //color: blue[900],
      backgroundColor: pink[500],
    },
  },    
  bidyellowbutt: {
    width: "100%",
    marginTop: 10,
    backgroundColor: amber[800],
    marginBottom: 10,
    height: 50,
    color: "white",
    "&:hover": {
      //color: blue[900],
      backgroundColor: amber[600],
    },
  },
  bidgreenbutt: {
    width: "100%",
    marginTop: 10,
    backgroundColor: green[400],
    marginBottom: 10,
    height: 50,
    color: "white",
    "&:hover": {
      //color: blue[900],
      backgroundColor: green[300],
    },
  }
});

export default function SellerButtons(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <div>
          <Button
            variant="contained"
            className={classes.bidbutt}
            startIcon={<ErrorOutlineIcon />}
          >
            Cancel Auction
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            className={classes.bidyellowbutt}
            startIcon={<ChatBubbleOutlineIcon />}
          >
            Message All Bidders
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            className={classes.bidgreenbutt}
            startIcon={<SentimentSatisfiedAltIcon />}
          >
            Accept Current Bid
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

