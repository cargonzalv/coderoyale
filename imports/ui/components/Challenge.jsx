import React from 'react'
import { createContainer } from "meteor/react-meteor-data";
import { Challenges } from "../../api/challenges.js";

class Challenge extends React.Component{
	
	render(){
		return(
			<div>
			{this.props.challenge &&
			<div className="challenge">
				<h2>{this.props.challenge.name}</h2>
				<br/>
				<h4>{this.props.challenge.description}</h4>
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
			}
			</div>
		)
	}
}

export default createContainer(({challenge}) => {
	const handle = Meteor.subscribe('challenges');
  return {
  	ready:handle.ready(),
    challenge:Challenges.findOne({_id:challenge}),
    currentUser: Meteor.user()
  };
}, Challenge);