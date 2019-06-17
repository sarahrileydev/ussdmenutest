

exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', function(tbl){
    tbl.increments();

    tbl
    .string('country', 128) 
    .notNullable()

    tbl
    .string('market', 128) 
    .notNullable()
    
    tbl
    .string('product', 128) 
    .notNullable()
 
    tbl
    .string('price', 128) 
    .notNullable()
   
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('products');
};
