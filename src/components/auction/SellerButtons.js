import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import pink from '@material-ui/core/colors/pink'
import green from  '@material-ui/core/colors/green'
import amber from  '@material-ui/core/colors/amber'
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    //minHeight: 250,
    height: 230,
    //backgroundColor: "grey",
  },
  title: {
    fontSize: "1.1em",
  },
  bidbutt: {
    width: "100%",
    marginTop: 20,
    backgroundColor: pink[800], 
    marginBottom: 10,
    height: 40,
    color: "white",
    "&:hover": {
      backgroundColor: pink[500],
    },
  },    
  bidyellowbutt: {
    width: "100%",
    marginTop: 10,
    backgroundColor: amber[800],
    marginBottom: 10,
    height: 40,
    color: "white",
    "&:hover": {
      backgroundColor: amber[600],
    },
  },
  bidgreenbutt: {
    width: "100%",
    marginTop: 10,
    backgroundColor: green[400],
    marginBottom: 10,
    height: 40,
    color: "white",
    "&:hover": {
      backgroundColor: green[300],
    },
  }
});

export default function SellerButtons(props) {
  const classes = useStyles();

    function onSubmit(e, action) {
        if (props.onAction) props.onAction(action)
    }

    return (
        <Card className={classes.card}>
          <CardContent>
            <div>
              <Button
                variant="contained"
                className={classes.bidbutt}
                startIcon={<ErrorOutlineIcon />}
                onClick={(e) => onSubmit(e, 'cancel')}
              >
                Cancel Auction
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                className={classes.bidyellowbutt}
                startIcon={<ChatBubbleOutlineIcon />}
                onClick={(e) => onSubmit(e, 'message')}
              >
                Message All Bidders
              </Button>
            </div>
            <div>
              <Button
                variant="contained"
                className={classes.bidgreenbutt}
                startIcon={<SentimentSatisfiedAltIcon />}
                onClick={(e) => onSubmit(e, 'accept')}
              >
                Accept Current Bid
              </Button>
            </div>
          </CardContent>
        </Card>
    );
}

