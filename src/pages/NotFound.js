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

export default function NotFound() {
    const [username, setUsername]  = useState(Cookies.get('username'))
    document.title = 'poptape auctions | not found'
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
                    Oh noes!<br /><br />
                </Typography>
                <Typography variant="body1">
                    I don't think you want to be here. Go back to the <Link to={'/'}>
                        home page
                    </Link> and try again.<br /><br />
                </Typography>
            </Paper>
            </div>
            </MuiThemeProvider>
        </div>
    )
}
