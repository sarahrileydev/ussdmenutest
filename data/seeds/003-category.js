
exports.seed = function (knex, Promise) {
  return knex("categories").insert([
    { name: "Animal Products" }, // 1
    { name: "Cereals" }, // 2
    { name: "Fruits" }, // 3
    { name: "Beans" }, // 4
    { name: "Other" }, // 5
    { name: "Roots & Tubers" }, // 6
    { name: "Seeds & Nuts" }, // 7
    { name: "Vegetables" } // 8
  ]);
};
