import React from 'react'
import { createContainer } from "meteor/react-meteor-data";
import ReactDOM from "react-dom";


import SweetAlert from "react-bootstrap-sweetalert";


class AddChallenge extends React.Component{
	constructor(props) {
    super(props);
    this.state = {alert:null};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showSuccess = this.showSuccess.bind(this);

	}
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const name = ReactDOM.findDOMNode(this.refs.name).value.trim();
    const description = ReactDOM.findDOMNode(this.refs.desc).value.trim();
    const inputs = ReactDOM.findDOMNode(this.refs.inputs).value.split("\n");
    const outputs = ReactDOM.findDOMNode(this.refs.outputs).value.split("\n");
      Meteor.call("challenges.create", name, description, inputs, outputs,(err, result)=>{
        console.log(result);
        ReactDOM.findDOMNode(this.refs.name).value = "";
        ReactDOM.findDOMNode(this.refs.desc).value = "";
        ReactDOM.findDOMNode(this.refs.inputs).value = "";
        ReactDOM.findDOMNode(this.refs.outputs).value = "";
        if(!err)
        this.showSuccess();
      })

   
  }
  showSuccess(ev){
        this.setState({alert: this.getSuccess()});
    }
    getSuccess(){
      return(
          <SweetAlert success title="Good job!" timer= {1000} showConfirmButton={false} onConfirm={this.setState({alert:null})}>
            Your question has been submited!
          </SweetAlert>
        )
    }
	render(){
		return(
			<div className="container" id="add">
			<header>
            <h1 className="titleAsk">Add Challenge!</h1>
            <form id="saveQuestion"></form>
            <div className = "new-challenge">
              <div className="form-group">
              <label htmlFor="saveQuestion">Challenge Name</label>
              <input
                type="text"
                ref="name"
                placeholder="What do you wanna name your challenge?"
                className="form-control"
              />
              </div>
              <div className="form-group">
              <label htmlFor="desc">Description</label>
              <input
                type="text"
                ref="desc"
                placeholder="Add the explanation for your challenge"
                className="form-control"
              />
              </div>
                <div className="form-group">
              <label htmlFor="desc">Inputs (each in one line)</label>
              <textarea
                type="text"
                ref="inputs"
                placeholder="Add the explanation for your challenge"
                className="form-control"
              />
              </div>
              <div className="form-group">
              <label htmlFor="outputs">Outputs (each in one line)</label>
              <textarea
                type="text"
                ref="outputs"
                placeholder="Add the explanation for your challenge"
                className="form-control"
              />
              </div>
              <button type="button" className="btn btn-default submit" value="Submit" form="saveQuestion" onClick={this.handleSubmit.bind(this)}><i className="fa fa-paper-plane" aria-hidden="true"></i>Add Challenge!</button>
              </div>
          </header>  
        {this.state.alert}

          </div>   
		)
	}
}
export default AddChallenge;