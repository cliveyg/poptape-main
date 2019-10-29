import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
//import blue from '@material-ui/core/colors/blue'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles({
  card: {
    margin: 5,
    //minWidth: 275,
    //maxHeight: 170,
    //backgroundColor: "yellow",
    padding: 0,
  },
  title: {
    fontSize: "1.2em",
    marginBottom: 10,
  },
  progress: {
    verticalAlign: "middle",
    textAlign: "center"
  },
  displayLinebreak: {
    fontSize: "0.8em",
    whiteSpace: "pre-line"
  },
  paddingBeLess: {
    paddingTop: 0,
    paddingLeft: 2,
    paddingRight: 2,
    paddingBottom: 5,
  }
});

export default function DisplayFields(props) {
    const classes = useStyles()
  
    const [showCard, setShowCard] = useState(false)

    //console.log(props.item)
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
        <CardContent className={classes.paddingBeLess}>
            <Box>
                <Paper className={classes.displayLinebreak}>
                    <Typography color="textSecondary" className={classes.title} >
                        Description
                    </Typography>
                    {props.item.description}
                </Paper>
                <Typography variant="body1">

                </Typography>
            </Box>
        </CardContent>
      </>
      :
      <>
        <CardContent>
            <div className={classes.progress}>
                <CircularProgress />
            </div> 
        </CardContent>
      </> 
      }     
    </Card>
    );
}

