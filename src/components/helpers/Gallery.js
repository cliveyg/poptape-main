import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import 'pure-react-carousel/dist/react-carousel.es.css'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles({
  card: {
    margin: 5,
    minWidth: 275,
    minHeight: 200,
  },
  title: {
    fontSize: "1.2em",
  },
  linky: {
    color: blue[700],
    "&:visited": {
      color: blue[700],
    },
    textDecoration: "none",
  },
});

export default function Gallery(props) {
    const classes = useStyles();
  
    
return (
    <Card className={classes.card}>
      <CardContent style={{ marginBottom: 0, paddingBottom: 5}}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Gallery component
        </Typography>
        <Box>
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={50}
                infinite={true}
                totalSlides={3}
            >
                <Slider>
                    <Slide index={0}>I am the first Slide.</Slide>
                    <Slide index={1}>I am the second Slide.</Slide>
                    <Slide index={2}>I am the third Slide.</Slide>
                </Slider>
                <ButtonBack>Back</ButtonBack>
                <ButtonNext>Next</ButtonNext>
            </CarouselProvider>
        </Box>
      </CardContent>
    </Card>
    );
}

