import App from '../../imports/ui/App.jsx';
import {mount, withOptions} from 'react-mounter';
import CodingPage from '../../imports/ui/pages/CodingPage.jsx';
import ProfilePage from '../../imports/ui/users/UserPageContainer'
import AddChallenge from '../../imports/ui/pages/AddChallenge';
import SpectateView from '../../imports/ui/pages/SpectateView';
FlowRouter.route("/",{
	action: function(params, queryParams) {
		mount(App)
	}
})

FlowRouter.route("/game/:id",{
	action: function(params, queryParams) {
		mount(CodingPage, {id:params.id})
	}
})

FlowRouter.route("/user/:id",{
	action: function(params, queryParams) {
		mount(ProfilePage, {id:params.id})
	}
})

FlowRouter.route("/spectate/:id",{
	action: function(params, queryParams) {
		mount(SpectateView, {id:params.id})
	}
})

FlowRouter.route("/add",{
	action: function(params, queryParams) {
		mount(AddChallenge, {id:params.id})
	}
})
