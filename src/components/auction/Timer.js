import React, {Component} from 'react'
import Typography from '@material-ui/core/Typography'

class Timer extends Component {
    _isMounted = false

    constructor(props){  
        super(props);  

        this.state = { showTime: '',
                       time: {}, 
                       seconds: 0 }

        this.startTimer = this.startTimer.bind(this)
        this.displayTimer = this.displayTimer.bind(this)
        this.setOriginalTime = this.setOriginalTime.bind(this)
        this.timer = 0
        this.countDown = this.countDown.bind(this)
    }

    secondsToTime = (secs) => {

        let days = Math.floor(secs / (3600*24));
        let hours = Math.floor(secs % (3600*24) / 3600);
        let minutes = Math.floor(secs % 3600 / 60);
        let seconds = Math.floor(secs % 60);
        
        let obj = {
            "d": days,
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    componentDidMount() {
        this._isMounted = true
        this.setOriginalTime()
        this.displayTimer()
        let timeLeftVar = this.secondsToTime(this.state.seconds)
        this.setState({ time: timeLeftVar })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    setOriginalTime = () => {
        // get end time and find seconds to go
        let t1 = new Date(this.props.endTime)
        let now = new Date().getTime()
        let diff = t1.getTime() - now
        
        if (this._isMounted) {     
            this.setState({ seconds: diff/1000 },
                          () => { this.startTimer()})
        }
    }

    startTimer = () => {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown = () => {
        let seconds = this.state.seconds - 1;
        if (this._isMounted) {
            this.setState({
                time: this.secondsToTime(seconds),
                seconds: seconds,
            })
        }
    
        // Check if we're at zero.
        if (seconds === 0) { 
            clearInterval(this.timer);
        }
    }

    displayTimer = () => {
        if (this.props.endTime && 
            new Date(this.props.endTime).getTime() < new Date().getTime()) {
           return(
                <Typography style={{color: "#c9171f"}} variant="h5">
                    <span>Auction finished!<br /></span>
                </Typography>
            )            
        }

        if (this.state.time.d > 1) {
           return( 
                <Typography variant="subtitle1">
                    <span>Time left: &nbsp;{this.state.time.d}d {this.state.time.h}h<br /></span>
                </Typography>
            )
        } else if (this.state.time.d === 1) {
            return(
                <Typography variant="subtitle1">
                    <span>Time left: &nbsp;{this.state.time.d}d {this.state.time.h}h {this.state.time.m}m<br /></span>
                </Typography>
            )
        } else if (this.state.time.d === 0) {
            return(
                <Typography variant="subtitle1">
                    <span>Time left: &nbsp;{this.state.time.h}h {this.state.time.m}m {this.state.time.s}s<br /></span>
                </Typography>
             )
        } else if (this.state.time.d === 0 && this.state.time.h === 0) {
            return(
                <Typography variant="subtitle1">
                    <span>Time left: &nbsp;{this.state.time.m}m {this.state.time.s}s<br /></span>
                </Typography>
             )            
        }
    }

    render() {
        return (
                <>
                {this.displayTimer()}
                </>
        );
    }
}

export default (Timer)
