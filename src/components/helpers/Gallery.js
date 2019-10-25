import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Box from '@material-ui/core/Box'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import nophoto from '../images/no-photo-icon-faded.png'

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

    const [images, setImages] = useState([])

    let meImages = []
    if (props.item.fotos.length > 0) {
        meImages = props.item.fotos.map((foto) => {
            return { original: foto.metadata.s3_url,
                     thumbnail: foto.metadata.s3_url }
        })
    } else {
        meImages = [{ original: nophoto, thumbnail: nophoto }]
    }

    if (images.length === 0) {
        setImages(meImages)
    }
  
    
return (
    <Card className={classes.card}>
      <CardContent style={{ marginBottom: 0, paddingBottom: 5}}>
        <Box>
            <ImageGallery
                autoPlay={false}
                items={images}
                slideInterval={5000}
                additionalClass={classes.imageGallery}
            />
        </Box>
      </CardContent>
    </Card>
    );
}

