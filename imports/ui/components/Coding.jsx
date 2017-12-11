import React from 'react'
import { render } from 'react-dom';
import brace from 'brace';
import AceEditor from 'react-ace';

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

const defaultValue =
`function onLoad(editor) {
  console.log(\"i\'ve loaded\");
}`;


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

  constructor(props) {
    super(props);
    this.state = {
      value: defaultValue,
      theme: 'monokai',
      mode: 'javascript',
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: false,
      fontSize: 14,
      showGutter: true,
      showPrintMargin: true,
      highlightActiveLine: true,
      enableSnippets: false,
      showLineNumbers: true,
    };
    this.setTheme = this.setTheme.bind(this);
    this.setMode = this.setMode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.setFontSize = this.setFontSize.bind(this);
    this.setBoolean = this.setBoolean.bind(this);
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
                            <input type="checkbox" checked={this.state.highlightActiveLine} onChange={(e) => this.setBoolean('highlightActiveLine', e.target.checked)} />
                             Highlight Active Line
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
                  </div>
            </div>
            )
	}
}

export default Coding