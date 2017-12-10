import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import SimpleSchema from "simpl-schema";

import {Challenge} from './challenges' 
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
})

export const ActiveGame = new Mongo.Collection("active_games")

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
  		$or:[
  			{player1:this.userId},
  			{player2:this.userId},
  		]
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

		}

		const randIndex = Math.random()*Challenge.count()
		const rand_challenge = Challenge.findOne({},{skip:randIndex})
		new_game.challenge = rand_challenge._id

		ActiveGame.insert(new_game, function(err, id){
			if(err){
				throw new Meteor.Error('error-creating')
			}else{
				return id
			}
		})
	},
	'active_games.join'(){
		if (! Meteor.userId()) {
	      throw new Meteor.Error('not-authorized')
		}
		const challenge = Challenge.findOne({started:false})
		ActiveGame.update({_id:challenge._id},{$set:{

		  	player2:Meteor.userId(),
		  	openedP2:true,
		  	started:true
		  }
		})
		return challenge._id;
	},
	'active_games.update'(gameId, code){
		if (! Meteor.userId()) {
	      throw new Meteor.Error('not-authorized')
	    }
	    const game = ActiveGame.findOne({_id:gameId})
	    if(game.player1 == Meteor.userId()){
	    	ActiveGame.update({_id:game},{$set:{
	    		codeP1:code
	    	}})
	    }else if(game.player2 == Meteor.userId()){
	    	ActiveGame.update({_id:game},{$set:{
	    		codeP2:code
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
		const challenge = Challenge.findOne({_id:game.challenge})
		if(Meteor.isServer){
			if(game.player1 == user_id){
				HTTP.post("http://api.hackerrank.com/checker/submission.json", {
					params:{
						source:game.codeP1,
						lang:language,
						testcases:challenge.testInput,
						api_key:Meteor.settings.coderoyale.key
					}
				}, (err, result) =>{
					const numTestCases = challenge.testOutput.length
					var answer = {
						error:"",
						passed:0,
						totalTests:numTestCases,
						success:false,
					}
					if(err){
						throw new Meteor.Error('problem-with-submission')
					}
					if(result.compilemessage !== ""){
						answer.error = result.compilemessage
					}else{
						challenge.testOutput.forEach((output, i)=>{
							if(output === result.stdout[i]){
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
							return answer
						}
					}
				})

			}else if(game.player2 == user_id){
				HTTP.post("http://api.hackerrank.com/checker/submission.json", {
					params:{
						source:game.codeP2,
						lang:language,
						testcases:challenge.testInput,
						api_key:Meteor.settings.coderoyale.key
					}
				}, (err, result) =>{
					const numTestCases = challenge.testOutput.length
					var answer = {
						error:"",
						passed:0,
						totalTests:numTestCases,
						success:false,
					}
					if(err){
						throw new Meteor.Error('problem-with-submission')
					}
					if(result.compilemessage !== ""){
						answer.error = result.compilemessage
					}else{
						challenge.testOutput.forEach((output, i)=>{
							if(output === result.stdout[i]){
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
							return answer
						}
					}
				})
			}else{
				throw new Meteor.Error('not-allowed-submission')
			}
		}
		
	}
})