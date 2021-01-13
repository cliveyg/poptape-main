import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import 'typeface-varela-round'
import MainNavBar from '../components/navigation/MainNavBar'
import Box from '@material-ui/core/Box'
import { useHistory } from "react-router-dom"
import Cookies from 'js-cookie'
import MessagePageController from '../components/messages/MessagePageController'

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

export default function Messages(props) {

    let history = useHistory()

    document.title = 'poptape auctions | my messages'

    const urlPath = props.location.pathname
    const urlArray = urlPath.split("/")

    const urlUsername = urlArray[2]
    if (urlUsername !== Cookies.get('username')) {
        history.push("/user/"+urlUsername)
    }

    return (
        <div style={{ width:"100%"}}>
            <MuiThemeProvider theme={theme}>
            <header>
                <MainNavBar />
            </header>
            <Box>
                <MessagePageController />
            </Box>
            </MuiThemeProvider>
        </div>
    )
}
