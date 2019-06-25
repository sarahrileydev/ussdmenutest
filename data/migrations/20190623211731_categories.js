
exports.up = function (knex, Promise) {
  return knex.schema.createTable('categories', tbl => {
    tbl.increments()
    tbl
      .string('name', 128)
      .notNullable()
    tbl
      .integer('marketplace_id')
      .unsigned()
      .references('id')
      .inTable('marketplaces')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('categories')
};
