import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import 'typeface-varela-round'
import MainNavBar from '../components/navigation/MainNavBar'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
//import GridFromListerMS from '../components/helpers/GridFromListerMS'
import GridFromCategory from '../components/helpers/GridFromCategory'

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
/*
                <GridFromListerMS
                    listType = 'viewed'
                />
*/
export default function TestPage() {
    document.title = 'poptape auctions | test page'
    return (
        <div style={{ width:"100%"}}>
            <MuiThemeProvider theme={theme}>
            <header>
                <MainNavBar />
            </header>
            <div>
            <Paper style={{ margin: 20 }}>
                <Typography variant="h3">
                    Testy testy test<br /><br />
                </Typography>
                <GridFromCategory
                    category = 'cars:21000'
                    categoryLabel = "car "
                />
            </Paper>
            </div>
            </MuiThemeProvider>
        </div>
    )
}
