import React from 'react'
import { createContainer } from "meteor/react-meteor-data";
import { ActiveGame } from "../../api/active-games.js";
import SpectateCoding from "../components/SpectateCoding"

class SpectateView extends React.Component{
	render(){
		return(
			<div className='container'>
				<div className = 'codingPage'>
					<div>
					{this.props.ready ? 
						<SpectateCoding game = {this.props.game}/>
						: ""
					}
					</div>
				</div>
			</div>
		)
	}
}

export default createContainer(({id}) => {
const handle = Meteor.subscribe('spectable_games');
  return {
  	ready:handle.ready(),
    game:ActiveGame.findOne({_id:id}),
    currentUser: Meteor.user()
  };
}, SpectateView);