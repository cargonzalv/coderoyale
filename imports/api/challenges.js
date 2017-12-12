import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";
import SimpleSchema from "simpl-schema";

const challengeSchema = new SimpleSchema({
  name:String,
  description:String,
  testInput:[String],
  testOutput:[String]
})

export const Challenges = new Mongo.Collection("challenges");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('challenges', function challengesPublish(){
    return Challenges.find({});
  });
  Meteor.publish('challenges.id',function challenge(id){
    return Challenges.find({
      _id:id
    })
  })
}

Meteor.methods({
  
  /* Brandon Bohórquez: Sería mejor que el método recibiera un objeto con todos los atributos como parámetro, 
                        de esta forma será más sencillo mantener la consistencia entre los diversos componentes de la aplicación:
                        
                        'challenges.create'(challenge) {
                          return Challenges.insert(new_challenge);
                        }
  */
  'challenges.create'(name, description, testInput, testOutput){

    const new_challenge = {
      name:name,
      description:description,
      testInput:testInput,
      testOutput:testOutput
    };

    return Challenges.insert(new_challenge);
  }
});
