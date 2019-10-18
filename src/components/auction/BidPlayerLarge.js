import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
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

const useStyles = makeStyles({
  card: {
    margin: 6,
    minWidth: 275,
    minHeight: 200,
  },
  title: {
    fontSize: "1.2em",
  },
  cardActs: {
    paddingTop: 0,
    paddingLeft: 8,
    paddingRight: 8,
  },
  linky: {
    //color: blue[900],
    color: blue[700],
    "&:visited": {
      //color: blue[900],
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
    marginRight: 10
  },
  sellerContainer: {
    display: "flex",
    flexFlow: "row",
  },
  avatar: {
    order: 1,
    flex: 1,
    maxWidth: 80,
    verticalAlign: "middle",
    height: "100%",
  },
  userDetails: {
    order: 2,
    flex: 1,
  },
});

export default function BidPlayerLarge(props) {
    const classes = useStyles();
  
    const [showCard, setShowCard] = useState(false)
    const [loaded, setLoaded] = useState(false)

    
return (
    <Card className={classes.card}>
      {showCard ?
      <>
      <CardContent style={{ marginBottom: 0, paddingBottom: 5}}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Bidding information
        </Typography>
        <div className={classes.sellerContainer}>
        </div>
      </CardContent>
      </>
      :
      <>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Bidding information
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

