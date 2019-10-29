import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import blue from '@material-ui/core/colors/blue'

const Styles = theme => ({
    textSmaller: {
        fontSize: "0.6em",
    },
    linky: {
        color: blue[700],
        "&:visited": {
            color: blue[700],
        },
        textDecoration: "none",
    },
    cardContent: {
        "&:last-child": {
            paddingBottom: 2,
        }
    },
    topMargin: {
        marginTop: 5
    },
});

class MetaViewerOther extends Component {

    constructor(props) {
        super(props)

        this.state = { 
            reviewsBy: 0,
            reviewsOf: 0,
            rating: 0,
            username: this.props.username,
            publicId: this.props.publicId,
            setLinky: ""
        }
        console.log("Initialising MetaViewerOther")
    }

    componentDidMount() {

        const { classes } = this.props
        let url = '/reviews/user/'+this.state.publicId
        this.setState({ reviewsURL: '/user/'+this.state.username+'/reviews' })

        const request = require('superagent')
        request.get(url)
               .set('Content-Type', 'application/json')
               .set('Accept', 'application/json')
               .then(res => {
                    this.setState({ rating: res.body.calculated_score })
                    this.setState({ reviewsOf: res.body.total_reviews_of })
                    this.setState({ reviewsBy: res.body.total_reviews_by })

                    const linky = <Link
                                      to={this.state.reviewsURL}
                                      className={classes.linky}
                                  >
                                      Go to reviews >>
                                  </Link>
                    this.setState({ setLinky: linky })

                })
               .catch(err => {
                    console.log(err)
                })

    }

    render() {
        const { classes } = this.props
        return (
            <Card>
                <CardContent className={classes.cardContent}>
                    <Typography variant="h4">
                        {this.state.rating}% <span className={classes.textSmaller}> rating</span>
                    </Typography> 
                    <br />
                    <Typography variant="subtitle1">
                        {this.state.reviewsOf} reviews of {this.state.username}. <br />
                        {this.state.reviewsBy} reviews by {this.state.username}. <br />
                        <div className={classes.topMargin}>
                            {this.state.setLinky}
                        </div>
                    </Typography>
                </CardContent>
            </Card>
        )
    }

}

export default withStyles(Styles)(MetaViewerOther)
