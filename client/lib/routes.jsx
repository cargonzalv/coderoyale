import App from '../../imports/ui/App.jsx';

FlowRouter.route("/",{
	action: function(params, queryParams) {
		mount(App)
	}
})

FlowRouter.route("/local",{
})