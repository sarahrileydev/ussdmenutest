
exports.up = function (knex, Promise) {
  return knex.schema.createTable('market_cat', tbl => {
    tbl.increments()
    tbl
      .integer('marketplace_id')
      .unsigned()
      .references('id')
      .inTable('marketplaces')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    tbl
      .integer('category_id')
      .unsigned()
      .references('id')
      .inTable('categories')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('market_cat')
};
