import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import CustomizedSnackbars from '../information/CustomSnackbars'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied'
import Paper from '@material-ui/core/Paper'
import Cookies from 'js-cookie'
import nophoto from '../images/no-photo-icon-faded.png'
import Typography from '@material-ui/core/Typography'
import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  gridRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
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
  noItems: {
    verticalAlign: "middle",
    textAlign: "center",
    fontSize: 70,
  },
});

class GridFromCategory extends Component {

    constructor(props) {
        super(props)

        const peckish = {
            "variant": "info",
            "message": "Items loaded"
        }

        this.state = { 
            showSnack: false,
            showGrid: true,
            showLoader: true,
            showNoItems: false,
            fotosURL: this.props.fotosURL || '/fotos/item/',
            category: this.props.category, 
            categoryLabel: this.props.categoryLabel || "",
            duration: 1900,
            item: '',
            items: [],
            updated: [],
            sorted: [],
            peckish: peckish 
        }

        const setUpdated = (item) => {
            this.setState({
                updated: [ ...this.state.updated, item],
            }, () => {
                let sortedArray = this.state.updated
                sortedArray.sort(function(a,b){
                    return new Date(b.created) - new Date(a.created)
                })
                this.setState({ sorted: sortedArray },
                              () => { 
                                this.setState({showLoader: false},
                                () => { this.setState({showGrid: true}) })
                              })
            })
            return
        }

        const request = require('superagent')
        const listURL = '/items/cat/'+this.state.category
        request.get(listURL)
               .set('Accept', 'application/json')
               .set('Content-Type', 'application/json')
               .then(res => {
                    const itemsArray = res.body.items
                    const fotosURL = this.state.fotosURL
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
                        this.setState({ peckish: peckish },
                                      () => { this.openSnack() })
                    } else if (err.status === 502) {
                        const peckish = {
                            variant: "error",
                            message: "Computer says no"
                        }
                        this.setState({ peckish: peckish },
                                      () => { this.openSnack() })
                    } else if (err.status === 404) {
                            this.setState({showLoader: false},
                                () => { this.setState({showNoItems: true}) })
                    } else {
                        const peckish = {
                            variant: "warning",
                            message: "Something went bang"
                        }
                        this.setState({ peckish: peckish },
                                      () => { this.openSnack() })
                    }       
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
            {this.state.showLoader ?
            <div style={{ width: '100%' }}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Grid loading...
                </Typography>
                <div className={classes.progress}>
                    <br /><CircularProgress />
                </div>
            </div>
            : null
            }
            {this.state.showNoItems ?
            <div style={{ width: '100%' }}>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  You have no {this.state.categoryLabel}items
                </Typography>
                <div className={classes.noItems}>
                    <br />
                    <SentimentDissatisfiedIcon fontSize="inherit"/>
                    <br />
                    <br />                    
                </div>
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

export default compose(withStyles(styles))(withRouter(GridFromCategory))
