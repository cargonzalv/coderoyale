import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { createContainer } from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Popup from "react-popup";
import SweetAlert from "react-bootstrap-sweetalert";
///////////
// Header //
////////////

class Nav extends React.Component{

  render() {
    return (
      <header className="Header">
        <Logo/>
        <Navigation currentUser={this.props.currentUser}/>
      </header>
    );
  }
}
class Logo extends React.Component{
  render() {
    return (
      <div id="logo" className="Logo">
        <a href="/">
        	<title>Logo</title>
             <h1>CodeRoyale</h1>
        </a>
      </div>
    );
  }
}

// Navigation
class Navigation extends Component{
  constructor() {
    super();
    this.state = {
      showPopup: false
    };
    this.handlePopup = this.handlePopup.bind(this);
  }
   handlePopup(ev){
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
handleLogout(){
    Meteor.logout();
    FlowRouter.go("/");   
  }
  render() {
    let self = this;
    const user = this.props.currentUser
    console.log(user)
    return (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
      <div id="navigation" className="Navigation">
        <nav>
          <ul>
            <li className="listItems" onClick={()=>{FlowRouter.go("/leaderboard")}}>Leaderboard</li>
            {this.props.currentUser &&
          <li className="account pull-right">
            <div className="details">
              <p className="headline">Logged in as:</p>
              <p className="username text-primary"><a href={"/user/" + user._id}>{user.profile.login}</a></p> 
            </div>
            <div className="logout" onClick={this.handleLogout.bind(this)}>Log Out</div>
          </li>
        }
          </ul>
        </nav>
      </div>
      
    </MuiThemeProvider>
    );
  }
}

export default createContainer(() => {
  return {
    currentUser:Meteor.user(),
  };
}, Nav);