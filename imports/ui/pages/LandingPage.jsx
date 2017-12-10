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
						<Login />:<Join/>
					}
				</div>
			</div>
		)
	}
}

export default createContainer(() => {
  return {
    currentUser:Meteor.user(),
  };
}, LandingPage);