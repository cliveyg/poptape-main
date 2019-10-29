import React, {Component} from 'react'
import { Route, Switch } from 'react-router-dom'
//import { createMuiTheme } from 'material-ui/styles'

// pages
import HomePage from './pages/HomePage'
import UserProfilePage from './pages/UserProfilePage'
import UserAccountPage from './pages/UserAccountPage'
import MyItemsPage from './pages/MyItemsPage'
import CreateItemPage from './pages/CreateItemPage'
import ItemPage from './pages/ItemPage'
import UserReviewsPage from './pages/UserReviewsPage'
import UserFavouritesPage from './pages/UserFavouritesPage'
import UserPurchasedPage from './pages/UserPurchasedPage'
import UserViewedPage from './pages/UserViewedPage'
import UserWatchlistPage from './pages/UserWatchlistPage'
import Messages from './pages/Messages'
import NotFound from './pages/NotFound'
import TestPage from './pages/TestPage'

/*
const theme = createMuiTheme({
  typography: {
    // Use the system font.
    fontFamily:
      '"Varela Round",'+
      '-apple-system,system-ui,BlinkMacSystemFont,' +
      '"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
    fontSize: 12,
  },
  palette: {
    primary: {
        main: "#1976d2"
    }
  },
  MuiCardContent: {
    root: {
      margin: 0
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
              <Route exact path="/user/:username/account" component={UserAccountPage} />
              <Route exact path="/user/:username/reviews" component={UserReviewsPage} />
              <Route exact path="/user/:username/favourites" component={UserFavouritesPage} />
              <Route exact path="/user/:username/watchlist" component={UserWatchlistPage} />
              <Route exact path="/user/:username/purchased" component={UserPurchasedPage} />
              <Route exact path="/user/:username/viewed" component={UserViewedPage} />
              <Route exact path="/user/:username/messages" component={Messages} />
              <Route exact path="/user/:username" component={UserProfilePage} />
              <Route exact path="/item/create" component={CreateItemPage} />
              <Route path="/item/:item_id/:item_name" component={ItemPage} />
              <Route exact path="/testy" component={TestPage} />
              <Route component={NotFound} />
            </Switch>
        );
    }
}

export default App
