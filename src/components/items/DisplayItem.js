import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
//import FormBuilder from '../helpers/FormBuilder'
import CustomizedSnackbars from '../information/CustomSnackbars'
import Cookies from 'js-cookie'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
//import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined'
//import AddToPhotosOutlinedIcon from '@material-ui/icons/AddToPhotosOutlined'
//import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

const dStyles = theme => ({
  dropzone: {
   fontSize: 12,
   padding: 10,
  },
  root: {
    padding: theme.spacing(3, 2),
  },
  displayLinebreak: {
    //padding: theme.spacing(3, 2),
    fontSize: "0.8em",
    whiteSpace: "pre-line"
  },
  itemName: {
    fontStyle: "italic"
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
    width: "50%",
  },
  auctionBox: {
    float: "left",
    width: "50%",
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    background: "#e6e2e1",
  },
  blurb: {
    //display: "inline"
  },
  topSection: {
    overflow: "hidden",
    position: "relative",
    width: "100%",
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
                       duration: 1900,
                       item: this.props.item,
                       auctionType: '',
                       date: new Date().getTime(),
                       peckish: peckish,
                       model: {} }

        // check for passed in item_id
        if (this.props.item) {
            this.state.showError = false
            console.log("itemId is ["+this.state.item.item_id+"]")
        }

        // load any auction info 

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
        const height = this.cBox.clientHeight
        //this.setState({ carouselHeight: height })
        console.log("Height is ["+height+"]")
    }

    render() {
        const key_date = this.state.date
        const { classes } = this.props
        let description = this.state.item.description
        //description = description.replace(/(?:\r\n|\r|\n)/g, '<br />')
        // render the categories dropdowns and load form based on user selection
        return (
            <div>
            {this.state.showError ?
                <div>
                    <Typography variant="h5" component="h5">
                        Item not supplied<br />
                    </Typography>
                </div>
            :
                <div>
                    <div>
                        <Typography variant="h5" component="h5">
                            {this.state.item.name}<br /><br />
                        </Typography>
                    </div>
                    <div className={classes.topSection}>
                        <div className={classes.auctionBox}>
                                Bollox goes here<br /><br /><br /><br />
                                Lorem ipsum
                        </div>
                        <div 
                            className={classes.carouselBox}
                            ref={ (cBox) => this.cBox = cBox }
                        >
                            <Carousel
                                showThumbs={true}
                                infiniteLoop={true}
                                onChange={this.someFunc}
                                onClickItem={this.someFunc}
                                onClickThumb={this.someFunc}
                            >
                                {this.state.item.fotos.map((foto, idx) => (
                                    <div key={idx}>
                                        <img src={foto.metadata.s3_url} />
                                    </div>
                                 ))}
                            </Carousel>
                        </div>
                    </div>
                    <div className={classes.blurb}>
                        <Paper className={classes.displayLinebreak}>
                            <Typography variant="h5" component="h5">
                                Description:
                            </Typography>
                            <br />{description}
                        </Paper>
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
