import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import Dragndrop from './components/Dragndrop'
import Creatingtodo from './components/Creatingtodo'
import Done from './components/Done'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        </p>

        {/* <Dragndrop/> */}
        <div className='row'>

          <div className='col-sm-3'>
            <Creatingtodo />
          </div>

          <div className='col-sm-3'>
            <Done />
          </div>

          <div className='col-sm-3'>
            {/* <Creatingtodo /> */}
          </div>

          <div className='col-sm-3'>
            {/* <Creatingtodo /> */}
          </div>

        </div>







      </div>
    );
  }
}

export default App;
