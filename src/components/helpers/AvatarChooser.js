import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Cookies from 'js-cookie'

import blank_avatar_groovy from '../images/avatars/blank-avatar-groovy.png'
import blank_avatar_cubist_grey from '../images/avatars/blank-avatar-cubist-grey.png'
import blank_avatar_groovy_orange from '../images/avatars/blank-avatar-groovy-orange.png'
import blank_avatar_groovy_three from '../images/avatars/blank-avatar-groovy-three.png'
import blank_avatar_groovy_too from '../images/avatars/blank-avatar-groovy-too.png'
import blank_avatar_horizontal_gradient from '../images/avatars/blank-avatar-horizontal-gradient.png'
import blank_avatar_inner_groovy from '../images/avatars/blank-avatar-inner-groovy.png'
import blank_avatar_mysterion from '../images/avatars/blank-avatar-mysterion.png'
import blank_avatar_plain_brown from '../images/avatars/blank-avatar-plain-brown.png'
import blank_avatar_plain_yellow from '../images/avatars/blank-avatar-plain-yellow.png'
import blank_avatar_plain from '../images/avatars/blank-avatar-plain.png'
import blank_avatar_psyche_angled_grey from '../images/avatars/blank-avatar-psyche-angled-grey.png'
import blank_avatar_psyche_angled from '../images/avatars/blank-avatar-psyche-angled.png'
import blank_avatar_silver_gradient from '../images/avatars/blank-avatar-silver-gradient.png'
import blank_avatar_strong_and_groovy from '../images/avatars/blank-avatar-strong-and-groovy.png'
import blank_avatar_top_of_the_pops_free from '../images/avatars/blank-avatar-top-of-the-pops-free.png'
import blank_avatar_top_of_the_pops_too from '../images/avatars/blank-avatar-top-of-the-pops-too.png'
import blank_avatar_top_of_the_pops from '../images/avatars/blank-avatar-top-of-the-pops.png'
import blank_avatar_woah_dude from '../images/avatars/blank-avatar-woah-dude.png'
import blank_avatar_woah_man from '../images/avatars/blank-avatar-woah-man.png'
import blank_avatar_woah_subtle_dude from '../images/avatars/blank-avatar-woah-subtle-dude.png'
import blank_avatar_yellowy_triangled from '../images/avatars/blank-avatar-yellowy-triangled.png'
//import blank_avatar_blue_cloud from '../images/avatars/blank-avatar-blue-cloud.png '
import blank_avatar_blue_fade from '../images/avatars/blank-avatar-blue-fade.png'
import blank_avatar_blue_news from '../images/avatars/blank-avatar-blue-news.png'
import blank_avatar_dramatic_blue_cloud from '../images/avatars/blank-avatar-dramatic-blue-cloud.png'
import blank_avatar_eighties_disco from '../images/avatars/blank-avatar-eighties-disco.png'
//import blank_avatar_green_cloud from '../images/avatars/blank-avatar-green-cloud.png '
//import blank_avatar_pipe_down from '../images/avatars/blank-avatar-pipe-down.png '
import blank_avatar_purple_cloud from '../images/avatars/blank-avatar-purple-cloud.png'
//import blank_avatar_sid_sings_syd from '../images/avatars/blank-avatar-sid-sings-syd.png '
import blank_avatar_woody_one from '../images/avatars/blank-avatar-woody-one.png'
import blank_avatar_woody_two from '../images/avatars/blank-avatar-woody-two.png'

const avatarList = [
//    { 'blank_avatar_blue_cloud': blank_avatar_blue_cloud },
    { 'blank_avatar_blue_fade': blank_avatar_blue_fade },
    { 'blank_avatar_blue_news': blank_avatar_blue_news },
    { 'blank_avatar_dramatic_blue_cloud': blank_avatar_dramatic_blue_cloud },
    { 'blank_avatar_eighties_disco': blank_avatar_eighties_disco },
//    { 'blank_avatar_green_cloud': blank_avatar_green_cloud },
//    { 'blank_avatar_pipe_down': blank_avatar_pipe_down },
    { 'blank_avatar_purple_cloud': blank_avatar_purple_cloud },
//    { 'blank_avatar_sid_sings_syd': blank_avatar_sid_sings_syd },
    { 'blank_avatar_woody_one': blank_avatar_woody_one },
    { 'blank_avatar_woody_two': blank_avatar_woody_two },
    { 'blank_avatar_groovy': blank_avatar_groovy },
    { 'blank_avatar_cubist_grey': blank_avatar_cubist_grey },
    { 'blank_avatar_groovy_orange': blank_avatar_groovy_orange },
    { 'blank_avatar_groovy_three': blank_avatar_groovy_three },
    { 'blank_avatar_groovy_too': blank_avatar_groovy_too },
    { 'blank_avatar_horizontal_gradient': blank_avatar_horizontal_gradient },
    { 'blank_avatar_inner_groovy': blank_avatar_inner_groovy },
    { 'blank_avatar_mysterion': blank_avatar_mysterion },
    { 'blank_avatar_plain_brown': blank_avatar_plain_brown },
    { 'blank_avatar_plain_yellow': blank_avatar_plain_yellow },
    { 'blank_avatar_plain': blank_avatar_plain },
    { 'blank_avatar_psyche_angled_grey': blank_avatar_psyche_angled_grey },
    { 'blank_avatar_psyche_angled': blank_avatar_psyche_angled },
    { 'blank_avatar_silver_gradient': blank_avatar_silver_gradient },
    { 'blank_avatar_strong_and_groovy': blank_avatar_strong_and_groovy },
    { 'blank_avatar_top_of_the_pops_free': blank_avatar_top_of_the_pops_free },
    { 'blank_avatar_top_of_the_pops_too': blank_avatar_top_of_the_pops_too },
    { 'blank_avatar_top_of_the_pops': blank_avatar_top_of_the_pops },
    { 'blank_avatar_woah_dude': blank_avatar_woah_dude },
    { 'blank_avatar_woah_man': blank_avatar_woah_man },
    { 'blank_avatar_woah_subtle_dude': blank_avatar_woah_subtle_dude },
    { 'blank_avatar_yellowy_triangled': blank_avatar_yellowy_triangled },
]

