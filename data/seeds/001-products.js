
exports.seed = function(knex, Promise) {
  return knex("products").insert([
    {
      id: 1,
      country: "BTI",
      market: "Bujumbaru",
      product: "eggs",
      price: "123"
    },
    { id: 2, country: "DRC", market: "Likasi", product: "rice", price: "124" },
    { id: 3, country: "KEN", market: "Busia", product: "coffee", price: "125" },
    {
      id: 4,
      country: "BTI",
      market: "Bujumbaru",
      product: "eggs",
      price: "222"
    },
    { id: 5, country: "BTI", market: "Bujum", product: "rice", price: "333" },
    { id: 6, country: "MWI", market: "Buj", product: "coffee", price: "444" }
  ]);
};
