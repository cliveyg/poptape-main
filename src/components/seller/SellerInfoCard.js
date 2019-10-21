import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
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

const Styles = theme => ({
  card: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    minWidth: 275,
    //minHeight: 200,
    //height: 243,
  },
  title: {
    fontSize: "1.2em",
  },
  OcardActs: {
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
    maxWidth: 150,
    //backgroundColor: "green",
    paddingBottom: 10,
  },
  cardActs: {
    order: 3,
    flex: 1,
    minWidth: 200,
    paddingTop: 40,
    verticalAlign: "bottom",
  },
});

class SellerInfoCard extends Component {

    constructor(props){
        super(props)
     
        this.state = {
            showCard: false,
            reviews: 0,
            publicId: this.props.publicId,
            username: null,
            loaded: false
        }
        this.callAuthyAndReviews = this.callAuthyAndReviews.bind(this)
    } 

    componentDidMount() {
        this.callAuthyAndReviews()
        //this.setState({ loaded: true },
        //              () => { this.setState({ showCard: true })})
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

    callReviews() {
        const request = require('superagent')
        request.get('/reviews/of/user/'+this.props.publicId+'?totalonly=true')
               .set('Accept', 'application/json')
               .set('Content-Type', 'application/json')
               .then(res => {
                    this.setState({ reviews: res.body.total_reviews })
                })
               .catch(err => {
                    console.log(err)
                })
    }

    
    render() {
        const { classes } = this.props
        return (
            <Card className={classes.card}>
              {this.state.showCard ?
              <>
              <CardContent style={{ marginBottom: 0, paddingBottom: 5}}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Seller information
                </Typography>
                <div className={classes.sellerContainer}>
                    <div className={classes.avatarBox}>
                        <AvatarChooser avatarName="random" avatarSize="large" />
                    </div>
                    <div className={classes.userDetails}>
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
                    </div>
<div className={classes.cardActs}>
<CardActions style={{ marginTop: 0, paddingTop: 0}}>
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
                    style={{fontSize: "0.8em", marginTop: 5 }}
                    control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} value={this.props.publicId} />}
                    label="Save this seller"
                />

</CardActions>
</div>
                </div>
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
            </Card>
        );
    }

}

export default withStyles(Styles)(SellerInfoCard)
