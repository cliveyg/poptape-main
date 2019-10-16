import React, {Component} from 'react'
//import MainNavBar from './components/navigation/MainNavBar'
//import MyItems from './components/items/MyItems'
//import MyItemsTable from './components/items/MyItemsTable'
//import CreateItemForm from './components/items/CreateItemForm'
//import GridLister from './components/helpers/GridLister'
//import AddToAuction from './components/items/AddToAuction'
//import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom'
//import './Poptape.css'
//import 'typeface-varela-round'
import { Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage'
import UserProfilePage from './pages/UserProfilePage'
//import ItemPage from './pages/ItemPage'
import MyItemsPage from './pages/MyItemsPage'
import CreateItemPage from './pages/CreateItemPage'
//import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'
//import { Carousel } from 'react-responsive-carousel'
//import blue from '@material-ui/core/colors/blue'
//import pink from '@material-ui/core/colors/pink'

/*
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
<Route path="/item/:item" component={ItemPage} />
*/

class App extends Component {

    //constructor(props){  
    //    super(props);  
    //}  

    render() {
        return (
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/user/:username/items" component={MyItemsPage} />
              <Route path="/user/:username" component={UserProfilePage} />
              <Route path="/item/create" component={CreateItemPage} />
            </Switch>
        );
    }
}

export default App
