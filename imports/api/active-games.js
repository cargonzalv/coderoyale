import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import SimpleSchema from "simpl-schema";
import {Challenges} from './challenges' 
import {HistoryGame} from './history-games'

const activeGameSchema = new SimpleSchema({
	started:Boolean,
	finished:Boolean,
	openedP1:Boolean,
	openedP2:Boolean,
	challenge:String,
	player1:String,
	player2:String,
	codeP1:String,
	codeP2:String,
	lang1:String,
	lang2:String
})

export const ActiveGame = new Mongo.Collection("active_games");


ActiveGame.allow({
	insert(userId, doc) {
    // The user must be logged in and the document must be owned by the user.
    return userId
}
});
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('spectable_games', function active_gamesPublish(){
  	return ActiveGame.find({
  		started:true,
  		finished:false,
  	})
  });
  Meteor.publish('my_current_games', function current_games(){

  	return ActiveGame.find({
  		started:true,
  		finished:false,
  		$or:[
  		{player1:this.userId},
  		{player2:this.userId},
  		]
  	})
  });
  Meteor.publish('queuedGames', function(){
  	return ActiveGame.find({
  		finished:false
  	})
  });

}


Meteor.methods({
	'active-games.create'(){
		if (! Meteor.userId()) {
			throw new Meteor.Error('not-authorized')
		}
		const new_game = {
			started:false,
			finished:false,
			openedP1:true,
			openedP2:false,
			player1:Meteor.userId(),
			player2:undefined,
			codeP1:'',
			codeP2:'',
			lang1:'python',
			lang2:'python'

		}
		const randIndex = Math.floor(Math.random()*Challenges.find({}).count());
		const rand_challenge = Challenges.findOne({},{skip:randIndex});
		new_game.challenge = rand_challenge._id;
		return ActiveGame.insert(new_game);

	},
	'active_games.join'(){
		if (! Meteor.userId()) {
			throw new Meteor.Error('not-authorized')
		}
		const game = ActiveGame.findOne({started:false})
		if(game){

			ActiveGame.update({_id:game._id},{$set:{

				player2:Meteor.userId(),
				openedP2:true,
				started:true
			}
		})
			return game._id

		}else{
			return null
		}		
	},
	'active_games.remove'(id){
		if (! Meteor.userId()) {
			throw new Meteor.Error('not-authorized')
		}
		ActiveGame.remove({_id:id});

	},
	'active_games.update'(gameId, code){
		if (! Meteor.userId()) {
			throw new Meteor.Error('not-authorized')
		}
		const game = ActiveGame.findOne({_id:gameId})
		if(game.player1 == Meteor.userId()){
			ActiveGame.update({_id:gameId},{$set:{
				codeP1:code
			}})
		}else if(game.player2 == Meteor.userId()){
			ActiveGame.update({_id:gameId},{$set:{
				codeP2:code
			}})
		}else{
			throw new Meteor.Error('not-authorized')
		}
	},
	'active_games.updateLang'(gameId, lang){
		if (! Meteor.userId()) {
			throw new Meteor.Error('not-authorized')
		}
		const game = ActiveGame.findOne({_id:gameId})
		if(game.player1 == Meteor.userId()){
			ActiveGame.update({_id:gameId},{$set:{
				lang1:lang
			}})
		}else if(game.player2 == Meteor.userId()){
			ActiveGame.update({_id:gameId},{$set:{
				lang2:lang
			}})
		}else{
			throw new Meteor.Error('not-authorized')
		}
	},
	'active_games.submit'(game_id, language){

		const user_id = Meteor.userId()

		if(!user_id){
			throw new Meteor.Error('not-autorized')
		}

		const game = ActiveGame.findOne({_id:game_id})
		if(!game){
			throw new Meteor.Error('no-such-game')
		}
		const challenge = Challenges.findOne({_id:game.challenge})
		const numTestCases = challenge.testOutput.length
		let answer = {
			error:"",
			passed:0,
			totalTests:numTestCases,
			success:false,
		}
		if(Meteor.isServer){
			
			if(game.player1 == user_id){
				try{
					var result = HTTP.post("http://api.hackerrank.com/checker/submission.json", {
						params:{
							source:game.codeP1,
							lang:language,
							testcases:JSON.stringify(challenge.testInput),
							api_key:Meteor.settings.coderoyale.key
						}
					});
					console.log(result.data.result.stdout)

					
					if(result.data.result.compilemessage !== ""){
						answer.error = result.data.result.compilemessage
					}
					else{
						challenge.testOutput.forEach((output, i)=>{
							var res = result.data.result.stdout[i];
							var newRes = res.length>=0 ? res.substring(0,res.length-1):res;
							if(output === newRes){
								answer.passed++
							}
						})
						if(answer.passed === numTestCases){
							answer.success = true
							ActiveGame.update({_id:game},{$set:{
								finished:true
							}})
							HistoryGame.insert({
								challenge:challenge._id,
								winner:game.player1,
								loser:game.player2,
								codeP1:game.codeP1,
								codeP2:game.codeP2,
							})
							Meteor.call('register-challenge',game.player1, challenge._id)
						}
					}
				}
				catch(e){
					answer.error = e;
					throw new Meteor.Error('problem-with-submission')
				}

			}
			else if(game.player2 == user_id){
				try{
					var result =  HTTP.post("http://api.hackerrank.com/checker/submission.json", {
						params:{
							source:game.codeP2,
							lang:language,
							testcases:JSON.stringify(challenge.testInput),
							api_key:Meteor.settings.coderoyale.key
						}
					});
					
					if(result.data.result.compilemessage !== ""){
						answer.error = result.data.result.compilemessage
					}
					else{
						challenge.testOutput.forEach((output, i)=>{
							var res = result.data.result.stdout[i];
							var newRes = res.length>=0 ? res.substring(0,res.length-1):res;
							if(output == newRes){
								answer.passed++
							}
						})
						if(answer.passed === numTestCases){
							answer.success = true
							ActiveGame.update({_id:game},{$set:{
								finished:true
							}})
							HistoryGame.insert({
								challenge:challenge._id,
								winner:game.player2,
								loser:game.player1,
								codeP1:game.codeP1,
								codeP2:game.codeP2,
							})
							Meteor.call('register-challenge',game.player2, challenge._id)
						}
					}
				}
				catch(e){
					answer.error = e;
					throw new Meteor.Error('problem-with-submission')
				}
			}
		else{
			throw new Meteor.Error('not-allowed-submission')
		}
	}
	return answer;
}
})