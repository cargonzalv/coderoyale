import React, {Component} from "react";
import {Challenge} from '../../api/challenges'
import {createContainer} from "meteor/react-meteor-data";

class LeaderboardEntry extends Component {

	constructor(props){
		super(props);
	}

	handleClick(){
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