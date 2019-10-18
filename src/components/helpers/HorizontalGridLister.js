import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import CustomizedSnackbars from '../information/CustomSnackbars'
import DisplayItem from '../items/DisplayItem'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
//import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import Paper from '@material-ui/core/Paper'
import Cookies from 'js-cookie'
//import nophoto from '../no-photo-icon.png'
import nophoto from '../no-photo-icon-faded.png'
//import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2),
    //height: "90%",
  },
  divbuttons: {
    width: "100%",
  },
  buttons: {
    float: "right",
    marginLeft: 20,
    textTransform: "none"
  },
  gridRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    //height: '100%',
  },
  gridList: {
    width: "100%",
    //width: 600,
    //height: 450,
    height: '100%',
    "&:hover": {
        cursor: 'pointer'
    },
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

class HorizontalGridLister extends Component {

    constructor(props) {
        super(props)
        console.log("Initialising HorizontalGridLister")

        const peckish = {
            "variant": "info",
            "message": "Items loaded"
        }

        this.state = { showSnack: false,
                       showGrid: true,
                       itemsURL: this.props.itemsURL || '/items',
                       fotosURL: this.props.fotosURL || '/fotos/item/',
                       duration: 1900,
                       item: '',
                       showItem: false,
                       blurb: this.props.blurb || 'Items',
                       items: [],
                       updated: [],
                       sorted: [],
                       peckish: peckish }

        const setUpdated = (item) => {
            this.setState({
                updated: [ ...this.state.updated, item],
            }, () => {
                let sortedArray = this.state.updated 
                sortedArray.sort(function(a,b){
                    return new Date(b.created) - new Date(a.created)
                })
                this.setState({ sorted: sortedArray })
            })
            return
        }

        const request = require('superagent')
        const fotosURL = this.state.fotosURL
        request.get(this.state.itemsURL)
               .set('Accept', 'application/json')
               .set('Content-Type', 'application/json')
               .set('x-access-token', Cookies.get('access-token'))
               .then(res => {
                        const itemsArray = res.body.items

                        itemsArray.forEach(function(item, idx) {
                            let url = fotosURL+item.item_id
                            request.get(url)
                                   .set('Accept', 'application/json')
                                   .set('Content-Type', 'application/json')
                                   .set('x-access-token', Cookies.get('access-token'))
                                   .then(res => {
                                        item['fotos'] = res.body.fotos
                                        setUpdated(item)
                                    })
                                   .catch(err => {
                                        if (err.status === 404) {
                                            item['fotos'] = []
                                            setUpdated(item)
                                        } else {
                                            console.log(err)
                                        }
                                    })

                        })
                })
               .catch(err => {
                    console.log(err)
                    if (err.status === 401) {
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

    selectTile = (item) => {
        const displayItem = 
            <div>
            <DisplayItem 
                item = {item}
            />
            </div>    
        this.setState({ item: displayItem },
                      () => {
                        this.setState({ showGrid: false },
                                      () => {
                                        this.setState({ showItem: true })
                                      })
                      })
        
         
    }    

    render() {
        const { classes } = this.props
        return (
            <div>
            <Paper className={classes.root}>
                { /*
                <Typography variant="h5" component="h5">
                    {this.state.blurb}
                </Typography>
                */ }                
            {this.state.showGrid ?
                <div className={classes.gridRoot}>
                  <GridList cellHeight={180} cols={4} className={classes.gridList}>
                    {this.state.sorted.map(item => (
                      <GridListTile
                        key={item.item_id}
                        onClick={() => this.selectTile(item)}
                      >
                        {item.fotos[0] ?
                            <img src={item.fotos[0].metadata.s3_url} alt='' />
                        :
                            <div style={{ textAlign: 'center', height: '100%', width: 'auto' }}>
                                <img src={nophoto} alt='' style={{height: '100%', width: 'auto'}}/>
                            </div>
                        }
                        <GridListTileBar
                          title={item.name}
                          subtitle={<span>Year: {item.year}</span>}
                          actionIcon={
                            <IconButton aria-label={`info about ${item.name}`} className={classes.icon}>
                              <InfoIcon />
                            </IconButton>
                          }
                        />
                      </GridListTile>
                    ))}
                  </GridList>
                </div>
            : null
            }
            {this.state.showItem ?
                <div>
                    {this.state.item}
                </div>
            : null
            }
            </Paper>
            {this.state.showSnack ?
                <CustomizedSnackbars
                    duration = {this.state.duration}
                    key_date = {new Date().getTime()}
                    variant  = {this.state.peckish.variant}
                    message  = {this.state.peckish.message}
                />
            : null
            }
            </div>
        )
    }

}

export default withStyles(styles)(GridBuilder)
