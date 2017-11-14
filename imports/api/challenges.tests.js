import { Factory } from 'meteor/dburles:factory';
import { expect } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';
import faker from 'faker';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { sinon } from 'meteor/practicalmeteor:sinon';

describe('1 - Array', function() {
  describe('1.1 - #indexOf()', function() {
    return it('should return -1 when the value is not present', function() {
      expect([1, 2, 3].indexOf(5)).to.equal(-1);
      return expect([1, 2, 3].indexOf(0)).to.equal(-1);
    });
  });

  describe('1.2 - length', function() {
    return it('should return length of array', function() {
      return expect([1, 2, 3].length).to.equal(3);
    });
  });

  describe("Specify", function () {

    specify("it works", function () {
      expect(true).to.be.true;
    });

    xspecify("Skip: This won't run", function () {
      throw new Error("This won't run")
    })
  })

  context("Context test", function () {
    it("it works", function () {
      expect(true).to.be.true;
    });
  });

  xcontext("Skip suite (xcontext)", function () {

    it("This won't run", function () {
      throw new Error("This won't run")
    })
  })

});

//const newUser = {
//      username: "test",
//      password: "test",
//      profile: {
//        country:null
//      }
//    }

//var createComments = function(){
//  const obj = {
//  authorId: faker.name.findName(),
//  authorName: faker.name.findName(),
//  text: faker.lorem.sentence(),
//  createdAt: new Date(),
//  votes: {result:0,
//    votersUp:[],
//    votersDown:[]
//    }
//  }
//  var arr = []
//  arr.push(obj)
//  return arr
//}

//Factory.define('question.comments', Questions, {
//  question: () => faker.lorem.sentence(),
//  description: () => faker.lorem.sentence(),
//  categories: () => createCategories(),
//  rating: () => {return {rating:3.5,count:0}},
//  options: () => {return []},
//  canAdd: () => faker.random.boolean(),
//  publishedAt: () => new Date(),
//  comments: ()=>createComments()
//});
//
//Factory.define('question', Questions, {
//  question: () => faker.lorem.sentence(),
//  description: () => faker.lorem.sentence(),
//  categories: () => createCategories(),
//  rating: () => {return {rating:3.5,count:0}},
//  options: () => {return []},
//  canAdd: () => faker.random.boolean(),
//  publishedAt: () => new Date()
//});

//describe('challenge api', function () {
  //beforeEach(function () {
  //  resetDatabase(); 
  //  Factory.define('user', Meteor.users, {
  //    username:faker.name.findName(),
  //  });
  //  currentUser = Factory.create('user');
  //  sinon.stub(Meteor, 'user');
  //  Meteor.user.returns(currentUser);
  //});
  // afterEach(() => {
  //  Meteor.user.restore();
  //  resetDatabase();
  //});

  //it('Inserts a challenge', function () {
    // This code will be executed by the test driver when the app is started
    // in the correct mode
    //const questionsParams = Factory.build("question");
    //Meteor.call('questions.insert', questionsParams.question, questionsParams.description, questionsParams.categories,
    //	questionsParams.options, questionsParams.canAdd, questionsParams.collections);
    //const question = Questions.findOne({question:questionsParams.question});
    //return expect(true).to.be["true"];
  //})
//})

