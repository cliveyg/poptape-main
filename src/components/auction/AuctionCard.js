import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CurrencyTextField from '@unicef/material-ui-currency-textfield'
import blue from '@material-ui/core/colors/blue'
import pink from '@material-ui/core/colors/pink'
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt'
import VisibilityIcon from '@material-ui/icons/Visibility'
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
    marginBottom: 5,
    color: "white",
    "&:hover": {
      //color: blue[900],
      backgroundColor: pink[500],
    },    
  }
});

const bidField =
        <CurrencyTextField
            //label="Bid"
            variant="outlined"
            value={0.00}
            currencySymbol="£"
            //minimumValue="0"
            outputFormat="number"
            decimalCharacter="."
            //inputStyle={{ fontSize: '1.2em' }}
            digitGroupSeparator=","
            InputProps={{
                classes: {
                    input: {fontSize: 25},
                },
            }}
            style={{ borderRadius: 4, padding: 7, backgroundColor: "#ffffff"}}
            //onChange={(e) => {this.onChange(e, key)}}
        />


export default function AuctionCard(props) {
  const classes = useStyles();

  return (
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
          >
            Bid Now
          </Button>
        </div>
        <Typography variant="body2" component="p">
          Minimum bid is £1800
        </Typography>
        <div>
            <Button
                variant="outlined"
                size="small"
                className={classes.watchThisButton}
                startIcon={<VisibilityIcon />}
            >
                Watch
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}

