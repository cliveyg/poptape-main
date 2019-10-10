import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import FormBuilder from '../helpers/FormBuilder'
import CustomizedSnackbars from '../information/CustomSnackbars'
import Cookies from 'js-cookie'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined'
import AddToPhotosOutlinedIcon from '@material-ui/icons/AddToPhotosOutlined'

const styles = theme => ({
  dropzone: {
   fontSize: 12,
   padding: 10,
  },
  root: {
    padding: theme.spacing(3, 2),
  },
  itemName: {
    fontStyle: "italic"
  },
/*
  dropzoneParagraphClass: {
    fontSize: 12,
    padding: 10
  },
*/
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
  s3Images: {
    display: "block",
    maxWidth: 300,
    maxHeight: 200,
    width: "auto",
    height: "auto",
    margin: 10
  }
});

/*-----------------------------------------------------------------------------
 auction form fields
-----------------------------------------------------------------------------*/

const soloEnAuction = [
    {key: "start_time", label: "Auction start", type: "datetime", props: {disabled: false, required: true}},
    {key: "end_time", label: "Auction end", type: "datetime", props: {disabled: false, required: true}},
    {key: "quantity", label: "Quantity", type: "number", props: {required: true}},
    {key: "start_price", label: "Starting price (optional)", type: "currency", props: {required: false}},
    {key: "reserve_price", label: "Reserve price (optional)", type: "currency", props: {required: false}},
    {key: "min_increment", label: "Minimum increment", type: "currency", props: {required: true}},
/*
{key: "name", label: "Name", type: "text", props: {required: true, maxlength: 150}},
type
currency
start_time
end_time
quantity

//EN
//min_increment

//DU
//min_decrement
//start_price
*/
]

/*-----------------------------------------------------------------------------
 main component class
-----------------------------------------------------------------------------*/
class AddToAuction extends Component {

    constructor(props){  
        super(props);  
        const peckish = {
            "variant": "info",
            "message": "Added to auction"
        }

        this.state = { showSnack: false,
                       showError: true,
                       showPaper: true,
                       duration: 1900,
                       itemId: this.props.itemId, // || '956da742-5498-4b6a-8684-a75b69455d1e',
                       auctionType: '',
                       showAuctionForm: false,
                       formTitle: 'Auction Details',
                       formBlurb: 'Add this item to an auction',
                       formFields: soloEnAuction,
                       date: new Date().getTime(),
                       peckish: peckish,
                       model: {} }

        // check for passed in item_id
        //if (!this.props.itemId) {
        if (this.props.itemId) {
            this.state.showError = false
            console.log("itemId is ["+this.state.itemId+"]")
        }

        // load multi-item auction info 

        this.openSnack    = this.openSnack.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleButton = this.handleButton.bind(this)
    }

    onSuccess = e => {
        if (this.props.onSuccess) this.props.onSuccess(this.state)
    }

    onSubmit = model => {
        // add auction type
        model['type'] = 'EN'
        model['currency'] = 'GBP'
        model['item_id'] = this.state.itemId
        this.setState({ model: model })
        let request = require('superagent')
        request.post('/auctionhouse/solo/auction')
               .send(JSON.stringify(model))
               .set('Accept', 'application/json')
               .set('Content-Type', 'application/json')
               .set('x-access-token', Cookies.get('access-token'))
               .then(res => {
                        const peckish = {
                            variant: "success",
                            message: "Added to auction"
                        }
                        this.setState({ peckish: peckish }, () => {
                            this.openSnack()
                            this.setState({ showPaper: false })
                            this.onSuccess(true)
                        })
                           
                })
               .catch(err => {
                    console.log(err)
                    if (err.status === 400) {
                        const peckish = {
                            variant: "warning",
                            message: "Some of your fields are incorrect"
                        }
                        this.setState({ peckish: peckish })
                    } else if (err.status === 401) {
                        const peckish = {
                            variant: "error",
                            message: "Sorry Dave, I can't let you do that"
                        }
                        this.setState({ peckish: peckish })
                    } else if (err.status === 502) {
                        const peckish = {
                            variant: "error",
                            message: "Computer says no"
                        }
                        this.setState({ peckish: peckish })
                    } else {
                        const peckish = {
                            variant: "warning",
                            message: "Something went bang"
                        }
                        this.setState({ peckish: peckish })
                    }
                    this.openSnack()
                });

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
        //console.log(e)
        this.setState({ showAuctionForm: true })
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


    render() {
        const key_date = this.state.date
        const { classes } = this.props
        // render the categories dropdowns and load form based on user selection
        return (
            <div>
            {this.state.showError ?
            <Paper className={classes.root}>
                <Typography variant="h5" component="h5">
                    No supplied Item ID<br />
                </Typography>
            </Paper>
            :
            <Paper className={classes.root}>
                {this.state.showPaper ?
                <>
                { /*
                <Typography variant="h5" component="h5">
                    Auction Component<br /><br />
                </Typography>
                */ }
                <Button
                    className = {classes.dropbuttons}
                    color = "primary"
                    variant="contained"
                    onClick={(e) => {this.handleButton(e, 'solo')}}
                    endIcon={<AddBoxOutlinedIcon />}
                >
                    Sell Singly
                </Button>                
                <Button
                    className = {classes.dropbuttons}
                    color = "primary"
                    variant="contained"
                    onClick={(e) => {this.handleButton(e, 'multiple')}}
                    endIcon={<AddToPhotosOutlinedIcon />}
                >
                    Sell As Part Of Multiple Auction
                </Button>
                {this.state.showAuctionForm ?
                    <FormBuilder
                        title = {this.state.formTitle}
                        blurb = {this.state.formBlurb}
                        model = {this.state.formFields}
                        submitLabel = "Add"
                        onSubmit = {(model) => {this.onSubmit(model)}}
                    />
                : null
                }
                </>
                : null
                }
            </Paper>
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

export default withStyles(styles)(AddToAuction)
