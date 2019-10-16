import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
//import blue from '@material-ui/core/colors/blue'

const useStyles = makeStyles({
  card: {
    margin: 6,
    //minWidth: 275,
    //maxHeight: 170,
  },
  title: {
    fontSize: "1.4em",
  },
  progress: {
    verticalAlign: "middle",
    textAlign: "center"
  },
  displayLinebreak: {
    fontSize: "0.8em",
    whiteSpace: "pre-line"
  },
  mainTitle: {
    fontSize: "0.8em",
  }
});

export default function DisplayFields(props) {
    const classes = useStyles()
  
    const [showCard, setShowCard] = useState(false)
    //const [username, setUsername] = useState(null)
    //const [loaded, setLoaded]     = useState(false)

    console.log(props.item)
//    console.log(props.auctionData)
/*
    // this url doesn't exist so we will mock for now
    const request = require('superagent')
    request.get('/categories/'+props.item.category)
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
        <Typography variant="h4" style={{ marginBottom: 10}}>
          <span className={classes.mainTitle}>Item details</span>
        </Typography>
        <div>
            <Paper className={classes.displayLinebreak}>
                <Typography color="textSecondary" className={classes.title} >
                    Description:
                </Typography>
                <br />{props.item.description}
            </Paper>
            <Typography variant="body1">

            </Typography>
        </div>
      </CardContent>
      </>
      :
      <>
      <CardContent>
        <Typography variant="h4" style={{ marginBottom: 10}}>
          <span className={classes.mainTitle}>Item details</span>
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

