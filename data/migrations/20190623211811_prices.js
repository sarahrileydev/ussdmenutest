

exports.up = function (knex, Promise) {
  return knex.schema.createTable('prices', tbl => {
    tbl.increments()
    tbl
      .string('price', 128)
      .notNullable()
    tbl
      .integer('product_id')
      .unsigned()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('prices')
};
