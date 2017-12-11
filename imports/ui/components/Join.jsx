import React, { Component } from "react";
import { Meteor } from 'meteor/meteor';
import SweetAlert from "react-bootstrap-sweetalert";
import { createContainer } from "meteor/react-meteor-data";
import { Challenges } from '../../api/challenges.js';
import { ActiveGame } from "../../api/active-games.js";


class Join extends Component{

	constructor(props){
		super(props);
		this.state = {
			alert:null
		};
		this.joinChallenge = this.joinChallenge.bind(this);
		this.showLoading = this.showLoading.bind(this);
		this.cancelJoin = this.cancelJoin.bind(this);
	}
		
	showLoading(ev){
       this.setState({alert: this.getLoading()});
    }

    cancelJoin(){
    	this.setState({alert:null});
    	Meteor.call("active_games.remove",this.state.id,(err,result)=>{
    		console.log(err);
    	})
    }

    getLoading(){
      return(
          <SweetAlert 
          		custom
          		title="Finding match"
          		timer= {2000}
          		showConfirm={false}
          		showCancelButton={true}
          		onCancel={this.cancelJoin} 
          		closeOnClickOutside={true}
				showCancel
				cancelBtnText="Cancel"
				cancelBtnBsStyle="default"
				customIcon={<div className="loader">
  				<span>{'{'} </span><span>{'}'}
  				</span>
				</div>}
				style={{top:'20%'}}
			>
            You're waiting to find a match!
          </SweetAlert>
        )
  }
	joinChallenge(){
		this.showLoading();
		Meteor.call("active_games.join",(err,result)=>{
			if(result){
				setTimeout(()=>{
          			FlowRouter.go("/game/"+result);
        		}, 2000); 
			}
			else{
				Meteor.call("active-games.create",(err, result2)=>{
					this.setState({id:result2});
					var res = false;
					var interval = window.setInterval(()=>{
						var game = ActiveGame.findOne({_id:result2});
							if(this.state.alert == null){
								clearInterval(interval);
							}
							if(game.started){
								clearInterval(interval);
								FlowRouter.go("/game/"+result2);
							}
						},5000);
						
					})
			}
		})
					
	}
	render(){
		return(
			<div className="col-md-6">
				<button disabled={!this.props.ready} className="btn btn-lg" onClick={this.joinChallenge}>
					Start Challenge
				</button>
				{this.state.alert}
			</div>
		)
	}
}
export default createContainer(() => {
  return {
    currentUser:Meteor.user(),
  };
}, Join);