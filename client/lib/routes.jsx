import App from '../../imports/ui/App.jsx';
import {mount, withOptions} from 'react-mounter';
import CodingPage from '../../imports/ui/pages/CodingPage.jsx';

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