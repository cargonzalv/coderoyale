import React, {Component} from "react";
import {Challenge} from '../../api/challenges'
import {createContainer} from "meteor/react-meteor-data";

class GameSummary extends Component {

	constructor(props){
		super(props);
	}

	handleClick(){
	}

	render(){

		const game = this.props.game
		const challenge = this.props.challenge
		const class_win = game.winner === this.props.user ? 'list-group-item-success':'list-group-item-danger'
		return (
			<a href= "#" onClick={this.handleClick.bind(this)} className={"list-group-item list-group-item-action flex-column align-items-start"+class_win}>
				<div className="d-flex w-100 justify-content-between">
					<h5 className="mb-1">{challenge.name}</h5>
				</div>
			</a>
		);
	}
}

export default createContainer(({game, user}) => { 
  const handle = Meteor.subscribe('challenges')
  return {
  	ready:handle.ready(),
  	game:game,
	challenge: Challenge.find({_id:game.challenge}).fetch(),
	user:user
  };
}, GameSummary);