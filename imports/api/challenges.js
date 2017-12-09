import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import SimpleSchema from "simpl-schema";

const challengeSchema = new SimpleSchema({
  name:String,
  description:String,
  testInput:[String],
  testOutput:[String],
})

export const Challenge = new Mongo.Collection("challenges");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('challenges', function challengesPublish(){
    return Challenge.find({})
  }

}

Meteor.methods({
  'challenges.create'(name, description, testInput, testOutput){

    const new_challenge = {
      name:name,
      description:description,
      testInput:testInput,
      testOutput:testOutput,
    }

    Challenge.insert(){
      new_challenge
    }
  }
});
