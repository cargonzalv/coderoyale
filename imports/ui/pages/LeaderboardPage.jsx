import { Meteor } from 'meteor/meteor';
import React, {Component} from "react";
import {createContainer} from "meteor/react-meteor-data";
import '../users/ProfileSidebar.css'

import Leaderboard from "../components/Leaderboard.jsx"


class LeaderboardPage extends Component{
	constructor(props){
		super(props)
		console.log(props)
	}
	render(){
		return(
			<div className="profile-container">
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-12">
							<Leaderboard users={this.props.users} currentUser = {this.props.currentUser}/> 
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default createContainer(() => { 
  const handle = Meteor.subscribe('history_games.leaderboard')
  return {
  	ready:handle.ready(),
	users: Meteor.users.find({}).fetch(),
	currentUser: Meteor.user(),
  };
}, LeaderboardPage);