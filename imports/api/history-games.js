import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import SimpleSchema from "simpl-schema";

const historyGameSchema = new SimpleSchema({
	challenge:String,
	winner:String,
	loser:String,
	codeP1:String,
	codeP2:String,
})

export const HistoryGame = new Mongo.Collection("history_games")

if(Meteor.isServer){
	Meteor.publish('my_game_history', function(){
		return HistoryGame.find({
			$or:[
				{winner:this.userId},
				{loser:this.userId},
			]
		})
	})
	Meteor.publish('game_history', function(id){
		return HistoryGame.find({
			$or:[
				{winner:id},
				{loser:id},
			]
		})
	})
	Meteor.publish('history_games.leaderboard', function(){
		return Meteor.users.find({}, {
			sort:{
				'profile.totalChallenges':-1
			},
			limit:10,
			fields: {profile:1},
		})
	})
}

Meteor.methods({
	'register-challenge'(id_user, id_challenge){
		const challenges = Meteor.users.findOne({_id:id_user}).profile.challenges
		var completed = false

		challenges.forEach((challenge)=>{
			if(challenge === id_challenge){
				completed = true
			}
		})

		if(!completed){
			Meteor.users.update({_id:id_user},{
				$push:{
					'profile.challenges':id_challenge
				},
				$inc:{
					'profile.totalChallenges':1
				}
			})
		}
	}
})