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
}