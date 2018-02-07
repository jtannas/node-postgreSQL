exports.up = function(knex, Promise) {
  return knex.schema.alterTable('milestones', function(table) {
    table.integer('famous_person_id').unsigned().notNull().index().references('id').inTable('famous_people');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('milestones', table => {
    table.dropColumn('famous_person_id')
  });
};
