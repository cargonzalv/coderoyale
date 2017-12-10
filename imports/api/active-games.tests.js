import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';

import { ActiveGame } from "./active-games"
import { Challenge } from './challenges'

import faker from 'faker';
import { Random } from 'meteor/random'

import { resetDatabase } from 'meteor/xolvio:cleaner';
import { sinon } from 'meteor/practicalmeteor:sinon';


const assert = chai.assert;
const newUser = {
  username: "test",
  password: "test",
}

Factory.define('active_game.empty', ActiveGame, {
  started: () => false,
  finished: () => false,
  openedP1: () => true,
  openedP2: () => false,
  player1: () => Random.id(),
  player2: () => undefined,
  codeP1: () => '',
  codeP2: () => ''
});

Factory.define('active_game.started', ActiveGame, {
  started: () => true,
  finished: () => false,
  openedP1: () => true,
  openedP2: () => false,
  player1: () => Random.id(),
  player2: () => Random.id(),
  codeP1: () => '',
  codeP2: () => ''
});

Factory.define('active_game.finished', ActiveGame, {
  started: () => true,
  finished: () => true,
  openedP1: () => true,
  openedP2: () => false,
  player1: () => Random.id(),
  player2: () => Random.id(),
  codeP1: () => '',
  codeP2: () => ''
});

Factory.define('challenge', Challenge, {
  name: () => faker.lorem.sentence(),
  description: () => faker.lorem.paragraph(),
  testInput: () => ['1'],
  testOutput: () => ['1'],
})

describe('Active Game API', function () {
  beforeEach(function () {
    resetDatabase(); 
    Factory.define('user', Meteor.users, {
      username:faker.name.findName(),
    });
    currentUser = Factory.create('user');
    sinon.stub(Meteor, 'user');
    Meteor.user.returns(currentUser);
  });
  afterEach(() => {
    Meteor.user.restore();
    resetDatabase();
  });
  describe('1. Create One', function(){
    it('Creates a game without errors', function(){
      Meteor.call('active_games.create', function(err, result){
        const game = ActiveGame.findOne({_id:result})
        assert.isNotTrue(game.started)
        assert.isNotTrue(game.finished)
        assert.isUndefined(game.player2)
      })

    })
  })
  describe('2. Join a game', function(){
    it('Joins a game and returns the id of said game', function(){
      const game = Factory.create('active_game.empty')
      Meteor.call('active_games.join', function(err, result){
        const joined_game = ActiveGame.findOne({_id:result})
        assert.isDefined(joined_game)
        assert.isDefined(joined_game.player2)
        assert.isTrue(joined_game.started)
      })
    })
  })
  describe('3. Update a game', function(){
    it('Updates correctly game of player 1', function(){
      
    })
  })
})