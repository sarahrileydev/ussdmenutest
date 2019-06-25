
exports.seed = function (knex, Promise) {
  return knex("marketplaces").insert([
    { name: "Busia", }, // 1
    { name: "Tororo" }, // 2
    { name: "Mbale" }, // 3
    { name: "Eldoret" }, // 4
    { name: "Kisumu" }, // 5
    { name: "Soroti" }, // 6
    { name: "Bungoma" }, // 7
    { name: "Kampala" } // 8
  ]);
};
