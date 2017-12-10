import { Meteor } from 'meteor/meteor';
import {Challenge} from '../imports/api/challenges.js';
import { ActiveGame } from '../imports/api/active-games.js';
import { HistoryGame} from '../imports/api/history-games.js';
Meteor.startup(() => {
  // code to run on server at startup
  Inject.rawModHtml("addLanguage", function(html) {
    return html.replace(/<html>/, '<!-- HTML 5 -->\n<html lang="en">');
  });

  ServiceConfiguration.configurations.upsert({
	  service: "github"
	}, {
	  $set: {
	    clientId: Meteor.settings.github.clientId,
	    loginStyle: "popup",
	    secret: Meteor.settings.github.secret
	  }
	});
  
});