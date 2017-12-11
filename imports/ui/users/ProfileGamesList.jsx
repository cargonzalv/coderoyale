import { Meteor } from 'meteor/meteor';
import React, {Component} from "react";
import GameSummary from "../components/GameSummary";
import {createContainer} from "meteor/react-meteor-data";


class GamesList extends Component {

	constructor(props){
		super(props);
	}

	renderGames(){
		if(this.props.games.length != 0)
			return (
				this.props.games.map((game, index) => {
					return <GameSummary game={game} user = {this.props.user} key={index}/>
				})
			);
		else
			return(
				<div><h2> You haven't participated in any games :( </h2><br/>
				{this.props.currentUser && <div><p> Go play now to build your history </p></div>}


				</div> 
				)
	}

	render(){
		return (
			<div className="list-group">
				{this.renderGames()}
			</div>
		);
	}
}

export default GamesList;