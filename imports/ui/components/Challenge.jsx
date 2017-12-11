import React from 'react'
import { createContainer } from "meteor/react-meteor-data";
import { Challenges } from "../../api/challenges.js";

class Challenge extends React.Component{
	
	render(){
		return(
			<div className="challenge">
				<h2>{this.props.challenge.title}</h2>
				<br/>
				<h4>{this.props.challenge.descripcion}</h4>
				 <strong> Input: </strong>
				<br/>
				 {this.props.challenge.testInput.map((input)=>(
				 		<div>
							<h5> {input}</h5>
				 			<br/>
				 		</div>
				 		)
				 	)
				}
				 <strong> Output: </strong>
				 <br/>
				 {this.props.challenge.testOutput.map((output)=>(
				 	<div>
						<h5> {output}</h5>
					 	<br/>
				 	</div>
				 	)
				 )
				}
			</div>
		)
	}
}

export default createContainer(props => {
	console.log(props);
  return {
    challenge:Challenges.findOne({_id:props.game.challenge}),
    currentUser: Meteor.user()
  };
}, Challenge);