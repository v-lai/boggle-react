import React, { Component } from 'react';
import GameBoard from './GameBoard';
import logo from './assets/logo.png';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <img className='logo' src={logo} alt="boggle logo"></img>
        <GameBoard />
      </div>
    );
  }
}
