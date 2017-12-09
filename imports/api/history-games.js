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