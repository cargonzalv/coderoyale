import { Meteor } from 'meteor/meteor';
import React, {Component} from "react";
import LeaderboardEntry from "../components/LeaderboardEntry";
import {createContainer} from "meteor/react-meteor-data";


class Leaderboard extends Component {

	constructor(props){
		super(props);
	}

	renderLeaderboard(){
		if(this.props.users.length != 0)
			return (
				this.props.users.map((user, index) => {
					return <LeaderboardEntry user = {user} pos={index+1} key={index}/>
				})
			);
		else
			return(
				<div><h2> There aren't enough games to caculate the leaderboard :( </h2><br/>
				{this.props.currentUser && <div><p> Go play now to appear on the top spots </p></div>}


				</div> 
				)
	}

	render(){
		return (
			<div className="list-group">
				{this.renderLeaderboard()}
			</div>
		);
	}
}

export default Leaderboard;