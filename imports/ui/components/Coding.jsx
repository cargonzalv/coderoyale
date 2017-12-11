import React from 'react'
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';
import SweetAlert from "react-bootstrap-sweetalert";
import { HistoryGame } from "../../api/history-games.js";

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


const languages = [
  'javascript',
  'java',
  'python',
  'ruby',
  'golang',
  'csharp',
]

const themes = [
  'monokai',
  'github',
  'tomorrow',
  'kuroir',
  'twilight',
  'xcode',
  'textmate',
  'solarized_dark',
  'solarized_light',
  'terminal',
]
import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/tomorrow';
import 'brace/theme/kuroir';
import 'brace/theme/twilight';
import 'brace/theme/xcode';
import 'brace/theme/textmate';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';
import 'brace/theme/terminal';


/*eslint-disable no-alert, no-console */
import 'brace/ext/language_tools';
import 'brace/ext/searchbox';
const defaultValueJavascript =
`process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

function solveMeFirst(input) {
  // Hint: Type return a+b below   
  
}

function main() {
    // write your code here.
    // call readLine() to read a line.
    // use console.log() to write to stdout

    var input = parseInt(readLine());

    var output = solveMeFirst(input);
    console.log(output);
}
`;
const defaultValueJava =
`import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {


    static int solveMeFirst(int a) {
      
   }

   
 public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int a;
        a = in.nextInt();
        int sum;
        sum = solveMeFirst(a);
        System.out.println(sum);
   }
}

`;
const defaultValue =
`def solveMeFirst(a):
  


num1 = input()
res = solveMeFirst(num1)
print res
`;
const defaultValueRuby =
`
def solveMeFirst (a)
  
end
val1 = gets.to_i
val2 = gets.to_i
res = solveMeFirst(val1)
print (res)
`;
const defaultValueGo =
`
package main
import "fmt"

func solveMeFirst(a uint32) uint32{

}

func main() {
    var a, res uint32
    fmt.Scanf("%v\n%v", &a)
    res = solveMeFirst(a)
    fmt.Println(res)
}

`;
const defaultValueCSharp =
`
using System;
using System.Collections.Generic;
using System.IO;
class Solution {
    static int solveMeFirst(int a) { 
      
      
    }
    static void Main(String[] args) {
        int val1 = Convert.ToInt32(Console.ReadLine());
        int res = solveMeFirst(val1);
        Console.WriteLine(res);
    }
}      

`;


class Coding extends React.Component{
onLoad() {
    console.log('i\'ve loaded');
  }

  onChange(newValue) {
    console.log('change', newValue);
    this.setState({
      value: newValue
      })
    Meteor.call("active_games.update",this.props.game._id,newValue,(err,result)=>{

    })
  }
onSelectionChange(newValue, event) {
    console.log('select-change', newValue);
    console.log('select-change-event', event);
  }

  onCursorChange(newValue, event) {
    console.log('cursor-change', newValue);
    console.log('cursor-change-event', event);
  }

  onValidate(annotations) {
    console.log('onValidate', annotations);
  }

