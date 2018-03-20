import React from 'react';
import PropTypes from 'prop-types';
import styles from './date-picker-module.css';
import { Modal, Button } from '../../components'

class DatePicker extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            date: new Date(),
            days: [],
            isLeapYear: false,
        }
        this.handleClick = this.handleClick.bind(this);
        this.renderDays = this.renderDays.bind(this);
        this.prevMonth = this.prevMonth.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.prevYear = this.prevYear.bind(this);
        this.nextYear = this.nextYear.bind(this);
        this.leapYear = this.leapYear.bind(this);
        this.selectDate = this.selectDate.bind(this);
        
    }
    
    handleClick(){
        this.props.onDatePick(this.state.date.toLocaleDateString(this.props.locale));
        this.setState({showModal: false});
    }

    daysInMonth (month, year) {
        // let currentMonth = this.state.date.getMonth();
        // if(this.state.isLeapYear && currentMonth === 1){
        //     return new Date(year, month, 0).getDate();
        // }
        return new Date(year, month, 0).getDate();
    }

    renderDays(){
        let countDaysInMonth = this.daysInMonth(this.state.date.getMonth() + 1 ,this.state.date.getFullYear());
        let days = [];
        for (var i = 1; i < countDaysInMonth + 1; i++) {
            days.push(<div className={`${styles.gridItem}`} key={i} value={i} onClick={(e) => this.selectDate(e)}>{i}</div>);
        }
        return days;
    }

    selectDate(e){
        let currentYear = this.state.date.getFullYear();
        let currentMonth = this.state.date.getMonth();
        let currentDay = e.target.innerHTML;
        this.setState({date: new Date(currentYear, currentMonth, currentDay)})
    }

    prevMonth(){
        let currentYear = this.state.date.getFullYear();
        let currentMonth = this.state.date.getMonth();
        this.leapYear(currentYear);
        this.setState({date: new Date(currentYear, currentMonth - 1)});
    }

    nextMonth(){
        let currentYear = this.state.date.getFullYear();
        let currentMonth = this.state.date.getMonth();
        this.leapYear(currentYear);
        this.setState({date: new Date(currentYear, currentMonth + 1)});
    }

    prevYear(){
        let currentYear = this.state.date.getFullYear();
        let currentMonth = this.state.date.getMonth();
        this.leapYear(currentYear - 1);
        this.setState({date: new Date(currentYear - 1, currentMonth)});
    }

    nextYear(){
        let currentYear = this.state.date.getFullYear();
        let currentMonth = this.state.date.getMonth();
        this.leapYear(currentYear + 1);
        this.setState({date: new Date(currentYear + 1, currentMonth)});
    }

    //https://stackoverflow.com/questions/16353211/check-if-year-is-leap-year-in-javascript
    leapYear(year){
        this.setState({isLeapYear: ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)})
    }

    render(){
        const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        return(
            <div>
                <Modal isOpen={this.state.showModal} onClose={() => this.setState({ showModal: false })}>
                    <Modal.Title>Date Picker</Modal.Title>
                    <Modal.Body>
                        Selected Date: {this.state.date.toLocaleDateString(this.props.locale)}
                        <div>
                            <div>
                                <div>
                                    <div>
                                        <i className="fa fa-caret-left" onClick={() => {this.prevYear()}}/>
                                        <div className={`${styles.monthTitle}`}>
                                            {this.state.date.getFullYear()}
                                        </div>
                                        <i className="fa fa-caret-right" onClick={() => {this.nextYear()}}/>
                                    </div>
                                    <div>
                                        <i className="fa fa-caret-left" onClick={() => {this.prevMonth()}}/>
                                        <div className={`${styles.monthTitle}`}>
                                            {MONTH_NAMES[this.state.date.getMonth()]}
                                        </div>
                                        <i className="fa fa-caret-right" onClick={() => {this.nextMonth()}}/>
                                    </div>
                                    <div className={`${styles.gridContainer}`}>
                                        {this.renderDays()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button type="success" onClick={() => this.handleClick()}>
                            Pick Date
                        </Button>
                    </Modal.Body>
                </Modal>
                
                <Button type="success" onClick={() => this.setState({ showModal: true })}>
                    Date Picker 
                </Button>
            </div>
        )
    }
};

DatePicker.propTypes = {
    onDatePick: PropTypes.func.isRequired,
    locale: PropTypes.string
};

DatePicker.defaultProps = {
    locale: 'is-IS'
};

export default DatePicker;
