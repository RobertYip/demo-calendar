import './calendar.css';
import React from 'react';

class Day extends React.Component {

    state = {
        enabled: false
    }

    selectButton = () => {
        return (
            <button className="select-button" onClick={() => { this.selectButtonClick() }}>Select</button>
        );
    }

    selectButtonClick = () => {
        this.setState({ enabled: !this.state.enabled });
    }

    dropdownStart = () => {
        return (
            <select>
                <option value="0">--</option>
                <option value="600">6:00 AM</option>
                <option value="630">6:30 AM</option>
                <option value="700">7:00 AM</option>
                <option value="730">7:30 AM</option>
                <option value="800">8:00 AM</option>
                <option value="830">8:30 AM</option>
                <option value="900">9:00 AM</option>
            </select>
        );
    }

    dropdownEnd = () => {
        return (
            <select>
                <option value="0">--</option>
                <option value="100">1:00 PM</option>
                <option value="130">1:30 PM</option>
                <option value="200">2:00 PM</option>
                <option value="230">2:30 PM</option>
                <option value="300">3:00 PM</option>
                <option value="330">3:30 PM</option>
                <option value="400">4:00 PM</option>
                <option value="430">4:30 PM</option>
                <option value="500">5:00 PM</option>
                <option value="500">5:30 PM</option>
                <option value="600">6:00 PM</option>
            </select>
        );
    }

    dropdown = () => {
        if (this.state.enabled === true) {
            return (
                <div>
                    <div className="dropdown-container"><this.dropdownStart /></div>
                    <div className="dropdown-container"><this.dropdownEnd /></div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="dropdown-container disabled"><this.dropdownStart /></div>
                    <div className="dropdown-container disabled"><this.dropdownEnd /></div>
                </div>
            );
        }

    }

    render() {

        return (
            <td key={this.props.key} className={this.props.classname}>
                <span className="calendar-day">{this.props.day}</span>
                <div className="select-button-container">
                    <this.selectButton />
                </div>
                <this.dropdown />
            </td>
        );
    }

}

export default Day;