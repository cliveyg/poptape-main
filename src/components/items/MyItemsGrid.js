import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import CustomizedSnackbars from '../information/CustomSnackbars'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import Paper from '@material-ui/core/Paper'
import Cookies from 'js-cookie'
import nophoto from '../images/no-photo-icon-faded.png'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'
import { Button } from '@material-ui/core'

import CircularProgress from '@material-ui/core/CircularProgress'

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
  },
  gridRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridTitle: {
    fontSize: "1.2em",
  },
  gridList: {
    width: "100%",
    height: '100%',
    "&:hover": {
        cursor: 'pointer'
    },
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  progress: {
    verticalAlign: "middle",
    textAlign: "center"
  },
  title: {
    fontSize: "1.2em",
  },
  createButt: {
    textTransform: "none"
  }
});

class MyItemsGrid extends Component {

    constructor(props) {
        super(props)
        console.log("Initialising MyItemsGrid")

        const peckish = {
            "variant": "info",
            "message": "Items loaded"
        }

        this.state = { showSnack: false,
                       showGrid: false,
                       showLoader: true,
                       showEmpty: false,
                       itemsURL: this.props.itemsURL || '/items',
                       fotosURL: this.props.fotosURL || '/fotos/item/',
                       duration: 1900,
                       item: '',
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
                this.setState({ sorted: sortedArray },
                              () => { this.setState({showLoader: false},
                                () => { this.setState({showGrid: true}) })
                              })
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
                    if (err.status === 404) {
                        const peckish = {
                            variant: "warning",
                            message: "Hmmm, there's nothing here yet"
                        }                        
                        this.setState({ peckish: peckish },
                            () => { this.setState({showLoader: false},
                                () => { this.setState({ showEmpty: true })})})
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
        const redirectURL = '/item/'+item.item_id+'/'+encodeURI(item.name)
        this.props.history.push({
            pathname: redirectURL,
            state: { item: item }
        })
    }    

    render() {
        const { classes } = this.props
        return (
            <div>
            <Paper className={classes.root}>
            {this.state.showGrid ?
                <div>
                <Typography className={classes.gridTitle}>
                    My items
                </Typography>
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
                </div>
            : null
            }
            {this.state.showLoader ?
            <div style={{ width: '100%' }}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  My items
                </Typography>
                <div className={classes.progress}>
                    <br /><CircularProgress />
                </div>
            </div>
            : null
            }
            {this.state.showEmpty ?
            <div style={{ width: '100%' }}>
                <Typography className={classes.title} gutterBottom>
                  My items
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  Eeek, looks like you don't have any items yet.<br /><br />
                </Typography>
                <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.createButt}
                    size="large"
                        onClick={() => this.props.history.push('/item/create')}
                >
                    Create an item
                </Button>
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

export default compose(withStyles(styles))(withRouter(MyItemsGrid))
