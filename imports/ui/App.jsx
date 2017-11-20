import React, { Component } from 'react';
import LandingPage from './pages/LandingPage'
  
// App component - represents the whole app
export default class App extends Component {

 
  render() {
    return (
      <div className="container">
        <header>
        </header>
        <LandingPage />
      </div>
    );
  }
}