  setTheme(e) {
    this.setState({
      theme: e.target.value
    })
  }
  setMode(e) {
    this.setState({
      mode: e.target.value
    })
    var lang = e.target.value;
    if(lang  == "javascript"){
      this.setState({
      value: defaultValueJavascript
      })
    }
    else if (lang == "java"){
      this.setState({
      value: defaultValueJava
      })
    }
    else if (lang == "python"){
      this.setState({
      value: defaultValue
      })
    }
    else if (lang == "ruby"){
      this.setState({
      value: defaultValueRuby
      })
    }
    else if (lang == "golang"){
      this.setState({
      value: defaultValueGo
      })
    }
    else if (lang == "csharp"){
      this.setState({
      value: defaultValueCSharp
      })
    }
    this.setState({
      value: newValue
      })
    Meteor.call("active_games.updateLang",this.props.game._id,e.target.value,(err,result)=>{
    console.log(err);
  })
  }
  setBoolean(name, value) {
    this.setState({
      [name]: value
    })
  }
  setFontSize(e) {
    this.setState({
      fontSize: parseInt(e.target.value,10)
    })
  }
  showSuccess(ev){
        this.setState({alert: this.getSuccess()});
    }
    getSuccess(){
      return(
          <SweetAlert success title="Congratulations!" timer= {1000} showConfirmButton={false} onConfirm={()=>this.handleConfirm()}>
            All the test cases have passed. You won!
          </SweetAlert>
        )
    }
    showError(error,ev){
        this.setState({alert: this.getError(error)});
    }
    getError(error){
      return(
          <SweetAlert danger title="Ooops!" timer= {1000} showConfirmButton={false} onConfirm={()=>this.setState({alert:null})}>
            {error}
          </SweetAlert>
        )
    }
  handleSubmit(){
    var lang = this.state.mode;
    if(lang  == "javascript"){
      lang = 20;
    }
    else if (lang == "java"){
      lang = 3;
    }
    else if (lang == "python"){
      lang = 5;
    }
    else if (lang == "ruby"){
      lang = 8;
    }
    else if (lang == "golang"){
      lang = 21;
    }
    else if (lang == "csharp"){
      lang = 9;
    }
    Meteor.call("active_games.submit",this.props.game._id,lang,(err,result)=>{
      if(!err){
        console.log(result)
        if(result.error==""){
          if(result.success){
            this.showSuccess();
          }
          else{
            var mistake = "The algorithm has passed "+result.passed + " of the "+result.totalTests+" test cases."
            this.showError(mistake)
          }
        }
        else{
          this.showError(result.error)
        }
      }
    })
  }
  handleConfirm(){
    this.setState({alert:null});
    FlowRouter.go("/leaderboard")
  }
  handleLoss(){
    this.setState({alert: this.getLoss()});
  }
    getLoss(){
      return(
          <SweetAlert 
          custom
          title="You lost" 
          timer= {1000} 
          showConfirmButton={false} 
          onConfirm={this.handleConfirm}
          customIcon={<div className="sad">
          <span>{':'} </span><span>{'('}
          </span>
          </div>}
        >
          </SweetAlert>
        )
    }
  constructor(props) {
    super(props);
    this.state = {
      value: defaultValue,
      theme: 'monokai',
      mode: 'python',
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: false,
      fontSize: 14,
      showGutter: true,
      showPrintMargin: true,
      highlightActiveLine: true,
      enableSnippets: false,
      showLineNumbers: true,
    };
    Meteor.call("active_games.update",this.props.game._id,defaultValue,(err,result)=>{
    });
    this.setTheme = this.setTheme.bind(this);
    this.setMode = this.setMode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setFontSize = this.setFontSize.bind(this);
    this.setBoolean = this.setBoolean.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.handleConfirm=this.handleConfirm.bind(this);
    this.handleLoss=this.handleLoss.bind(this);
  }
	render(){
		return(
			<div className="row">
                  <div className="col-md-4">
                       <div className="field">
                         <label>
                           Programming Language:
                         </label>
                           <p className="control">
                             <span className="select">
                               <select name="mode" onChange={this.setMode} value={this.state.mode}>
                                 {languages.map((lang) => <option  key={lang} value={lang}>{lang}</option>)}
                               </select>
                              </span>
                           </p>
                       </div>

                       <div className="field">
                         <label>
                           Theme:
                         </label>
                           <p className="control">
                             <span  className="select">
                               <select name="Theme" onChange={this.setTheme} value={this.state.theme}>
                                {themes.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
                               </select></span>
                           </p>
                       </div>

                       <div className="field">
                         <label>
                           Font Size:
                         </label>
                           <p className="control">
                             <span  className="select">
                               <select name="Font Size" onChange={this.setFontSize} value={this.state.fontSize}>
                                {[14,16,18,20,24,28,32,40].map((lang) => <option  key={lang} value={lang}>{lang}</option>)}
                               </select></span>
                           </p>
                       </div>
                      <div className="field">
                        <p className="control">
                          <label className="checkbox">
                            <input type="checkbox" checked={this.state.enableBasicAutocompletion} onChange={(e) => this.setBoolean('enableBasicAutocompletion', e.target.checked)} />
                             Enable Basic Autocomplete
                          </label>
                        </p>
                      </div>
                       <div className="field">
                        <p className="control">
                          <label className="checkbox">
                            <input type="checkbox" checked={this.state.enableLiveAutocompletion} onChange={(e) => this.setBoolean('enableLiveAutocompletion', e.target.checked)} />
                             Enable Live Autocomplete
                          </label>
                        </p>
                      </div>
                       <div className="field">
                        <p className="control">
                          <label className="checkbox">
                            <input type="checkbox" checked={this.state.showGutter} onChange={(e) => this.setBoolean('showGutter', e.target.checked)} />
                             Show Gutter
                          </label>
                        </p>
                      </div>
                       <div className="field">
                        <p className="control">
                          <label className="checkbox">
                            <input type="checkbox" checked={this.state.showPrintMargin} onChange={(e) => this.setBoolean('showPrintMargin', e.target.checked)} />
                             Show Print Margin
                          </label>
                        </p>
                      </div>
                      <div className="field">
                        <p className="control">
                          <label className="checkbox">
                            <input type="checkbox" checked={this.state.enableSnippets} onChange={(e) => this.setBoolean('enableSnippets', e.target.checked)} />
                             Enable Snippets
                          </label>
                        </p>
                      </div>
                      <div className="field">
                        <p className="control">
                          <label className="checkbox">
                            <input type="checkbox" checked={this.state.showLineNumbers} onChange={(e) => this.setBoolean('showLineNumbers', e.target.checked)} />
                             Show Line Numbers
                          </label>
                        </p>
                      </div>
                  </div>
                  <div className="col-md-8">
			<h2>Start coding!</h2>
			           <AceEditor
                        mode={this.state.mode}
                        theme={this.state.theme}
                        name="blah2"
                        onLoad={this.onLoad}
                        onChange={this.onChange}
                        onValidate={this.onValidate}
                        value={this.state.value}
                        fontSize={this.state.fontSize}
                        showPrintMargin={this.state.showPrintMargin}
                        showGutter={this.state.showGutter}
                        highlightActiveLine={this.state.highlightActiveLine}
                        setOptions={{
                        enableBasicAutocompletion: this.state.enableBasicAutocompletion,
                        enableLiveAutocompletion: this.state.enableLiveAutocompletion,
                        enableSnippets: this.state.enableSnippets,
                        showLineNumbers: this.state.showLineNumbers,
                        tabSize: 2,
                  }}/>
                  <div className='set green'>
                    <button className='btn pri ico' onClick={this.handleSubmit}>Submit!</button>
                  </div>
                  </div>
                  {this.state.alert}
                  {this.props.history && this.props.history.loser == this.props.currentUser._id && this.state.alert == null && this.handleLoss()}
            </div>

            )
	}
}

export default Coding

