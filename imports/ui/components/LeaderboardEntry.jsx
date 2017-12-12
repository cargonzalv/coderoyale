import React, {Component} from "react";
import {Challenge} from '../../api/challenges'
import {createContainer} from "meteor/react-meteor-data";

class LeaderboardEntry extends Component {

	constructor(props){
		super(props);
	}

	handleClick(){
		/*Brandon Bohorquez: Debería suceder algo cuando se le da click a algún usuario en el leaderBoard,
		por ejemplo podrían abrir el perfil del usuario al que se le dio click.
		Esto lo podrían hacer de forma similar a como lo implementaron en la clase ProfileSidebar al acceder al
		perfil del usuario vía props:
		
		const githubLink = this.props.user.profile.html_url
		*/
	}

	render(){
		
		const number = this.props.pos
		const login = this.props.user.profile.login
		const games = this.props.user.profile.totalChallenges
		return (
			<a href= "#" onClick={this.handleClick.bind(this)} className={"list-group-item list-group-item-action flex-column align-items-start"}>
				<div className="d-flex w-100 justify-content-between">
					<h5 className="mb-1">{number +'. ' + login}</h5>
				</div>
			</a>
		);
	}
}

export default LeaderboardEntry;
