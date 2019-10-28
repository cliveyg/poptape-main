import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import '../Poptape.css'
import 'typeface-varela-round'
import MainNavBar from '../components/navigation/MainNavBar'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Cookies from 'js-cookie'

const theme = createMuiTheme({
  typography: {
    // Use the system font.
    fontFamily:
      '"Varela Round",'+
      '-apple-system,system-ui,BlinkMacSystemFont,' +
      '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    fontSize: 12,
    h5: {
        fontSize: 18,
    },
    button: {
        fontSize: 18,
    }
  },
  palette: {
    primary: {
        main: "#1976d2"
    }
  }
})

export default function HomePage() {
    const [username, setUsername]  = useState(Cookies.get('username'))
    document.title = 'poptape auctions | home'
    //2019-10-31T18:00:00Z
    return (
        <div style={{ width:"100%"}}>
            <MuiThemeProvider theme={theme}>
            <header>
                <MainNavBar />
            </header>
            <div>
            <Paper style={{ margin: 20 }}>
                <Typography variant="h3">
                    My homie!
                </Typography>
                <Typography variant="body1">
                    <br />
                    <br />
                    <Link to='/item/create' style={{ padding: 10 }}>
                        Create item<br />
                    </Link>
                    <br />
                    {username !== undefined ?
                        <>
                        <Link to={'/user/'+username} style={{ padding: 10 }}>
                            Current users profile<br />
                        </Link>
                        <Link to={'/user/'+username+'/account'} style={{ padding: 10 }}>
                            Current users account<br />
                        </Link>
                        <Link to={'/user/'+username+'/messages'} style={{ padding: 10 }}>
                            Current users messages<br />
                        </Link>
                        <Link to={'/user/'+username+'/favourites'} style={{ padding: 10 }}>
                            Current users favourites<br />
                        </Link>
                        <Link to={'/user/'+username+'/items'} style={{ padding: 10 }}>
                            Current users items<br />
                        </Link>
                        <br /><br />
                        </>
                    : null
                    }
                    <Link to={'/user/blinky'} style={{ padding: 10 }}>
                        blinky profile<br />
                    </Link>
                    <Link to={'/user/môrk'} style={{ padding: 10 }}>
                        môrk profile<br />
                    </Link>
                    <br />
                    <Link to={'/user/blinky/favourites'} style={{ padding: 10 }}>
                        blinky favourites<br />
                    </Link>
                    <Link to={'/user/blinky/viewed'} style={{ padding: 10 }}>
                        blinky recently viewed<br />
                    </Link>
                    <Link to={'/user/blinky/purchased'} style={{ padding: 10 }}>
                        blinky recently purchased<br />
                    </Link>
                    <br />
                    <Link to={'/user/blinky/account'} style={{ padding: 10 }}>
                        blinky account<br />
                    </Link>
                    <Link to={'/user/môrk/account'} style={{ padding: 10 }}>
                        môrk account<br />
                    </Link>
                </Typography>
            </Paper>
            </div>
            </MuiThemeProvider>
        </div>
    )
}
