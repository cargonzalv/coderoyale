import React from 'react'
import { createContainer } from "meteor/react-meteor-data";
import { ActiveGame } from "../api/active-games.js";

import Challenge from "../components/Challenge"
import Coding from "../components/Coding"

class CodingPage extends React.Component{
	render(){
		return(
			<div className='container'>
				<div className = 'row codingPage'>
					<div className = "col-md-6">
						<Challenge/>
					</div>
					<div className = "col-md-6 coding">
						<Coding/>
						<div className='set green'>
							<a className='btn pri ico'>Submit!</a>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default createContainer(({id}) => {
  Meteor.subscribe('my_current_game',id);
  console.log(id);
  return {
    question: ActiveGame.findOne({}),
    currentUser: Meteor.user()
  };
}, CodingPage);