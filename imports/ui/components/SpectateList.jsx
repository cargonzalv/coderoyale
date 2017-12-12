import React from 'react'
import { ActiveGame } from '../../api/active-games.js';
import {createContainer} from "meteor/react-meteor-data";

class SpectateList extends React.Component{
	constructor(props){
		super(props)
		this.spectate = this.spectate.bind(this);
	}
	spectate(idGame){
		FlowRouter.go("/spectate/"+idGame);
	}
	showMatches(){
		if(this.props.games.length != 0){
		return (
			this.props.games.map((game, index) => {
				return (
					<li className="list-group-item d-flex justify-content-between align-items-center">
          			<h5 className="mb-1">{game._id}</h5>
						{/*Brandon Bohórquez: Mostrar el id de las partidas actuales no es muy conveniente
						                      puesto que éste carece de sentido para el usuario final 
								      (dado que es sólamente un string aleatorio), sería mejor
								      mostrar otro tipo de información asociada a la partida tal como
								      los jugadores que están involucrados.
								      
								      Esto afecta directamente la usabilidad puesto que el usuario no
								      sabe qué significado tiene dicho id, lo que puede llegar a ser 
								      confuso para él.
						*/}
          			<button className="btn" onClick={() => this.spectate(game._id)}>Spectate</button>
					</li>
					)
				})
			);
		}
	}

	render(){
		return(
			<div className="col-md-6">
				<h1>Current Matches</h1>
				<ul className="list-group">
				  {this.showMatches()}
				</ul>
			</div>
		)
	}
}

export default createContainer(() => {
	var handle;
    handle = Meteor.subscribe('spectable_games')

  return {
  ready:handle.ready(),
	games: ActiveGame.find({started:true}).fetch(),
	currentUser: Meteor.user(),
  };
}, SpectateList);
