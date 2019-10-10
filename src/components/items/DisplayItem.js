import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import CustomizedSnackbars from '../information/CustomSnackbars'
//import Cookies from 'js-cookie'
//import Button from '@material-ui/core/Button'
//import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import nophoto from '../no-photo-icon-faded.png'
import "react-image-gallery/styles/css/image-gallery.css"
import ImageGallery from 'react-image-gallery'
import DisplayMiniAuction from '../auction/DisplayMiniAuction'
import SellerInfoCard from '../seller/SellerInfoCard'
import AuctionOptions from '../auction/AuctionOptions'
//import red from '@material-ui/core/colors/red'
import DisplayFields from './DisplayFields'
//import '../../Poptape.css'

const dStyles = theme => ({
  displayLinebreak: {
    fontSize: "0.8em",
    whiteSpace: "pre-line"
  },
  divbuttons: {
    width: "100%",
  },
  dropbuttons: {
    textTransform: "none",
    marginRight: 20
  },
  buttons: {
    float: "right",
    marginLeft: 20
  },
  imageWrapper: {
    display: "flex",
    marginTop: 10,
    flexWrap: "wrap",
    marginBottom: 15,
  },
  carouselBox: {
    float: "right",
    maxWidth: "50%",
    minHeight: 650,
    //maxHeight: 1500,
    //height: 700,
  },
  auctionBox: {
    float: "left",
    width: "48%",
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    background: "#e6e2e1",
    padding: 10,
    //marginRight: 30,
  },
  imageGallery: {
    //maxHeight: 500,
    //height: 500,
    //maxWidth: "auto",
  },
  blurb: {
    //display: "inline"
  },
  topSection: {
    overflow: "hidden",
    position: "relative",
    width: "100%",
  },
  itemName: { 
    fontSize: "1.4em",
    fontWeight: "bold",
  },
  newBadge: {
    backgroundColor: "#e43e43",
    color: "white",
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    borderRadius: 5,
    fontSize: "0.8em",
    //display: "inline-block",
    //transform: [{ rotate: "-50deg"}],
  },
});

/*-----------------------------------------------------------------------------
 main component class
-----------------------------------------------------------------------------*/
class DisplayItem extends Component {

    constructor(props){  
        super(props);  
        const peckish = {
            "variant": "info",
            "message": "Added to auction"
        }

        this.state = { showSnack: false,
                       showError: true,
                       newBadge: false,
                       duration: 1900,
                       item: this.props.item,
                       auctionType: '',
                       date: new Date().getTime(),
                       peckish: peckish,
                       model: {} }

        // check for passed in item_id
        if (this.props.item) {
            this.state.showError = false
            //console.log("itemId is ["+this.state.item.item_id+"]")
        }

        this.openSnack    = this.openSnack.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleButton = this.handleButton.bind(this)
    }

    handleChange = (e, key) => {

        const value = e.target.value
        this.setState({
            [key]: value
        })

    }

    handleButton = (e, aucType) => {
        console.log(":::::::")
        console.log(aucType)
    }

    // open snackbar
    openSnack = () => {
        if (this.state.showSnack === true) {
            this.setState({
                showSnack: false
            }, () => {
                this.setState({
                    showSnack: true
                });                
            });
        } else {        
            this.setState({
                showSnack: true
            });
        }
    }

    someFunc = () => {
        console.log("give me some funk")
    }

    componentDidMount() {
        //const height = this.cBox.clientHeight
        //this.setState({ carouselHeight: height })
        //console.log("Height is ["+height+"]")
    }

    render() {
        const key_date = this.state.date
        const { classes } = this.props

        // load gallery images
        //let maxImageHeight = 0
        let meImages = []
        //let testThumb
       
        if (this.state.item.fotos.length > 0) { 
            //testThumb = <img src={this.state.item.fotos[0].metadata.thumbnail} alt='' />
            meImages = this.state.item.fotos.map((foto) => {
                //if (foto.metadata.orig_height > maxImageHeight) {
                    //maxImageHeight = foto.metadata.orig_height
                //}
                return { original: foto.metadata.s3_url,
                                 thumbnail: foto.metadata.s3_url }
            })
        } else {
            //testThumb = <img style={{height: 150, width: 150}} src={nophoto} alt='' />
            meImages = [{ original: nophoto, thumbnail: nophoto }]
        }
        // add on thumbnail height 
        //console.log("MaxH "+maxImageHeight)
        //maxImageHeight = (maxImageHeight/2) + 200
        //style={{ height: maxImageHeight}
        let dipBadge = ''
        if (this.state.newBadge) {
            dipBadge = <span className={classes.newBadge}>NEW!</span>
        }

        return (
            <div style={{width: "100%"}}>
            {this.state.showError ?
                <div>
                    <Typography variant="h5" component="h5">
                        Item not supplied<br />
                    </Typography>
                </div>
            :
                <div>
                    <div>
                        <Typography className={classes.itemName} variant="h4" component="h4">
                            {dipBadge}{this.state.item.name}<br /><br />
                        </Typography>
                    </div>
                    <div className={classes.topSection}>
                        <div className={classes.auctionBox}>
                            <DisplayMiniAuction
                                itemId = {this.state.item.item_id}
                            />
                            <SellerInfoCard
                                publicId = {this.state.item.public_id}
                            />
                            <AuctionOptions
                                publicId = {this.state.item.public_id}
                                itemId = {this.state.item.item_id}
                            />
                        </div>
                        <div 
                            className={classes.carouselBox}
                            ref={ (cBox) => this.cBox = cBox }
                        >
                            <ImageGallery 
                                autoPlay={false} 
                                items={meImages} 
                                slideInterval={5000}
                                additionalClass={classes.imageGallery}
                            />
                        </div>
                    </div>
                    <div className={classes.blurb}>
                        <DisplayFields
                            item = {this.state.item}
                        />
                    </div>
                </div>
            }

            {this.state.showSnack ?
                <CustomizedSnackbars
                    duration = {this.state.duration}
                    key_date = {key_date}
                    variant  = {this.state.peckish.variant}
                    message  = {this.state.peckish.message}
                />
            : null
            }
            </div>
        );
    }
}

export default withStyles(dStyles)(DisplayItem)