const Styles = theme => ({
  xLAvatar: {
    margin: 12,
    marginRight: 25,
    width: 90,
    height: 90,
  },
  bigAvatar: {
    margin: 10,
    marginRight: 20,
    width: 60,
    height: 60,
  },
  smallAvatar: {
    margin: 2,
    marginRight: 5,
    width: 20,
    height: 20,
  },
});

class AvatarChooser extends Component {

    constructor(props){
        super(props)
        this.state = {
            avatarName: this.props.avatarName || null,
            avatarSize: this.props.avatarSize || null,
            avatarObj: this.props.avatarObj || null,
            bespokeAvatar: this.props.bespokeAvatar || null,
            profile: this.props.profile || null,
            publicId: this.props.publicId || null,
        }
        //console.log("[[ AvatarChooser ]] -> constructor ")
        this.setAvatar = this.setAvatar.bind(this)
        if (!this.props.profile && !this.props.avatarObj) {
            // profile not passed in so we need to get it
            const request = require('superagent')
            let profileURL = '/profile'
            if (this.props.publicId) {
                profileURL = '/profile/'+this.props.publicId
            }
            request.get(profileURL)
                   .set('Accept', 'application/json')
                   .set('Content-Type', 'application/json')
                   .set('x-access-token',Cookies.get('access-token'))
                   .then(res => {
                        if (res.body.bespoke_avatar !== null) {
                            this.setState({ avatarObj: res.body.bespoke_avatar })
                        } else {
                            this.setState({ avatarName: res.body.standard_avatar },
                                          () => { 
                                              this.setAvatar()  
                                          })
                        }
                    })
                   .catch(err => {
                        console.log(err)
                    });        
        } else {
            // got profile or avatar obj already 
            //if (this.props
            
        }
    }

    setAvatar = () => {

        //console.log("[[ AvatarChooser ]] -> setAvatar ")

        if (this.state.avatarName) {
            let avatar = avatarList.find(o => o[this.state.avatarName])
            if (!avatar) {
                avatar = avatarList[Math.floor(Math.random() * avatarList.length)]
            }
            const keys = Object.keys(avatar)
            this.setState({ avatarObj: avatar[keys[0]] })

        } else {
            this.setState({ avatarObj: blank_avatar_cubist_grey })
        }

        if (!this.state.avatarSize) {
            this.setState({ avatarSize: "small" })
        }

    }

    componentDidMount() {
        //console.log("[[ AvatarChooser ]] -> componentDidMount")
        if (!this.state.avatarObj) {
            this.setAvatar()
        }

        if (this.props.avatarObj) {
            this.setState({ avatarObj: this.props.avatarObj })
        }
    }

    render() {
        const { classes } = this.props
        return (
            <>
            {this.state.avatarSize === 'large' ?
                <Avatar 
                    alt={this.state.avatarName} 
                    src={this.props.avatarObj || this.state.avatarObj}
                    className={classes.bigAvatar} 
                />
            : null }
            {this.state.avatarSize === 'xl' ?
                <Avatar 
                    alt={this.state.avatarName} 
                    src={this.props.avatarObj || this.state.avatarObj} 
                    className={classes.xLAvatar} 
                />
            : null }
            {this.state.avatarSize === 'small' ?
                <Avatar 
                    alt={this.state.avatarName} 
                    src={this.props.avatarObj || this.state.avatarObj}
                    className={classes.smallAvatar} 
                />
            : null }
            </>
        )
    }
    
}

export default withStyles(Styles)(AvatarChooser)
