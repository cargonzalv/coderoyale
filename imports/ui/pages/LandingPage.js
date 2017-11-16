import React from 'react'

import SpectateList from '../components/SpectateList'
import Login from  '../components/Login'

class LandingPage extends React.Component{
	render(){
		return(
			<div className='container'>
				<div className = 'row'>
					<SpectateList />
					<Login />
				</div>
			</div>
		)
	}
}

export default LandingPage