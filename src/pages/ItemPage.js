import React, { useState } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import '../Poptape.css'
import 'typeface-varela-round'
import MainNavBar from '../components/navigation/MainNavBar'
import ItemPageController from '../components/items/ItemPageController'
import Paper from '@material-ui/core/Paper'

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




export default function ItemPage(props) {

    const [item, setItem] = useState('')
    const [gotItem, setGotItem] = useState(false)

    function getItemData(iProps) {

        if (typeof(iProps.location.state) === 'undefined') {
            const request = require('superagent')
            
            request.get('/items/'+iProps.match.params.item_id)
                   .set('Accept', 'application/json')
                   .set('Content-Type', 'application/json')
                   .then(res => {
                        let rItem = res.body
                        rItem['item_id'] = iProps.match.params.item_id
                        request.get('/fotos/item/'+rItem.item_id)
                               .set('Accept', 'application/json')
                               .set('Content-Type', 'application/json')
                               .then(res => {
                                    rItem['fotos'] = res.body.fotos
                                    setItem(rItem)
                                    setGotItem(true)
                                })
                               .catch(err => {
                                    if (err.status === 404) {
                                        rItem['fotos'] = []
                                        setItem(rItem)
                                        setGotItem(true)
                                    } else {
                                        console.log(err)
                                    }
                                })
                    })
                   .catch(err => {
                        console.log(err)
                    })        
        } else {
            setItem(iProps.location.state.item)
            setGotItem(true)
        }

    }

    if (!gotItem) {
        getItemData(props) 
    }  

    return (
        <div style={{ width:"100%"}}>
            <MuiThemeProvider theme={theme}>
            <header>
                <MainNavBar />
            </header>
            <div>
            <Paper style={{ margin: 20 }}>
                {gotItem ?
                    <ItemPageController
                        item = {item}
                    />
                : null
                }
            </Paper>
            </div>
            </MuiThemeProvider>
        </div>
    )
}
