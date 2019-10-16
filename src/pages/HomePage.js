import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import '../Poptape.css'
import 'typeface-varela-round'
import MainNavBar from '../components/navigation/MainNavBar'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

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
            </Paper>
                <Typography variant="body1">
                    <Link to='/' style={{ padding: 10 }}>
                        Home<br />
                    </Link>
                    <Link to='/item/gsjdhfgsjfdghs' style={{ padding: 10 }}>
                        Item<br />
                    </Link>
                    <Link to='/user/mork' style={{ padding: 10 }}>
                        Profile<br />
                    </Link>
                </Typography>
            </div>
            </MuiThemeProvider>
        </div>
    )
}