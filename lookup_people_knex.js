"use strict";

const knexFactory = require('knex');

const connectionSettings = require('./settings.json');


function main() {
  const searchTerm = process.argv[2].toLowerCase();
  const knex = createKnex(connectionSettings);
  const searchPeople = createSearch(knex);

  console.log('Searching...');
  searchPeople(searchTerm, logPersonResults);
}


function createKnex(pgSettings) {
  return knexFactory({
    client: 'pg',
    connection: pgSettings
  });
}


function createSearch(knex) {
  return function searchPeople(searchTerm, callback) {
    knex('famous_people')
      .whereRaw(`LOWER(first_name) LIKE ?`, [`%${searchTerm}%`])
      .orWhereRaw(`LOWER(last_name) LIKE ?`, [`%${searchTerm}%`])
      .orderBy('id')
      .then(rows => callback(rows))
      .finally(() => knex.destroy());
  };
}


function logPersonResults(rows) {
  console.log(`Found ${rows.length} person(s) matching your search parameters`);
  for (const row of rows) {
    console.log(`${row.id}: - ${row.first_name} ${row.last_name}, born ${row.birthdate.toLocaleDateString()}`);
  }
}


main();
