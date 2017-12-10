import React, { Component } from "react";
import { Meteor } from 'meteor/meteor';
import SweetAlert from "react-bootstrap-sweetalert";


class Join extends Component{

	constructor(props){
		super(props);
		this.state = {
			alert:null
		};
		this.joinChallenge = this.joinChallenge.bind(this);
		this.showLoading = this.showLoading.bind(this);
		this.cancelJoin = this.cancelJoin.bind(this)
	}
		
	showLoading(ev){
       this.setState({alert: this.getLoading()});
    }

    cancelJoin(){
    	this.setState({alert:null})
    }

    getLoading(){
      return(
          <SweetAlert 
          		title="Finding match"
          		timer= {2000}
          		showConfirm={false}
          		showCancelButton={true}
          		onCancel={this.cancelJoin()} 
          		custom
				showCancel
				cancelBtnText="No"
				cancelBtnBsStyle="default"
				customIcon="loading.gif">
            You're waiting to find a match!
          </SweetAlert>
        )
  }
	joinChallenge(){
		this.showLoading();
		Meteor.call("active_games.join",(err,result)=>{
			if(result){
				setTimeout(()=>{
          			FlowRouter.go("/challenge/"+result);
        		}, 2000); 
			}
			else{
				Meteor.call("active-games.create",(err, result)=>{
        		{ /*
			        if(!err)
			        this.showSuccess();

			        setTimeout(()=>{
			          FlowRouter.go("/question/"+result);
			        }, 2000); 
			      	})

			   	*/}  
				})
			}
		})
					
	}
	render(){
		return(
			<div className="col-md-6">
				<button className="btn btn-lg" onClick={this.joinChallenge}>
					Start Challenge
				</button>
				{this.state.alert}
			</div>
		)
	}
}

export default Join