import React, { Component } from 'react';
import Chronometer from './components/Chronometer';
import './App.css';

class App extends Component {

    render() {
        return (
            <>
                <div className="header">
                    <h1>The<br></br>Rigorous<br></br>Chronometer<br></br>👁</h1>
                </div>
                <Chronometer />
            </>
        )
    }
}

export default App;