import React from 'react'
import { createContainer } from "meteor/react-meteor-data";
import { ActiveGame } from "../../api/active-games.js";
import { HistoryGame } from "../../api/history-games.js";

import Challenge from "../components/Challenge"
import Coding from "../components/Coding"

class CodingPage extends React.Component{
	render(){
		return(
			<div className='container'>
				<div className = 'row codingPage'>
					<div className = "col-md-4">
					{this.props.ready ?
						<Challenge challenge = {this.props.game.challenge} currentUser={this.props.currentUser}/>
						: ""
					}
					</div>
					<div className = "col-md-8 coding">
					{this.props.ready ? 
						<Coding game = {this.props.game} history={this.props.history} currentUser={this.props.currentUser}/>
						: ""
					}
					</div>
				</div>
			</div>
		)
	}
}

export default createContainer(({id}) => {
	console.log(id);
const handle = Meteor.subscribe('my_current_games');
Meteor.subscribe("my_game_history");
  return {
  	ready:handle.ready(),
    game:ActiveGame.findOne({_id:id}),
    history:HistoryGame.findOne({game:id}),
    currentUser: Meteor.user()
  };
}, CodingPage);