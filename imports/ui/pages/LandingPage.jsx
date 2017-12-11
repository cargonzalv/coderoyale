import React from 'react'
import { Meteor } from 'meteor/meteor';
import { createContainer } from "meteor/react-meteor-data";

import SpectateList from '../components/SpectateList'
import Login from  '../components/Login'
import Join from  '../components/Join'

class LandingPage extends React.Component{
	render(){
		return(
			<div className='container'>
				<div className = 'row'>
					<SpectateList />
					{!this.props.currentUser ? 
						<Login />:<Join ready={this.props.ready}/>
					}
				</div>
			</div>
		)
	}
}

export default createContainer(() => {
	const handle = Meteor.subscribe('challenges');
	const handle2 = Meteor.subscribe('queuedGames');
  return {
  	ready:handle.ready(),
  	ready2:handle2.ready(),
    currentUser:Meteor.user(),
  };
}, LandingPage);