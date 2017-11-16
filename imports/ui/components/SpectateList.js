import React from 'react'

class SpectateList extends React.Component{

	showMatches(){
		const matches = ['M1','M2']
		return matches.map((d)=>{
			return (
				<li className="list-group-item d-flex justify-content-between align-items-center">
          <h5 className="mb-1">{d}</h5>
          <button className="btn">Spectate</button>
				</li>
			)
		})
	}

	render(){
		return(
			<div className="col-md-6">
				<h1>Current Matches</h1>
				<ul className="list-group">
				  {this.showMatches()}
				</ul>
			</div>
		)
	}
}

export default SpectateList