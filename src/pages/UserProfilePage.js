import React from 'react'
//import { Link } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import 'typeface-varela-round'
import MainNavBar from '../components/navigation/MainNavBar'
//import Paper from '@material-ui/core/Paper'
//import Typography from '@material-ui/core/Typography'
import Cookies from 'js-cookie'
import Box from '@material-ui/core/Box'
import ProfileViewer from '../components/profile/ProfileViewer'
import ProfileOwner from '../components/profile/ProfileOwner'

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

export default function UserProfilePage(props) {

    const [username, setUsername] = React.useState(Cookies.get('username'))
    const [owner, setOwner] = React.useState(null)

    const urlPath = props.location.pathname
    const urlArray = urlPath.split("/")    
    const urlUsername = urlArray[2]
    if (urlUsername === username) {
        if (!owner) {
            setOwner(true)
        }
    }    

    return (
        <div style={{ width:"100%"}}>
            <MuiThemeProvider theme={theme}>
            <header>
                <MainNavBar />
            </header>
            <Box>
            {owner ?
                <ProfileOwner />
            :
                <ProfileViewer
                    username  = {urlUsername}
                />
            }            
            </Box>
            </MuiThemeProvider>
        </div>
    )
}
