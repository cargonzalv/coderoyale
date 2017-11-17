import React from 'react'
import CodeEditor from "react-code-editor"
class Coding extends React.Component{

	render(){
		const code = `
import React from 'react';
export default () => <h1>abc</h1>;
`
		return(
			<div>
				<h2>Start coding!</h2>
				<CodeEditor
            	// workerUrl={"/example/hljs.worker.js.file"}
            	workerUrl={null}
            	mountStyle={true}
            	language="jsx"
            	className="language-jsx"
            	code={code + '\n // write your code here'}
            	ignoreTabKey
            	onChange={data => {
            	}}
            	/>
            </div>
            )
	}
}

export default Coding