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
					/*Brandon Bohórquez: Los usuarios en el Leaderboard salen en distintas posiciones
					                     al iniciar sesión con cuentas diferentes, es decir que el Leaderboard
						             no se muestra igual ante todos los usuarios. 
					                     Se debe revisar si el ordenamiento se está realizando correctamente
			                                     puesto que el ordenamiento de usuarios en el Leaderboard no debería cambiar
					  		     y debería ser igual para cualquier usuario loggeado. */
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
