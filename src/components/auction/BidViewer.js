import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
//import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import blue from '@material-ui/core/colors/blue'
import AvatarChooser from '../helpers/AvatarChooser'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const Styles = theme => ({
  card: {
    marginTop: 5,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    minWidth: 275,
    minHeight: 260,
    //paddingBottom: 5,
  },
  title: {
    fontSize: "1.0em",
  },
  linky: {
    color: blue[700],
    "&:visited": {
      color: blue[700],
    },
    textDecoration: "none",
  },
  paddingBeLess: {
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 5,
  },
  progress: {
    verticalAlign: "middle",
    textAlign: "center"
  },
  username: {
    //fontSize: "1.2em",
    //width: 150
  },
  usernameContainer: {
    display: "flex",
    flexFlow: "row",
  },
  avatar: {
    order: 1,
    flex: 1,
    //width: 17,
    maxWidth: 30,
    verticalAlign: "middle",
    height: "100%",
  },
  userDetails: {
    order: 2,
    flex: 1,
    align: "left",
    verticalAlign: "middle",
    //minWidth: 90,
    height: "100%",
  },
  amount: {
    fontWeight: "bold",
  },
  tableHead: {
    fontWeight: "bold",
  },
  cwUser: {
    fontSize: "0.6em",
    //marginLeft: 8,
    fontWeight: "bold",
    color: "#1976d2",
  },
  cwNoOne: {
    //marginLeft: 8,
    fontWeight: "bold",    
    fontSize: "0.6em",
    color: "#b0bec5",
  },
  tableContainer: { 
    overflow: 'auto', 
    height: '165px' 
    //height: "100%",
  },
  largeTableContainer: {
    overflow: 'auto',
    height: '300px'
  },
});


class BidViewer extends Component {

    constructor(props) { 
        super(props)

        this.state = { 
            showCard: false,
            lines: [],
            dataLoaded: false,
            viewerSize: props.viewerSize || 'small',
            currentBestBid: props.currentBestBid || null,
            allBids: props.allBids || null
        }

        this.buildRows = this.buildRows.bind(this)
        this.numberForDisplay = this.numberForDisplay.bind(this)
        this.showCurrentBest = this.showCurrentBest.bind(this)

    } // end of constructor


    componentDidMount() {
        this.setState({ dataLoaded: true  },
                      () => { this.setState({ showCard: true })})
    }

    numberForDisplay(n) {
            return '£'+n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    showCurrentBest() {
        if (this.props.currentBestBid.bid_status === 'none') {
            return ('No-one has bid successfully on this item yet')
        } else {
            return (this.props.currentBestBid.username +
                    ' is currently winning with a bid of ' +
                    this.numberForDisplay(this.props.currentBestBid.bid_amount))
        }
    }

    buildRows() {
        const { classes } = this.props
        const bids = this.props.allBids
     
        const bidLines = bids.map((bid, idx) => {

            const bidIdA = bid.bid_id.split("-")  //bid.bid_id.substring(25,12)
            const bidId = bidIdA[4]

            return  <TableRow key={bid.bid_id}>
                       <TableCell align="left" className={classes.username}>
                           <div className={classes.usernameContainer}>
                               <div className={classes.avatar}>
                                   <AvatarChooser
                                       avatarName="random"
                                       avatarSize="small"
                                   />  
                               </div>
                               <div className={classes.userDetails}>{bid.username}</div>
                           </div>
                       </TableCell>
                       <TableCell
                            className={classes.amount}
                            align="left"
                        >{this.numberForDisplay(bid.bid_amount)}</TableCell>
                        <TableCell align="left" component="th" scope="row">{bid.message}</TableCell>
                        <TableCell align="left">{bidId}</TableCell>
                        <TableCell align="left">{bid.bid_status}</TableCell>
                    </TableRow>
        })
        return bidLines
    }


    render() {
        const { classes } = this.props
        return (
            <Card className={classes.card}>
              {this.state.showCard ?
              <>
              <CardContent className={classes.paddingBeLess}>
                {this.state.currentBestBid ?
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Bidding information<br />
                        <span className={classes.cwUser}>{this.showCurrentBest()}</span>
                    </Typography>
                :
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Bidding information<br />
                        <span className={classes.cwNoOne}>No-one is currently winning this lot</span>
                    </Typography>
                }
                <div>
                {this.state.viewerSize === 'large' ?
                    <div className={classes.largeTableContainer}>
                    <Table stickyHeader size="small" aria-label="bid table">
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.tableHead}>Bidder</TableCell>
                          <TableCell className={classes.tableHead} align="left">Bid</TableCell>
                          <TableCell className={classes.tableHead} align="left">Message</TableCell>
                          <TableCell className={classes.tableHead} align="left">ID</TableCell>
                          <TableCell className={classes.tableHead} align="left">Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>{this.buildRows()}</TableBody>
                    </Table>
                    </div>
                :
                    <div className={classes.tableContainer}>
                    <Table stickyHeader size="small" aria-label="bid table">
                      <TableHead>
                        <TableRow>
                          <TableCell className={classes.tableHead}>Bidder</TableCell>
                          <TableCell className={classes.tableHead} align="left">Bid</TableCell>
                          <TableCell className={classes.tableHead} align="left">Message</TableCell>
                          <TableCell className={classes.tableHead} align="left">ID</TableCell>
                          <TableCell className={classes.tableHead} align="left">Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>{this.buildRows()}</TableBody>
                    </Table>
                    </div>
                }
                </div>
              </CardContent>
              </>
              :
              <>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  Bidding information
                </Typography>
                <div className={classes.progress}>
                    <br /><CircularProgress />
                </div> 
              </CardContent>
              </> 
              }     
            </Card>
        );
    }
}

export default withStyles(Styles)(BidViewer)
