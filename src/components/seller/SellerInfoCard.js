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
//import Cookies from 'js-cookie'
import blue from '@material-ui/core/colors/blue'
import avatar from '../sidimages.jpeg'
import Avatar from '@material-ui/core/Avatar'

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
  bigAvatar: {
    margin: 10,
    marginRight: 20,
    width: 60,
    height: 60,
  },
  userDetails: {
    order: 2,
    flex: 1,
  },
});

export default function SellerInfoCard(props) {
    const classes = useStyles();
  
    const [showCard, setShowCard] = useState(false)
    const [reviews, setReviews] = useState([])
    const [username, setUsername] = useState(null)
    const [loaded, setLoaded] = useState(false)

    //console.log("PUB ID: "+props.publicId) 

    function callAuthy() {
        const request = require('superagent')
        return new Promise(resolve => {
            request.get('/authy/username/'+props.publicId)
                   .set('Accept', 'application/json')
                   .set('Content-Type', 'application/json')
                   .then(res => {
                        //console.log(res.body)
                        setUsername(res.body.username)
                        resolve(true)
                        return
                    })
                   .catch(err => {
                        console.log(err)
                        resolve(false)
                    })        
        })
    }

    function callReviews() {
        const request = require('superagent')
        return new Promise(resolve => {
            request.get('/reviews/of/user/'+props.publicId)
                   .set('Accept', 'application/json')
                   .set('Content-Type', 'application/json')
                   .then(res => {
                        setReviews(res.body)
                        resolve(true)
                        return
                    })
                   .catch(err => {
                        console.log(err)
                        if (err.status === 404) {
                            resolve(true)
                            return
                        }
                        resolve(false)
                    })
        })
    }

    // promises function
    function callMicroservices() {
        const promises = []
        promises.push(callAuthy())
        promises.push(callReviews())
        return Promise.all(promises)
    }

    // only call other microservices if we have a public_id
    if (!loaded && props.publicId) {
        let p = Promise.resolve()
        p = p.then(() => {
            return callMicroservices()
        })
        .then(res => {
            //console.log(username)
            //console.log(reviews)    
            if (username && reviews.length > 0) {
                setLoaded(true)
                if (!showCard) {
                    setShowCard(true)
                }
            }
        })
    }    
    
return (
    <Card className={classes.card}>
      {showCard ?
      <>
      <CardContent style={{ marginBottom: 0, paddingBottom: 5}}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Seller information
        </Typography>
        <div className={classes.sellerContainer}>
            <div className={classes.avatarBox}>
                <Avatar alt={username} src={avatar} className={classes.bigAvatar} />
            </div>
            <div className={classes.userDetails}>
                <Typography variant="h5" className={classes.username}>
                  {username}<br />
                </Typography>
                <Typography variant="subtitle1" style={{ marginBottom: 0, paddingBottom: 0}}>
                    {reviews.length === 1 ?
                        <><a href="#ss" className={classes.linky}>{reviews.length} review</a><br /></>
                    :
                        <><a href="#ss" className={classes.linky}>{reviews.length} reviews</a><br /></>
                    }
                    <a href="#de" className={classes.linky}>98% rating</a>
                </Typography>
            </div>
        </div>
      </CardContent>
      <CardActions style={{ marginTop: 0, paddingTop: 0}}>
        <div className={classes.cardActs}>
        <Button 
            className={classes.smallbutts} 
            size="small"
            color = "secondary"
            variant="outlined"
        >
            Contact
        </Button>
        <Button 
            className={classes.smallbutts} 
            size="small"
            color = "secondary"
            variant="outlined"
        >
            See other items
        </Button>
        <FormControlLabel
            style={{fontSize: "0.8em" }}
            control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} value={props.publicId} />}
            label="Save this seller"
        />
        </div>
      </CardActions>
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
    </Card>
    );
}

