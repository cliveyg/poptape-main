import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import FormLabel from '@material-ui/core/FormLabel'
import Select from '@material-ui/core/Select'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MaxTextField from '../helpers/MaxTextField'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'
import DateFnsUtils from "@date-io/date-fns"
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import CurrencyTextField from '@unicef/material-ui-currency-textfield'

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  divbuttons: {
    width: "100%",
  },
  buttons: {
    float: "right",
    marginLeft: 20,
    textTransform: "none"
  }
});

class FormBuilder extends Component {

    state = {}

    constructor(props) {
        super(props)
        console.log("Initialising FormBuilder") 
    }

    onSubmit = e => {
        e.preventDefault()
        if (this.props.onSubmit) this.props.onSubmit(this.state)
    }

    onChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }

    onCheckboxChange = (e, itemValue) => {
        this.setState({
            [itemValue]: e.target.checked
        })
    }

    onDateChange = (e, key) => {
        this.setState({
            [key]: e
        })
    }

    clearForm = e => {
        e.preventDefault()
        const keys = Object.keys(this.state)
        keys.map((key) => {
            this.setState({
                [key]: ''
            })            
            return true
        })
        return true
    }

    renderForm = () => {
        let model = this.props.model
        
        let formUI = model.map((m) => {
            let key = m.key
            let type = m.type
            let props = m.props || {}
            let required = false
            m.props.required ? required = true : required = false
            let returnField = ""

            if (type === "text") {
                returnField =
                    <div key={key}>
                    <TextField
                        required={required}
                        margin="dense"
                        value={this.state[key]}
                        label={m.label}
                        name={key}
                        key={"i" + m.key}
                        type="text"
                        inputProps={{
                            maxLength: m.props.maxlength,
                            value: m.props.default
                        }}
                        ref={(key) => this[m.key]=key}
                        onChange = {(e) => {this.onChange(e, key)}}
                        style = {{width: 500}}
                    />
                    </div>
            } else if (type === "number") {
                returnField =
                    <div key={key}>
                    <TextField
                        required={required}
                        margin="dense"
                        value={this.state[key]}
                        label={m.label}
                        name={key}
                        key={"i" + m.key}
                        type="number"
                        inputProps={{
                            value: m.props.default
                        }}
                        ref={(key) => this[m.key]=key}
                        onChange = {(e) => {this.onChange(e, key)}}
                        style = {{width: 500}}
                    />
                    </div>
            } else if (type === "select") {
                let selectElements = props.items.map((item) => {
                    return (<MenuItem
                                value={item.value}
                                key={item.order}
                            >
                                {item.label}
                            </MenuItem>
                    );
                })

                returnField =
                    <div key={"i" + m.key}>
                    <br />
                    <FormLabel component="legend">
                        {m.label}
                    </FormLabel>
                    <Select
                        key={"i" + m.key}
                        name={key}
                        value={this.state[key]}
                        style={{minWidth: 200, marginRight:20}}
                        ref={(key) => this[m.key]=key}
                        onChange = {(e) => {this.onChange(e, key)}}
                    >
                        {selectElements}
                    </Select>
                    <br />
                    <br />
                    </div>
            } else if (type === "radio") {
                let radioOptions = props.items.map((item) => {
                    return (<FormControlLabel
                                value={item.value}
                                key={item.order}
                                control={<Radio color="primary" />}
                                label={item.label}
                                labelPlacement="start"
                                style={{color: "#0000008a"}}
                            />
                    );
                })

                returnField =
                    <div key={"i" + m.key}>
                    <br />
                    <FormLabel component="legend">
                        {m.label}
                    </FormLabel>
                    <RadioGroup aria-label="position"
                        name={key}
                        required={required}
                        key={"i" + m.key}
                        value={this.state[key]}
                        ref={(key) => this[m.key]=key}
                        onChange = {(e) => {this.onChange(e, key)}}
                     row>
                        {radioOptions}
                    </RadioGroup>
                    </div>
            } else if (type === "maxtext") {
                returnField = 
                    <div key={key}>
                    <MaxTextField
                        multiline
                        rows={m.props.rows}
                        required={required}
                        margin="dense"
                        label={m.label}
                        name={key}
                        type="text"
                        inputProps={{
                            maxLength: m.props.maxlength
                        }}
                        characterLimit={m.props.maxlength}
                        helperText="Number of characters:&nbsp;&nbsp;&nbsp;"
                        fullWidth
                        value={this.state[key]}
                        ref={(key) => this[m.key]=key}
                        onChange = {(e) => {this.onChange(e, key)}}
                    /><br /><br /><br />
                    </div>
            } else if (type === "checkbox") {
                let checkboxElements = props.items.map((item) => {
                    return (<FormControlLabel
                                control={
                                    <Checkbox 
                                        checked={this.state[item.value]}
                                        onChange={(e) => {this.onCheckboxChange(e, item.value)}}
                                        ref={(key) => this[m.key]=key}
                                        color="primary"
                                        value={item.value} />
                                }
                                label={item.label}
                                style={{color: "#0000008a"}}
                            />
                            );
                })

                returnField =
                    <div key={key}>
                    <br />
                    <FormLabel component="legend">
                        {m.label}
                    </FormLabel>
                    <FormGroup row>
                    <div>
                    { checkboxElements }
                    </div>
                    </FormGroup>
                    </div>
            } else if (type === "datetime") {
                returnField =
                    <div key={key}>
                    <br />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        autoOk
                        //ref={(key) => this[m.key]=key}
                        ampm={false}
                        disablePast
                        disabled={m.props.disabled}
                        value={this.state[key]}
                        onChange={(e) => {this.onDateChange(e, key)}}
                        label={m.label}
                    />
                    </MuiPickersUtilsProvider>
                    </div>
            } else if (type === "currency") {
                returnField =
                    <div key={key}>
                    <br />
                    <CurrencyTextField
                        label={m.label}
                        variant="standard"
                        value={this.state[key]}
                        ref={(key) => this[m.key]=key}
                        currencySymbol="£"
                        //minimumValue="0"
                        outputFormat="string"
                        decimalCharacter="."
                        digitGroupSeparator=","
                        onChange={(e) => {this.onChange(e, key)}}
                    />
                    <br />
                    </div>                
            }
            return returnField
        })
        return formUI
    }

    render() {
        let title = this.props.title || "Form" 
        let blurb = this.props.blurb || ""
        const { classes } = this.props;
        return (
        <div>
            <Paper className={classes.root}>
                <Typography variant="h5" component="h5">
                    {title}
                </Typography>
                {this.props.blurb === "" ?
                null
                :
                    <Typography component="p">
                        {blurb}
                    </Typography>
                }
                <br />
                <form onSubmit={(e) => this.onSubmit(e)}>
                    {this.renderForm()}
                    <div className={classes.divbuttons}>
                    <Button
                        className={classes.buttons}
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        {this.props.submitLabel}
                    </Button>
                    <Button
                        type="reset"
                        className={classes.buttons}
                        variant="outlined"
                        onClick={(e) => this.clearForm(e)}
                        color="secondary"
                    >
                        Clear
                    </Button>
                    <br /><br />
                    </div>
                </form>
            </Paper>
        </div>
        );
    }
}

export default withStyles(styles)(FormBuilder)
