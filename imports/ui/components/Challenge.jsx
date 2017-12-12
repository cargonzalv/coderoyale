import React from 'react'
import { createContainer } from "meteor/react-meteor-data";
import { Challenges } from "../../api/challenges.js";

class Challenge extends React.Component{
	
	render(){
		return(
			<div className="row">
			{this.props.challenge &&
			<div className=" challenge">
				<h2>{this.props.challenge.name}</h2>
				<br/>
				<h4>{this.props.challenge.description}</h4>
				{/* Brandon Bohórquez: Sería bueno incorporar un reloj para mostrar el tiempo que lleva la partida. */}
				<div className="col-md-6">
				 <strong>  Input: </strong>
				<br/>
				 {this.props.challenge.testInput.map((input)=>(
				 		<div>
							<h5> {input}</h5>
				 			<br/>
				 		</div>
				 		)
				 	)
				}
				</div>
				<div className="col-md-6">
				 <strong>  Output: </strong>
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
