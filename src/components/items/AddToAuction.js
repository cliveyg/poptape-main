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
import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2),
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
    {key: "delivery_options", "label": "Delivery options", type: "checkbox",
      props: { items:
        [{ label: "Post", value: "postage", order: 1 },
         { label: "Delivery", value: "delivery", order: 2 },
         { label: "Collection", "value": "collection", order: 3 },
        ],
      }
    },
    {key: "payments_accepted", "label": "Payment options", type: "checkbox",
      props: { items:
        [{ label: "Cash", value: "pay_cash", order: 1 },
         { label: "Mastercard", value: "pay_mastercard", order: 2 },
         { label: "Visa", "value": "pay_visa", order: 3 },
         { label: "American Express", "value": "pay_amex", order: 4 },
         { label: "Bank transfer", "value": "pay_bank_transfer", order: 5 },
         { label: "Paypal", "value": "pay_paypal", order: 6 },
         { label: "Bitcoin", "value": "pay_bitcoin", order: 7 },
         { label: "Cheque", "value": "pay_cheque", order: 8 },
         { label: "Venmo", "value": "pay_venmo", order: 9 },
        ],
      }
    },
/*
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
                       itemId: this.props.itemId,
                       itemName: this.props.itemName,
                       itemsURL: '/user/'+Cookies.get('username')+'/items',
                       showSuccessButtons: false,
                       auctionType: '',
                       showAddToAuctionButtons: false,
                       showAuctionForm: false,
                       formTitle: 'Auction Details',
                       formBlurb: 'Add this item to an auction',
                       formFields: soloEnAuction,
                       date: new Date().getTime(),
                       peckish: peckish,
                       model: {} }

        // check for passed in item_id
        if (this.props.itemId) {
            this.state.showError = false
            this.state.showAddToAuctionButtons = true
            console.log("itemId is ["+this.state.itemId+"]")
        }

        // load multi-item auction info 

        this.openSnack    = this.openSnack.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleButton = this.handleButton.bind(this)
        this.onFail       = this.onFail.bind(this)
    }

    onSuccess = e => {
        if (this.props.onSuccess) this.props.onSuccess(this.state)
        this.setState({ showAuctionForm: false },
            () => { this.setState({ showAddToAuctionButtons: false },
                () => { this.setState({ showSuccessButtons: true })})})
    }

    onFail = (err) => {
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
    }

    onSubmit = model => {
        // add auction type
        model['type'] = 'EN'
        model['currency'] = 'GBP'
        model['item_id'] = this.state.itemId
        this.setState({ model: model })
        let request = require('superagent')
        request.post('/auctionhouse/solo/auction/')
               .send(JSON.stringify(model))
               .set('Accept', 'application/json')
               .set('Content-Type', 'application/json')
               .set('x-access-token', Cookies.get('access-token'))
               .then(res => {
                    const auction_id = res.body.auction_id
                    const lot_id = res.body.lot_id
                    // create auction on auctioneer microservice
                    request.post('/auction/'+auction_id+'/'+lot_id)
                           .send()
                           .set('Accept', 'application/json')
                           .set('Content-Type', 'application/json')
                           .set('x-access-token', Cookies.get('access-token'))
                           .then(res => {
                                const peckish = {
                                    variant: "success",
                                    message: "Added to an auction"
                                }
                                this.setState({ peckish: peckish }, () => {
                                    this.openSnack()
                                    this.setState({ showPaper: false })
                                    this.onSuccess(true)
                                })
                            })
                            .catch(err => {
                                this.onFail(err)
                            })
                           
                })
               .catch(err => {
                    this.onFail(err)
                });

    }

    handleChange = (e, key) => {
        const value = e.target.value
        this.setState({
            [key]: value
        })
    }

    handleButton = (e, aucType) => {
        console.log(aucType)
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
            <Paper className={classes.root}>
            {this.state.showError ?
                <Typography variant="h5" component="h5">
                    No supplied Item ID<br />
                </Typography>
            : null
            }

            {this.state.showAddToAuctionButtons ?
                <>
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
                        disabled = {true}
                        variant="contained"
                        onClick={(e) => {this.handleButton(e, 'multiple')}}
                        endIcon={<AddToPhotosOutlinedIcon />}
                    >
                        Sell As Part Of Multiple Auction
                    </Button>
                </>
            : null
            }
    
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

            {this.state.showSuccessButtons ?
                <>
                    <Button
                        className = {classes.dropbuttons}
                        color = "primary"
                        variant="contained"
                        onClick={() => this.props.history.push('/item/'+this.state.itemId+'/'+this.state.itemName)}
                    >
                        Show This Item
                    </Button>
                    <Button
                        className = {classes.dropbuttons}
                        color = "primary"
                        variant="contained"
                        onClick={() => this.props.history.push(this.state.itemsURL)}
                    >   
                        Show My Items
                    </Button>            
                    <Button
                        className = {classes.dropbuttons}
                        color = "primary"
                        variant="contained"
                        onClick={() => this.props.history.push('/item/create')}
                    >
                        Create Another
                    </Button>
                </>
            : null
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
            </Paper>
            </div>
        );
    }
}

export default compose(withStyles(styles))(withRouter(AddToAuction))
