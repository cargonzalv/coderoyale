import { Meteor } from 'meteor/meteor';
import {Challenges} from '../imports/api/challenges.js';
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

  Accounts.onCreateUser(function (options, user) {
  	var accessToken = user.services.github.accessToken,
  	result,
  	profile;

  	result = Meteor.http.get("https://api.github.com/user", {
  		params: {
  			access_token: accessToken
  		},
  		headers: {
  			'User-Agent':'JavierTrc'
  		}
  	});

  	if (result.error)
  		throw result.error;

  	profile = _.pick(result.data,
  		"login",
  		"name",
  		"avatar_url",
  		"url",
  		"company",
  		"blog",
  		"location",
  		"email",
  		"bio",
  		"html_url");

  	user.profile = profile;
    user.profile.score=0;
  	return user;
  });

  Meteor.publish("userData", function () {
    return Meteor.users.find({},
        {fields: {profile:1}});
});
  Meteor.methods({
    'user.update'(newUserData){
      Meteor.users.update(this.userId, {
        $set: {
          'profile.avatar_url':newUserData.img_url,
          'profile.bio':newUserData.bio
        }
      });
    }
  });  
});