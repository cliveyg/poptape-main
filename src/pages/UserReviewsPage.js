import React from 'react'
//import { Link } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import 'typeface-varela-round'
import MainNavBar from '../components/navigation/MainNavBar'
//import Paper from '@material-ui/core/Paper'
//import Typography from '@material-ui/core/Typography'
//import Cookies from 'js-cookie'
import Box from '@material-ui/core/Box'
import UserReviewsController from '../components/reviews/UserReviewsController'

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

export default function UserReviewsPage(props) {

    return (
        <div style={{ width:"100%"}}>
            <MuiThemeProvider theme={theme}>
            <header>
                <MainNavBar />
            </header>
            <Box>
                <UserReviewsController />
            </Box>
            </MuiThemeProvider>
        </div>
    )
}
