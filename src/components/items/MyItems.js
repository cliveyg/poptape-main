import React, {Component} from 'react'
import Cookies from 'js-cookie'
//import CustomizedSnackbars from './CustomSnackbars'

class MyItems extends Component {
    state = { items: [] };

    componentDidMount() {

        const request = require('superagent')
        request.get('/items')
               .set('x-access-token', Cookies.get('access-token'))
               .set('Accept', 'application/json')
               .set('Content-Type', 'application/json')
               .then(res => {
                    console.log(res.status)
                    const items = res.body.items;
                    console.log(items)
                    this.setState({ items });
               })
               .catch(err => {
                    if (err.status === 404) {
                        console.log("nowt ere")
                    }
                    console.log("Errr ["+err.status+"]")
               });
    }

    render() {
        return (
            <div>
                {this.state.items.map((item, index) => {
                    return (
                        <div key={index}>
                            <span>{item.id}</span>
                            <span>&nbsp;&nbsp;&nbsp;</span>
                            <span>{item.details.name}</span>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default MyItems
