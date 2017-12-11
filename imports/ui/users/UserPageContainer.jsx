import { Meteor } from 'meteor/meteor';
import React, {Component} from "react";
import {createContainer} from "meteor/react-meteor-data";

import "./ProfileSidebar.css"
import ProfileSidebar from "./ProfileSidebar.jsx";
import GamesList from "./ProfileGamesList.jsx"
import {HistoryGame} from '../../api/history-games';


class ProfilePage extends Component{
	constructor(props){
		super(props)
		console.log(props)
	}
	render(){
		return(
			<div className="profile-container">
				<div className="container-fluid">
					<div className="row">
						<div className="col-sm-4">
							<ProfileSidebar user={this.props.user} games = {this.props.games}/>
						</div>
						<div className="col-sm-8">
							<GamesList user={this.props.user} currentUser = {this.props.currentUser}
												 games = {this.props.games}/> 
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default createContainer(({id}) => { 
  const handle = Meteor.subscribe('game_history', id)
  return {
  	ready:handle.ready(),
	games: HistoryGame.find({}).fetch(),
	user: Meteor.users.findOne(id),
  };
}, ProfilePage);