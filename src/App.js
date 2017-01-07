import React, { Component } from 'react';
import World from './components/World';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <World size={ 40 } period={ 100 } rand={ 5 } />
      </div>
    );
  }
}

export default App;
