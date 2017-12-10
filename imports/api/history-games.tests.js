import { Factory } from 'meteor/dburles:factory';
import { chai } from 'meteor/practicalmeteor:chai';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import { PublicationCollector } from 'meteor/johanbrook:publication-collector';

import { HistoryGame } from "./history-games.js"

import faker from 'faker';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { sinon } from 'meteor/practicalmeteor:sinon';


const assert = chai.assert;
const newUser = {
  username: "test",
  password: "test",
}

Factory.define('history_game', HistoryGame, {
  challenge: () => Random.id(),
  winner: () => Random.id(),
  loser: () => Random.id(),
  codeP1: () => faker.lorem.paragraph(),
  codeP2: () => faker.lorem.paragraph(),
});

describe('History Game API', function () {
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
  if(Meteor.isServer){
    it('Returns correctly the history of the winner', function (done) {
      // This code will be executed by the test driver when the app is started
      // in the correct mode
      const game = Factory.create("history_game")
      const p1 = game.winner
      const p2 = game.loser

      const collector = new PublicationCollector({userId: p1});
      // Collect the data published from the `lists.public` publication.
      collector.collect('my_game_history', (collections) => {
        // `collections` is a dictionary with collection names as keys,
        // and their published documents as values in an array.
        // Here, documents from the collection 'Lists' are published.
        assert.typeOf(collections.history_games, 'array')
        assert.equal(collections.history_games.length, 1)
        done()
      })
    })
    it('Returns correctly the history of the loser', function (done) {
      // This code will be executed by the test driver when the app is started
      // in the correct mode
      const game = Factory.create("history_game")
      const p1 = game.winner
      const p2 = game.loser

      const collector = new PublicationCollector({userId: p2});
      // Collect the data published from the `lists.public` publication.
      collector.collect('my_game_history', (collections) => {
        // `collections` is a dictionary with collection names as keys,
        // and their published documents as values in an array.
        // Here, documents from the collection 'Lists' are published.
        assert.typeOf(collections.history_games, 'array')
        assert.equal(collections.history_games.length, 1)
        done()
      })
    })
    it('Returns correctly the history of a non existen player', function (done) {
      // This code will be executed by the test driver when the app is started
      // in the correct mode
      const game = Factory.create("history_game")

      const collector = new PublicationCollector({userId: 'random'});
      // Collect the data published from the `lists.public` publication.
      collector.collect('my_game_history', (collections) => {
        // `collections` is a dictionary with collection names as keys,
        // and their published documents as values in an array.
        // Here, documents from the collection 'Lists' are published.
        assert.typeOf(collections.history_games, 'array')
        assert.equal(collections.history_games.length, 0)
        done()
      })
    })
  }
})