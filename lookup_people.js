"use strict";

const pg = require("pg");
const connectionSettings = require("./settings.json");


const QUERY_STRING = `
  SELECT *
    FROM famous_people
    WHERE LOWER(first_name) LIKE LOWER($1::text)
      OR LOWER(last_name) LIKE LOWER($1::text)
    ORDER BY last_name;`;


function main() {
  const client = createConnectedClient(connectionSettings);
  const lookupPerson = createLookup(client, QUERY_STRING);

  const searchTerm = process.argv[2];
  console.log('Searching...');
  lookupPerson(searchTerm, logPersonResult);
}


function createConnectedClient(pgSettings) {
  const client = new pg.Client(pgSettings);
  client.connect(err => {
    if (err) { return console.error("Connection Error", err); }
  });
  return client;
}


function createLookup(client, queryString) {
  return function(searchTerm, callback) {
    client.query(queryString, [`%${searchTerm}%`], (err, result) => {
      client.end();
      if (err) { return console.error("ERROR RUNNING QUERY", err); }
      return callback(result);
    });
  };
}


function logPersonResult(result) {
  console.log(`Found ${result.rows.length} person(s) matching your search parameters`);
  for (const row of result.rows) {
    console.log(`${row.id}: - ${row.first_name} ${row.last_name}, born ${row.birthdate}`);
  }
}


main();
