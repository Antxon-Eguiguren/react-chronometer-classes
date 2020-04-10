import React, { Component } from 'react';
import { generate } from 'shortid';
import cx from 'classnames';
import './Chronometer.css';

class Chronometer extends Component {

    state = {
        hours: 0,
        minutes: 0,
        seconds: 0,
        miliseconds: 0,
        arrTimestamps: [],
        running: false,
        started: false
    }

    handleStartClick = () => {
        if (!this.state.running) {
            this.interval = setInterval(() => {
                this.tick();
            }, 100);

            this.setState({ running: true, started: true });
        }
    }

    tick() {
        let hours = this.state.hours;
        let minutes = this.state.minutes;
        let seconds = this.state.seconds;
        let miliseconds = this.state.miliseconds + 1;

        if (miliseconds === 10) {
            miliseconds = 0;
            seconds = seconds + 1;
        }

        if (seconds === 60) {
            seconds = 0;
            minutes = minutes + 1;
        }

        if (minutes === 60) {
            minutes = 0;
            hours = hours + 1;
        }

        this.updateTimer(hours, minutes, seconds, miliseconds);
    }

    updateTimer(hours, minutes, seconds, miliseconds) {
        this.setState({ hours, minutes, seconds, miliseconds });
    }

    handleStopClick = () => {
        if (this.state.running) {
            clearInterval(this.interval);
            this.setState({ running: false });
        }
    }

    handleTimestamp = () => {
        if (this.state.running) {
            const { hours, minutes, seconds, miliseconds, arrTimestamps } = this.state;
            const timestamp = { hours, minutes, seconds, miliseconds };
            const timestamps = arrTimestamps;
            timestamps.push(timestamp);
            this.setState({ arrTimestamps: timestamps });
        }
    }

    handleReset = () => {
        clearInterval(this.interval);
        this.setState({ running: false, started: false, arrTimestamps: [] });
        this.updateTimer(0, 0, 0, 0);
    }

    addZero(value) {
        return value < 10 ? `0${value}` : value;
    }

    render() {
        let { hours, minutes, seconds, miliseconds, running, arrTimestamps, started } = this.state;
        hours = this.addZero(hours);
        minutes = this.addZero(minutes);
        seconds = this.addZero(seconds);
        miliseconds = this.addZero(miliseconds);

        const startButton = cx({
            activeButton: !running,
            inactiveButton: running
        });

        const resetButton = cx({
            activeButton: true
        });

        const otherButtons = cx({
            activeButton: running,
            inactiveButton: !running
        });

        return (
            <>
                <div className="numbers">
                    <p>{hours} : {minutes} : {seconds} : {miliseconds}</p>
                </div>
                <div className="buttons">
                    <button className={startButton} onClick={this.handleStartClick}>{started ? 'GO ON' : 'START'}</button>
                    <button className={otherButtons} onClick={this.handleStopClick}>STOP</button>
                    <button className={otherButtons} onClick={this.handleTimestamp}>LAP</button>
                    {started && <button className={resetButton} onClick={this.handleReset}>RESET</button>}
                </div>
                <div className="timestamps">
                    <ul>
                        {arrTimestamps.map((timestamp, index) => (
                            <li key={generate()}>{`LAP ${index + 1}: ✅ 
                                ${this.addZero(timestamp.hours)} :
                                ${this.addZero(timestamp.minutes)} :
                                ${this.addZero(timestamp.seconds)} :
                                ${this.addZero(timestamp.miliseconds)}`}
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        )
    }
}

export default Chronometer;