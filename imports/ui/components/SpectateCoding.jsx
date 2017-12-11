import React from 'react'
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';
import { createContainer } from "meteor/react-meteor-data";
import { Challenges } from "../../api/challenges.js";


import 'brace/theme/monokai';
import 'brace/mode/java';
import 'brace/snippets/java';

import 'brace/mode/javascript';
import 'brace/snippets/javascript';

import 'brace/mode/python';
import 'brace/snippets/python';

import 'brace/mode/golang';
import 'brace/snippets/golang';

import 'brace/mode/csharp';
import 'brace/snippets/csharp';

import 'brace/mode/ruby';
import 'brace/snippets/ruby';
/*eslint-disable no-alert, no-console */
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';


class SpectateCoding extends React.Component{

  setFontSize(e) {
    this.setState({
      fontSize: parseInt(e.target.value,10)
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      theme: 'monokai',
      fontSize: 14,
    };
  }
	render(){
		return(
      <div>
        {this.props.challenge &&
        <div>
          <div className = "row">
            <div className ="col-md-6">
              <h2>{this.props.challenge.name}</h2>
              <br/>
              <br/>
              <h4>{this.props.challenge.description}</h4>
              <br/>
            </div>
            <div className ="col-md-3">
            <strong> Input: </strong>
              {this.props.challenge.testInput.map((input)=>(
                <div>
                  <h5> {input}</h5>
                  <br/>
                </div>
                )
              )
            }
            </div>
            <div className="col-md-3">
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
          </div>
        <div className="row">
          <div className="col-md-5">
            <h2>{this.props.user1 ? this.props.user1.profile.login : null}</h2>
          </div>
          <div className="col-md-2">
           <h3>VS</h3>
          </div>
          <div className="col-md-5">
            <h2>{this.props.user2 ? this.props.user2.profile.login : null}</h2>
          </div>
        </div>
      </div>
      }
  			<div className="row">
                    <div className="col-md-6">
                   <AceEditor
                          theme={this.state.theme}
                          mode={this.props.game.lang1}
                          fontSize={this.state.fontSize}
                          name="blah2"
                          value={this.props.game.codeP1}
                          readOnly={true}
                    />
                    </div>
                  <div className="col-md-6">
                   <AceEditor
                          mode={this.props.game.lang2}
                          theme={this.state.theme}
                          fontSize={this.state.fontSize}
                          name="blah2"
                          value={this.props.game.codeP2}
                          readOnly={true}
                    />
                  </div>
              </div>
            </div>
            )
	}
}
export default createContainer(props => {
  const handle = Meteor.subscribe('challenges');
  const handle2 = Meteor.subscribe('userData');
  return {
    ready:handle.ready(),
    ready2:handle2.ready(),
    challenge:Challenges.findOne({_id:props.game.challenge}),
    user1: Meteor.users.findOne({_id:props.game.player1}),
    user2: Meteor.users.findOne({_id:props.game.player2}),
  };
}, SpectateCoding);