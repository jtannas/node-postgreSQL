
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('milestones', function(table){
      table.increments();
      table.string('description');
      table.string('date_achieved');
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('milestones');
};
