"use strict";

const knexFactory = require('knex');

const connectionSettings = require('./settings.json');


function main() {
  if (process.argv.length !== 5) {
    return console.error('Usage: node add_person.js <first_name> <last_name> <birthdate>');
  }
  const knex = createKnex(connectionSettings);
  const insertPerson = createInsert(knex);

  const newPerson = {
    'first_name': process.argv[2],
    'last_name': process.argv[3],
    'birthdate': process.argv[4]
  };

  insertPerson(newPerson, () => console.log('Insert Complete'));
}


function createKnex(pgSettings) {
  return knexFactory({
    client: 'pg',
    connection: pgSettings
  });
}


function createInsert(knex) {
  return function searchPeople(newPerson, callback) {
    knex('famous_people')
      .insert(newPerson)
      .then(() => callback())
      .finally(() => knex.destroy());
  };
}


main();
