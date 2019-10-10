import React, {Component} from 'react'
import MainNavBar from './components/navigation/MainNavBar'
//import MyItems from './components/items/MyItems'
//import MyItemsTable from './components/items/MyItemsTable'
//import CreateItemForm from './components/items/CreateItemForm'
import GridLister from './components/helpers/GridLister'
//import AddToAuction from './components/items/AddToAuction'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import './Poptape.css'
import 'typeface-varela-round';
//import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'
//import { Carousel } from 'react-responsive-carousel'
//import blue from '@material-ui/core/colors/blue'
//import pink from '@material-ui/core/colors/pink'

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

class App extends Component {

    //constructor(props){  
    //    super(props);  
    //}  

    render() {
        return (
            <div style={{ width:"100%"}}>
                <MuiThemeProvider theme={theme}>
                <header>
                    <MainNavBar />
                </header>
                <div style={{}}>
                    <GridLister />
                </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App
