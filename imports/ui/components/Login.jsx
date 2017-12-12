import React from 'react'
import { Meteor } from 'meteor/meteor';
import GitHub from 'github-api';


class Login extends React.Component{

	constructor(props){
		super(props);
		this.gh = new GitHub();
		this.loginGithub = this.loginGithub.bind(this);
	}

	loginGithub(){
		Meteor.loginWithGithub({
			requestPermissions: []
		}, (err) => {
		  if (err) {
	            //Brandon Bohorquez: Eliminar console.log para producción.
		    //console.log(err);
		  } else {
		    //console.log("Success on github");
		    //console.log(Meteor.user());
		  }
		});
	}

	render(){
		return(
			<div className="col-md-6">
				<p>
					If you don't have a github account yet create one
					<a href="https://github.com"> github.com</a>, otherwise
					login through the following button
					{/*Debido a que el color de fondo y el del link de github son similares éste último 
					no se alcanza a ver bien, revisar contraste.*/}
				</p>
				<button className="btn btn-lg" onClick={this.loginGithub}>
					Github
				</button>
			</div>
		)
	}
}

export default Login
