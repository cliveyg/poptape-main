import React, {Component} from 'react'
import { Route, Switch } from 'react-router-dom'

// pages
import HomePage from './pages/HomePage'
import UserProfilePage from './pages/UserProfilePage'
import MyItemsPage from './pages/MyItemsPage'
import CreateItemPage from './pages/CreateItemPage'
//import ItemPage from './pages/ItemPage'
import ItemPage from './pages/ItemPage'

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
*/

class App extends Component {

    render() {
        return (
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/user/:username/items" component={MyItemsPage} />
              <Route path="/user/:username" component={UserProfilePage} />
              <Route path="/item/create" component={CreateItemPage} />
              <Route path="/item/:item_id/:item_name" component={ItemPage} />
            </Switch>
        );
    }
}

export default App
