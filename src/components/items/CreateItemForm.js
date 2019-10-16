import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import FormBuilder from '../helpers/FormBuilder'
import CustomizedSnackbars from '../information/CustomSnackbars'
import Cookies from 'js-cookie'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
import Select from '@material-ui/core/Select'
import FormLabel from '@material-ui/core/FormLabel'
import MenuItem from '@material-ui/core/MenuItem'
import AddToAuction from './AddToAuction'

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
  compTitle: {
    fontSize: "1.2em",
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
 mocking the category microservice
-----------------------------------------------------------------------------*/
const topLevelCats = [
        { "name": "Vehicles", "value": "vehicles:20001" },
        { "name": "Collectables & Art", "value": "collectables-art:30000" },
        { "name": "Electronics", "value": "electronics:40000" },
        { "name": "Books", "value":  "books:50000" },
        { "name": "Toys", "value": "toys:60000" },
        { "name": "Music", "value": "music:70000" },
        { "name": "Business & Industrial", "value": "business-industrial:80000" },
]

const vehicleCats = [
    { "name": "Autoparts", "value": "autoparts:20010" },
    { "name": "Boats", "value": "boats:20100" },
    { "name": "Cars", "value": "cars:21000" },
    { "name": "Motorcycles", "value": "motorcycles:22000" },
    { "name": "Trucks & Vans", "value": "trucks-vans:25000" },
    { "name": "Other Industrial Vehicles", "value": "other-industrial-vehicles:27000" },
    { "name": "Buses", "value": "buses:28000" }
]

const otherCats = [
    { "name": "Cat", "value": "cat-a:0001" },
    { "name": "Mouse", "value": "cat-b:0002" },
    { "name": "Dog", "value": "cat-c:0003" },
    { "name": "Giraffe", "value": "cat-d:0004" },
    { "name": "Lion", "value": "cat-e:0005" },
    { "name": "Sheep", "value": "cat-f:0006" },
]

const standardFields = [
    {key: "name", label: "Name", type: "text", props: {required: true, maxlength: 150}},
    {key: "start_date", label: "Some date", type: "datetime", props: {required: true}},
    {key: "amount", label: "Amount", type: "currency", props: {required: true}},
    {key: "some_field", label: "Some field", type: "text", props: {maxlength: 150}},
    {key: "description", label: "Description", type: "maxtext", props: {required: true,
                                                                        rows: 8,
                                                                        maxlength: 5000}},
    {key: "colours", label: "Colours", type: "select", 
     props: {required: true, items:[{label: "Red", value: "red", order: 1},
                                    {label: "Yellow", value: "yellow", order: 2},
                                    {label: "Blue", value: "blue", order: 3}]}},
    {key: "add_to_auction", label: "Add to auction", type: "radio",
     props: {required: true, items:[{label: "Now", value: "now", order: 1},
                                    {label: "Later", value: "later", order: 2}]}},
]

const carFields = [
    {key: "name", label: "Name", type: "text", props: {required: true, maxlength: 150}},
    {key: "description", label: "Description", type: "maxtext", props: {required: true,
                                                                        rows: 8,
                                                                        maxlength: 5000}},
    { key: "condition", label: "Condition", type:"text", props: {required: true, maxlength: 50}},
    { key: "make", label: "Make", type:"text", props: {maxlength: 50} },
    { key: "model", label: "Model", type:"text", props: {maxlength: 90} },
    { key: "year", label: "Year", type:"number", props: {required: true}}, 
    { key: "mileage", label: "Mileage (km)", type:"number", props: {required: true}},
    { key: "vin", label: "VIN", type:"text", props: {required: true, maxlength: 25}},
    { key: "doors", label: "Number of doors", type:"number", props: {required: true}},
    {key: "colour", label: "Colour", type: "select",
     props: {required: true, items:[{label: "Silver", value: "silver", order: 1},
                                    {label: "White", value: "white", order: 2},
                                    {label: "Black", value: "black", order: 3},
                                    {label: "Gold", value: "gold", order: 4},
                                    {label: "Red", value: "red", order: 5},
                                    {label: "Yellow", value: "yellow", order: 6},
                                    {label: "Blue", value: "blue", order: 7},
                                    {label: "Green", value: "green", order: 8},
                                    {label: "Grey", value: "grey", order: 9},
                                    {label: "Orange", value: "orange", order: 10},
                                    {label: "Brown", value: "brown", order: 11},
                                    {label: "Other", value: "Other", order: 12},]}},
    { key: "power_options", "label": "Power options", type: "checkbox",
      props: { items:
        [{ label: "Power steering", value: "powersteer", order: 1 },
         { label: "Electric windows", value: "elecwindows", order: 2 },
         { label: "Cruise control", "value": "cruise", order: 3 },
         { label: "Aircon", "value": "aircon", order: 4 },
        ],
      }
    },
    { key: "number_of_cylinders", label: "Number of cylinders", type: "select",
      props: { items:
        [{ label: "N/A", value: "na", order: 1},
         { label: "Two", value: "2", order: 2},
         { label: "Four", value: "4", order: 3},
         { label: "Six", value: "6", order: 4},
         { label: "V6", value: "v6", order: 5},
         { label: "Eight", value: "8", order: 6},
         { label: "V8", value: "v8", order: 7},
         { label: "Ten", value: "10", order: 8},
         { label: "Twelve", value: "12", order: 9},
         { label: "V12", value: "v12", order: 10},
         { label: "Other", value: "other", order: 11},
        ],
      }
    },
    { key: "safety_features", "label": "Safety features", type: "checkbox", 
      props: { items:
        [{ label: "ABS", value: "abs", order: 1 },
         { label: "Airbags", value: "airbag", order: 2 },
         { label: "Side airbags", "value": "sidebag", order: 3 },
        ],
      }
    },
    {key: "transmission", label: "Transmission", type: "radio",
     props: {required: true, items:[{label: "Manual", value: "manual", order: 1},
                                    {label: "Auto", value: "auto", order: 2}]}},
    { key: "fuel_type", label: "Fuel type", type: "select",
      props: { items:
        [{ label: "Petrol", value: "petrol", order: 1},
         { label: "Diesel", value: "diesel", order: 2},
         { label: "Electric", value: "electric", order: 3},
         { label: "Hybrid", value: "hybrid", order: 4},
         { label: "LPG", value: "lpg", order: 5},
         { label: "Flex", value: "flex", order: 6},
         { label: "Other", value: "other", order: 7},
        ],
      }
    },
    { key: "drivetrain", label: "Drivetrain", type: "select",
      props: { items:
        [{ label: "FWD", value: "fwd", order: 1},
         { label: "RWD", value: "rwd", order: 2},
         { label: "4WD", value: "4wd", order: 3},
         { label: "AWD", value: "awd", order: 4},
         { label: "Other", value: "other", order: 5},
        ],
      }
    },    
    {key: "driveside", label: "Drive side", type: "radio",
     props: {required: true, items:[{label: "Left", value: "left", order: 1},
                                    {label: "Right", value: "right", order: 2}]}},
    { key: "location", label: "Location", type:"text", props: {required: true, maxlength: 90} },
    { key: "manufacture_country", label: "Country of manufacture", type:"text", props: {required: false, maxlength: 90} },
]  



/*-----------------------------------------------------------------------------
 main component class
-----------------------------------------------------------------------------*/
class CreateItemForm extends Component {

    constructor(props){  
        super(props);  
        const peckish = {
            "variant": "info",
            "message": "Product created"
        }

        const loadCategory = (cat) => {
            const loadArr = []
            for (var k = 0; k < cat.length; k++) {
                const menuItem = <MenuItem
                                    value={cat[k].value}
                                    key={k}
                                 >
                                    {cat[k].name}
                                 </MenuItem>
                loadArr.push(menuItem)
            }
            return(loadArr)
        }

        this.state = { showSnack: false,
                       duration: 1900,
                       openUpload: false,
                       showCats: true,
                       chosenCat: '',
                       topLevelCat: 'nowt',
                       topLevelCatArray: loadCategory(topLevelCats),
                       secondLevelCatArray: '',
                       secondLevelCat: 'nowt',
                       showSecondLevelCat: false,
                       formBuilderTitle: "Standard Product Fields",
                       formBuilderBlurb: "Enter details for a standard item.",
                       formFields: standardFields,
                       noOfFiles: 0,
                       files: [],
                       urls: [],
                       itemId: '',
                       progress: 0,
                       results: [],
                       bucketURL: '',
                       showForm: false,
                       showResults: false,
                       showDropzone: false,
                       date: new Date().getTime(),
                       peckish: peckish,
                       model: {} }
        this.openSnack    = this.openSnack.bind(this)
        this.handleOpen   = this.handleOpen.bind(this)
        this.handleClose  = this.handleClose.bind(this)
        this.handleSave   = this.handleSave.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (e, key) => {

        const value = e.target.value
        this.setState({
            [key]: value
        })

        // need to hide the form if it's already open 
        // as it means someone has reselected a dropdown
        if (this.state.showForm === true) {
            this.setState({ showForm: false })
        }

        const loadCategory = (cat) => {
            const loadArr = []
            for (var k = 0; k < cat.length; k++) {
                const menuItem = <MenuItem
                                    value={cat[k].value}
                                    key={k}
                                 >  
                                    {cat[k].name}
                                 </MenuItem>
                loadArr.push(menuItem)
            }
            return(loadArr)
        }

        // loading the categories on the fly
        if (key === "topLevelCat" && value === "vehicles:20001") {
            // load 2nd level vehicle cats
            this.setState({ secondLevelCatArray: loadCategory(vehicleCats) },
                          () => this.setState({ showSecondLevelCat: true }))
        } else if (key === "topLevelCat") {
            // load standard 2nd level cats
            this.setState({ secondLevelCatArray: loadCategory(otherCats) },
                          () => this.setState({ showSecondLevelCat: true }))
        }

        // load the form with correct fields for 2nd level category
        if (key === "secondLevelCat" && value === "cars:21000") {
            this.setState({ chosenCat: value })
            this.setState({ formFields: carFields },
                          () => {
                            this.setState({ formBuilderTitle: "Car Information" })
                            this.setState({ formBuilderBlurb: "Enter your cars' details" })
                            this.setState({ showForm: true })
                          })
        } else if (key === "secondLevelCat") {
            this.setState({ chosenCat: value })
            this.setState({ formFields: standardFields },
                          () => this.setState({ showForm: true }))
        }

    }

    onSuccess = worked => {
        console.log("On success!")
    }

    // on submit we create the item via posting to items microservice
    // this returns a list of presigned urls which we then use to
    // upload images to s3 bucket. 
    onSubmit = model => {
        const request = require('superagent')
        //model["category"] = this.state.secondLevelCategory
        model["category"] = this.state.chosenCat
        this.setState({ model: model },
        () => {
            request.post('/items')
                   .send(JSON.stringify(model))
                   .set('Accept', 'application/json')
                   .set('Content-Type', 'application/json')
                   .set('x-access-token', Cookies.get('access-token'))
                   .then(res => {
                            let urls = res.body.s3_urls
                            this.setState({
                                urls: [ ...this.state.urls, urls]
                            })
                            this.setState({ itemId: res.body.item_id })       
                            this.setState({ bucketURL: res.body.bucket_url })
                            const peckish = {
                                variant: "success",
                                message: "Product created"
                            }
                            this.setState({ peckish: peckish }, () => {
                                this.openSnack()
                                this.setState({ showForm: false },
                                              () => {
                                                        this.setState({ showCats: false })
                                                        this.setState({ showDropzone: true })
                                                    }) 
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
        });
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

    // open dropzone dialog
    handleOpen = () => {
        this.setState({
            openUpload: true,
        });
    }

    // close dropzone dialog
    handleClose = () => {
        //console.log("Closing dropzone")
        this.setState({
            openUpload: false
        });
    }

    // function handles file uploads to s3. fotos microservice is also called 
    // after each successfull s3 post to store foto details. images
    // are uploaded to s3 in parallel using async calls and promises
    handleSave = (files) => {

        // get the s3 url data
        let urlsArray = this.state.urls[0]
        let results = []
        const bucketURL = this.state.bucketURL
        const itemId = this.state.itemId
        const interval = 100 / files.length 
        this.setState({ noOfFiles: files.length })

        // function to update progress bar
        const setProgress = () => {
            let p = this.state.progress
            p = p + interval
            this.setState({ progress: p })
        }

        // horrible function with lots of nested callbacks to update the results section
        const setResults = (results) => {
            this.setState({results}, 
                          () => {
                                this.setState({ showDropzone: false },
                                              () => {
                                                    this.setState({ showResults: true })
                                                    })
                                })
            if (this.state.showResults === true) {
                this.setState({ showResults: false },
                              () => this.setState({ showResults: true }))
            } else {
                this.setState({ showResults: true })
            }
        }

        // this function taken from
        // https://umbracofreelancer.uk/blog/post/create-thumbnails-using-javascript/
        const createThumbnail = (image, imType) => {

            const thumbnailMaxWidth = 150
            const thumbnailMaxHeight = 100
            let canvas, ctx, thumbnailScale, thumbnailWidth, thumbnailHeight
            // create an off-screen canvas
            canvas = document.createElement('canvas');
            ctx = canvas.getContext('2d');

            //Calculate the size of the thumbnail, to best fit within max/width (cropspadding)
            thumbnailScale = (image.width / image.height) > (thumbnailMaxWidth / thumbnailMaxHeight) ?
                thumbnailMaxWidth / image.width :
                thumbnailMaxHeight / image.height;
            thumbnailWidth = image.width * thumbnailScale;
            thumbnailHeight = image.height * thumbnailScale;

            // set its dimension to target size
            canvas.width = thumbnailWidth;
            canvas.height = thumbnailHeight;

            // draw source image into the off-screen canvas:
            ctx.drawImage(image, 0, 0, thumbnailWidth, thumbnailHeight);

            return [canvas.toDataURL(imType, 70),
                    image.width,
                    image.height,
                    thumbnailWidth, 
                    thumbnailHeight]
        }

        // async superagent requests to post all images to s3
        async function postImages() {

            const promises = files.map(async (currentFile, idx) => { 
            
                let currentS3URL = urlsArray.shift()
                let formData = new FormData()
                let fotoData = {}

                formData.append('key', currentS3URL.fields.key)
                formData.append('policy', currentS3URL.fields.policy)
                formData.append('x-amz-algorithm', currentS3URL.fields["x-amz-algorithm"])
                formData.append('x-amz-credential', currentS3URL.fields["x-amz-credential"])
                formData.append('x-amz-date', currentS3URL.fields["x-amz-date"])
                formData.append('x-amz-signature', currentS3URL.fields["x-amz-signature"])
                formData.append('file', currentFile)

                // read file data and create thumbnail (base64 encoded data)
                const reader  = new FileReader()
                reader.onload = function (event) {
                    const originalImage = new Image()
                    originalImage.src = event.target.result
                    const [base64, oWidth, oHeight, tWidth, tHeight] = createThumbnail(originalImage, currentFile.type)
                    fotoData["thumbnail"] = base64
                    fotoData["orig_width"] = oWidth
                    fotoData["orig_height"] = oHeight
                    fotoData["thumb_width"] = tWidth
                    fotoData["thumb_height"] = tHeight
                }
                reader.readAsDataURL(currentFile)

                fotoData["item_id"] = itemId
                fotoData["foto_id"] = currentS3URL.fields.key
                fotoData["s3_url"] = bucketURL+currentS3URL.fields.key
                fotoData["size"] = currentFile.size
                fotoData["type"] = currentFile.type
                fotoData["lastModified"] = currentFile.lastModified
                fotoData["idx"] = idx

                let request = require('superagent')

                request.post(bucketURL)
                       .set('Accept', 'application/json')
                       .send(formData)
                       .then(res => {
                            results.push({ 'url': fotoData.s3_url,
                                           'originalFilename': currentFile.name,
                                           'status': res.status })
                            return(res.status)            
                        })
                        .then(s3Result => {
                            // successfull s3 result status is 204. 
                            // if received post to fotos microservice 
                            if (s3Result === 204) {
                                request.post("/fotos")
                                        .send(JSON.stringify(fotoData))
                                        .set('Accept', 'application/json')
                                        .set('Content-Type', 'application/json')
                                        .set('x-access-token', Cookies.get('access-token'))
                                        .then(fotosRes => {
                                            // update results and progress if successfull
                                            setResults(results)
                                            setProgress()
                                         })
                                        .catch(fotosErr => {
                                            console.log("Error posting to fotos microservice")
                                            console.log(fotosErr)
                                        })
                            }
                        })
                       .catch(err => {
                            console.log(err)
                            results.push({ 'url': bucketURL+"/"+currentS3URL.fields.key,
                                           'originalFilename': currentFile.name,
                                           'status': err.status })
                       });
            });
            await Promise.all(promises)
            // shows empty results section
            setResults(results)
        }

        // async call to post all images
        postImages()
        this.handleClose()
    }

    render() {
        const key_date = this.state.date
        const { classes } = this.props
        // render the categories dropdowns and load form based on user selection
        return (
            <div>
            <Paper className={classes.root}>
                {this.state.showCats ?
                    <>
                    <Typography className={classes.compTitle} variant="h4" component="h4">
                        Create product
                    </Typography>
                    <Typography component="p">
                        <br />Enter an item into the system.
                    </Typography>
                    <br />
                    <FormLabel component="legend">Product categories
                        <span className="MuiFormLabel-asterisk MuiInputLabel-asterisk"> *</span>
                    </FormLabel>
                    <br />
                    <Select
                      required
                      value={this.state.topLevelCat}
                      style={{minWidth: 200, marginRight:20}}
                      onChange={(e) => {this.handleChange(e, 'topLevelCat')}}
                      inputProps={{
                        name: 'topLevelCat',
                        id: 'topLevelCat',
                      }}
                    >
                      {this.state.topLevelCatArray}
                    </Select>
                    {this.state.showSecondLevelCat ?
                        <Select
                          required
                          value={this.state.secondLevelCat}
                          style={{minWidth: 200, marginRight:20}}
                          onChange={(e) => {this.handleChange(e, 'secondLevelCat')}}
                          inputProps={{
                            name: 'secondLevelCat',
                            id: 'secondLevelCat',
                          }}
                        >
                          {this.state.secondLevelCatArray}
                        </Select>
                    : null
                    }
                    </>
                : null 
                }
            </Paper>
            {this.state.showForm ?
            <FormBuilder 
                title = {this.state.formBuilderTitle}
                blurb = {this.state.formBuilderBlurb}
                model = {this.state.formFields}
                submitLabel = "Create"
                onSubmit = {(model) => {this.onSubmit(model)}}
            />
            : null
            }
            {this.state.showDropzone ?
                <div>
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h5">
                        Upload Photos for <span className={classes.itemName}>{this.state.model.name}</span>
                    </Typography>
                    <br />
                    <Button 
                        className = {classes.dropbuttons} 
                        color = "secondary" 
                        variant="outlined" 
                        onClick={this.handleOpen.bind(this)}
                    >
                        Add Images
                    </Button>                    
                    <Button
                        className = {classes.dropbuttons}
                        color = "primary"
                        variant="outlined"
                        //onClick={alert("Skip!")}
                    >
                        Skip this
                    </Button>
                    <br />
                    <DropzoneDialog
                        open = {this.state.openUpload}
                        onSave = {this.handleSave.bind(this)}
                        acceptedFiles = {['image/jpeg', 'image/png']}
                        showPreviews={false}
                        showAlerts={false}
                        showPreviewsInDropzone={true}
                        dropzoneText = "&nbsp;&nbsp;Drag and drop an image file here or click&nbsp;&nbsp;"
                        dropzoneParagraphClass = {{ fontSize: 12, padding: 10 }}
                        maxFileSize = {5000000}
                        filesLimit = {20}
                        onClose = {this.handleClose.bind(this)}
                    />
                </Paper>
                </div>
            : null
            }

            {this.state.showResults ?
                <div>
                <Paper className={classes.root}>
                    <Typography variant="h5">
                        {this.state.progress > 99 ?
                            <>
                            Images Uploaded<br /><br />
                            </>
                        :
                            <>
                            Uploading Images...<br /><br />
                            </>
                        }
                    </Typography>
                    <Typography variant="body1">
                        Images uploaded: {this.state.results.length}/{this.state.noOfFiles} <br /><br />
                    </Typography>
                    <div>
                        {this.state.progress === 0 ?
                            <LinearProgress color="secondary" />
                        :
                            <LinearProgress color="secondary" variant="determinate" value={this.state.progress} />
                        }
                    </div>
                    <div className={classes.imageWrapper}>
                    <>
                        {this.state.results.map(result => (
                            <span key={result.url}>
                                <img src={result.url} className={classes.s3Images} alt="" />
                            </span>
                        ))}
                    </>
                    </div>                    
                    {this.state.progress > 99 ?
                        <>
                        { /*
                        <Button
                            className = {classes.dropbuttons}
                            color = "primary"
                            variant="contained"
                            //onClick={alert("Continue!")}
                        >
                            Show My Items
                        </Button>                        
                        <Button
                            className = {classes.dropbuttons}
                            color = "primary"
                            variant="contained"
                            //onClick={alert("Continue!")}
                        >
                            Create Another Item
                        </Button>
                        */ 
                        }
                        <AddToAuction 
                            itemId = {this.state.itemId} 
                            onSuccess = {(worked) => {this.onSuccess(worked)}}
                        />
                        </>
                    : null
                    }
                </Paper>
                </div>
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
            </div>
        );
    }
}

export default withStyles(styles)(CreateItemForm)
