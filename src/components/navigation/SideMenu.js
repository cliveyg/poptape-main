import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Cookies from 'js-cookie'
import { withRouter } from 'react-router-dom'
import compose from 'recompose/compose'

const Styles = theme => ({
    menubuttons: {
        marginTop: 15,
        textTransform: "none",
        marginRight: 15,
        //width: "100%",
        width: 200,
    },
})

class SideMenu extends Component {
  
    constructor(props){
        super(props)
     
        this.state = {
            username: Cookies.get('username'),
            selected: this.props.selected
        }

    } 

    componentDidMount() {
        document.title = 'poptape auctions | my recently viewed items'
    }
    

    render() {
        const { classes } = this.props
        return (
            <>
            {this.state.selected === "profile" ?
                <Button
                    className = {classes.menubuttons}
                    color = "primary"
                    variant="contained"
                    size="small"
                    onClick={() => this.props.history.push('/user/'+this.state.username)}
                >
                    My profile
                </Button>
            :
                <Button
                    className = {classes.menubuttons}
                    color = "primary"
                    variant="outlined"
                    size="small"
                    onClick={() => this.props.history.push('/user/'+this.state.username)}
                >   
                    My profile
                </Button>
            }
            <br />
            {this.state.selected === "account" ?
                <Button
                    className = {classes.menubuttons}
                    color = "primary"
                    variant="contained"
                    size="small"
                    onClick={() => this.props.history.push('/user/'+this.state.usernamei+'/account')}
                >
                    My account
                </Button>
            :
                <Button
                    className = {classes.menubuttons}
                    color = "primary"
                    variant="outlined"
                    size="small"
                    onClick={() => this.props.history.push('/user/'+this.state.username+'/account')}
                >
                    My account
                </Button>
            }
            <br />
            {this.state.selected === "watchlist" ?
                <Button
                    className = {classes.menubuttons}
                    color = "primary"
                    variant="contained"
                    size="small"
                    onClick={() => this.props.history.push('/user/'+this.state.username+'/watchlist')}
                >
                    My watchlist
                </Button>
            :
                <Button
                    className = {classes.menubuttons}
                    color = "primary"
                    variant="outlined"
                    size="small"
                    onClick={() => this.props.history.push('/user/'+this.state.username+'/watchlist')}
                >
                    My watchlist
                </Button>
            } 
            <br />
            {this.state.selected === "favourites" ?
                <Button
                    className = {classes.menubuttons}
                    color = "primary"
                    variant="contained"
                    size="small"
                    onClick={() => this.props.history.push('/user/'+this.state.username+'/favourites')}
                >
                    My favourites
                </Button>
            :
                <Button
                    className = {classes.menubuttons}
                    color = "primary"
                    variant="outlined"
                    size="small"
                    onClick={() => this.props.history.push('/user/'+this.state.username+'/favourites')}
                >
                    My favourites
                </Button>
            }
            <br />
            {this.state.selected === "viewed" ?
                <Button
                    className = {classes.menubuttons}
                    color = "primary"
                    variant="contained"
                    size="small"
                    onClick={() => this.props.history.push('/user/'+this.state.username+'/viewed')}
                >
                    My recently viewed
                </Button>
            :
                <Button
                    className = {classes.menubuttons}
                    color = "primary"
                    variant="outlined"
                    size="small"
                    onClick={() => this.props.history.push('/user/'+this.state.username+'/viewed')}
                >
                    My recently viewed
                </Button>
            }
            <br />
            {this.state.selected === "purchased" ?
                <Button
                    className = {classes.menubuttons}
                    color = "primary"
                    variant="contained"
                    size="small"
                    onClick={() => this.props.history.push('/user/'+this.state.username+'/purchased')}
                >
                    My purchase history
                </Button>
            :
                <Button
                    className = {classes.menubuttons}
                    color = "primary"
                    variant="outlined"
                    size="small"
                    onClick={() => this.props.history.push('/user/'+this.state.username+'/purchased')}
                >
                    My purchase history
                </Button>
            }
            <br />
            {this.state.selected === "reviews" ?
                <Button
                    className = {classes.menubuttons}
                    color = "primary"
                    variant="contained"
                    size="small"
                    onClick={() => this.props.history.push('/user/'+this.state.username+'/reviews')}
                >
                    My reviews
                </Button>
            :
                <Button
                    className = {classes.menubuttons}
                    color = "primary"
                    variant="outlined"
                    size="small"
                    onClick={() => this.props.history.push('/user/'+this.state.username+'/reviews')}
                >
                    My reviews
                </Button>
            }
            <br />
            <br />
            </>
        )
    }

}

export default compose(withStyles(Styles))(withRouter(SideMenu))
