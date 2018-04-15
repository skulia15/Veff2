import React from 'react';
import PropTypes from 'prop-types';
import styles from './time-picker-module.css';
import { Modal, Button } from '../../components'

class TimePicker extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            hours: null,
            minutes: null,
            period: 'AM',
            time: new Date()
        }
        this.incrementHour = this.incrementHour.bind(this);
        this.decrementHour = this.decrementHour.bind(this);
        this.incrementMinute = this.incrementMinute.bind(this);
        this.decrementMinute = this.decrementMinute.bind(this);
        this.changePeriod = this.changePeriod.bind(this);
        this.render12hrs = this.render12hrs.bind(this);
        this.handleClick = this.handleClick.bind(this);
        
    }

    componentWillMount(){
        this.setState({hours: this.state.time.getHours()});
        this.setState({minutes: this.state.time.getMinutes()});
        if(this.props.format === 12 && this.state.time.getHours() > 12){
            this.setState({hours: this.state.time.getHours() - 12});
        }
    }

    render12hrs(){
        if(this.props.format === 12){
            return(
                <div className={`${styles.timefield}`}>
                    <i className="fa fa-angle-up picker" style={{display: "block"}} onClick={() => {this.changePeriod()}}></i>
                        <div>{this.state.period}</div>
                    <i className="fa fa-angle-down picker" style={{display: "block"}} onClick={() => {this.changePeriod()}}></i>
                </div>
            );
        }
    }

    incrementHour(){
        if(this.state.hours === this.props.format){
            this.setState({hours: 0});
        }
        else{
            this.setState({hours: this.state.hours + 1});
        }
        this.setState({time: this.state.time.setHours(this.state.hours - 1)})
        this.setState({time: new Date(this.state.time)});
    }

    decrementHour(){
        if(this.state.hours === 0){
            this.setState({hours: this.props.format});
        }
        else{
            this.setState({hours: this.state.hours - 1});
        }
        this.setState({time: this.state.time.setHours(this.state.hours - 1)})
        this.setState({time: new Date(this.state.time)});
        
    }

    incrementMinute(){
        if(this.state.minutes === 59){
            this.setState({minutes: 0});
        }
        else{
            this.setState({minutes: this.state.minutes + 1});
        }
        this.setState({time: this.state.time.setMinutes(this.state.minutes - 1)})
        this.setState({time: new Date(this.state.time)});
        
    }

    decrementMinute(){
        if(this.state.minutes === 0){
            this.setState({minutes: 60});
        }
        else{
            this.setState({minutes: this.state.minutes - 1});
        }
        this.setState({time: this.state.time.setMinutes(this.state.minutes - 1)})
        this.setState({time: new Date(this.state.time)});
    }

    changePeriod(){
        if(this.state.period === 'AM'){
            this.setState({period: 'PM'});
        }
        else{
            this.setState({period: 'AM'});
        }
    }

    handleClick(){
        if(this.props.period === 'PM'){
            this.setState({hours: this.state.hours + 12})
            this.setState({time: new Date(this.state.time)});
        }
        this.props.onTimePick(this.state.time.toLocaleTimeString());
        this.setState({showModal: false});
    }

    render(){
        return(
            <div>
                <Modal isOpen={this.state.showModal} onClose={() => this.setState({ showModal: false })}>
                    <Modal.Title>Time Picker</Modal.Title>
                    <Modal.Body>
                        <div className={`${styles.timePicker}`}>
                            <div className={`${styles.fields}`}>
                                <div>
                                    <div className={`${styles.timefield}`}>
                                        <i className="fa fa-angle-up" style={{display: "block"}} onClick={() => {this.incrementHour()}}></i>
                                        {this.state.hours} 
                                        <i className="fa fa-angle-down picker" style={{display: "block"}} onClick={() => {this.decrementHour()}}></i>
                                    </div>
                                </div>
                                <div>
                                    <div className={`${styles.timefield}`}>
                                        <i className="fa fa-angle-up" style={{display: "block"}} onClick={() => {this.incrementMinute()}}></i>
                                         : {this.state.minutes}
                                        <i className="fa fa-angle-down" style={{display: "block"}} onClick={() => {this.decrementMinute()}}></i>
                                    </div>
                                </div>
                                <div>
                                    {this.render12hrs()}
                                </div>
                            </div>
                        </div>
                        <Button type="success" onClick={() => this.handleClick()}>
                            Pick Time 
                        </Button>
                    </Modal.Body>

                </Modal>
                
                <Button type="success" onClick={() => this.setState({ showModal: true })}>
                    Time Picker 
                </Button>
            </div>
        )
    }
};

TimePicker.propTypes = {
    onTimePick: PropTypes.func.isRequired,
    format: PropTypes.oneOf([24, 12])
};

TimePicker.defaultProps = {
    format: 24
};

export default TimePicker;
