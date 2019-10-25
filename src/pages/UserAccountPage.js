import React, {useState} from 'react'
//import { Link } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import 'typeface-varela-round'
import MainNavBar from '../components/navigation/MainNavBar'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
//import Typography from '@material-ui/core/Typography'
import Cookies from 'js-cookie'
import AccountLoginForm from '../components/account/AccountLoginForm'
import AccountPageController from '../components/account/AccountPageController'

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

export default function UserAccountPage(props) {

    const [username, setUsername] = useState(Cookies.get('username'))
    const [accountAuthed, setAccountAuthed] = useState(
                                                Cookies.get('account-access-token') || null);

    const getPublicId = (token) => {
        const tokenArray = token.split(".")
        const base64decoded = JSON.parse(atob(tokenArray[1]))
        return base64decoded.public_id
    }

    const onSubmit = (event, data) => {
        const request = require('superagent')
        request.post('/authy/login')
               .send(JSON.stringify(data))
               .set('Accept', 'application/json')
               .set('Content-Type', 'application/json')
               .then(res => {
                    if (getPublicId(res.body.token) ===
                        getPublicId(Cookies.get('access-token'))) {
                        Cookies.set('account-access-token',
                                    res.body.token,
                                    { path: '/user/'+data.username+'/account' })
                     
                        setAccountAuthed(true)
                    }
                })
               .catch(err => {
                    console.log(err)
                });

    }
    const urlPath = props.location.pathname
    const urlArray = urlPath.split("/")

    const urlUsername = urlArray[2]
    if (urlUsername !== Cookies.get('username')) {
        if (accountAuthed) {
            setAccountAuthed(false)
        }
    }

    return (
        <Box style={{ width:"100%"}}>
            <MuiThemeProvider theme={theme}>
            <header>
                <MainNavBar />
            </header>
            <div style={{ textAlign: "center", marginTop: 20, marginLeft: 20, marginRight: 20  }}>
                <Paper style={{ paddingBottom: 50 }}>
                    {accountAuthed ?
                        <>
                            <AccountPageController
                                username = {username}
                             />
                        </>
                    :
                        <>
                            <AccountLoginForm
                                onSubmit = {onSubmit.bind()}
                             />
                        </>
                    }
                </Paper>
            </div>
            </MuiThemeProvider>
        </Box>
    )
}
