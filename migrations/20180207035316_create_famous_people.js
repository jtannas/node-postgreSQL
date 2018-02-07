exports.up = async function(knex) {
  await knex.schema.createTableIfNotExists("famous_people", function(t) {
    t.increments();
    t.timestamps();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable("famous_people");
};
