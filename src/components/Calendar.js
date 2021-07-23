import './calendar.css';

import React from 'react';
import moment from 'moment';
import Day from './Day';

const generateKey = (pre, index) => {
    return pre + '_' + index;
}

class Calendar extends React.Component {


    state = {
        dateContext: moment(),
        today: moment(),
        showMonthPopup: false
    }

    weekdays = moment.weekdays(); // ["Sunday", "Monday", ...]
    weekdaysShort = moment.weekdaysShort(); // ["Sun", "Mon", ...]
    months = moment.months();

    getToday = () => {
        return this.state.today;
    }
    getYear = () => {
        return this.state.dateContext.format("Y");
    }
    getMonth = () => {
        return this.state.dateContext.format("MMMM");
    }
    getDaysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    }
    getCurrentDate = () => {
        return this.state.dateContext.get("date");
    }
    getCurrentDay = () => {
        return this.state.dateContext.format("D");
    }
    getFirstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf('month').format('d'); // Day of week 0-6
        return firstDay;
    }

    // Scroll month
    monthNav = () => {
        return (
            <div className="month-nav flex1">
                <span className="month-prev" onClick={() => { this.monthDown() }}>Prev</span>
                <span className="month-next" onClick={() => { this.monthUp() }}>Next</span>
            </div>
        )
    }

    monthDown = () => {
        let newMonth = moment(this.state.dateContext).subtract(1, "M");
        this.setState({ dateContext: newMonth });
    }

    monthUp = () => {
        let newMonth = moment(this.state.dateContext).add(1, "M");
        this.setState({ dateContext: newMonth });
    }

    render() {
        // Map weekdays to <th>
        let weekdaysHeader = this.weekdaysShort.map((day) => {
            return (
                <th key={generateKey("header", day)}>{day}</th>
            )
        });

        // Blanks prior to 1st of month
        let blankSlots = [];
        for (let i = 0; i < this.getFirstDayOfMonth(); i++) {
            blankSlots.push(<td key={generateKey("blank", i)} className="blank-slot">{""}</td>);
        }

        // Days of the month
        let daySlots = [];
        for (let d = 1; d <= this.getDaysInMonth(); d++) {
            let isSameMonth = (this.getToday().format("MMMM") === this.getMonth());
            let isToday = (isSameMonth && d === Number(this.getCurrentDay()) ? "day-slot today" : "day-slot");
            let newKey = generateKey(this.getMonth(), d);
            console.log(newKey);
            daySlots.push(
                <Day
                    key={newKey}
                    classname={isToday}
                    day={d}
                />

            );
        }

        // Fill Slots
        let totalSlots = [...blankSlots, ...daySlots]; // Spread operator
        let rows = [];
        let cells = [];

        totalSlots.forEach((slot, i) => {
            if (i % 7 !== 0) {
                cells.push(slot);
            } else {                // Go next week
                rows.push(cells);
                cells = [];
                cells.push(slot);
            }
            if (i === totalSlots.length - 1) { // Push last row
                rows.push(cells);
            }
        });

        let calendarDays = rows.map((row, i) => {
            return (
                <tr key={generateKey("calendarDays", i)}>
                    {row}
                </tr>
            );
        })

        return (
            <div className="calendar-container">
                <div className="calendar-nav">
                    <div className="flex1"></div>
                    <div className="show-date flex1">
                        <this.getMonth />
                        {" "}
                        <this.getYear />
                    </div>

                    <this.monthNav />
                </div>
                <table className="calendar">
                    <thead>
                        <tr className="calendar-header">
                            {weekdaysHeader}
                        </tr>
                    </thead>
                    <tbody>
                        {calendarDays}
                    </tbody>
                </table>

            </div>
        )
    }
}
export default Calendar;