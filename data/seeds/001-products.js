exports.seed = function (knex, Promise) {
  return knex("products").insert([
    { name: "white eggs", price: "110kes" }, // 1 animal
    { name: "exotic eggs", price: "110kes" }, // 2 animal
    { name: "brown eggs", price: "110kes" }, // 3 animal
    { name: "milk", price: "110kes" }, // 4 animal
    { name: "nile perch", price: "110kes" }, // 5 animal
    { name: "tilapia", price: "110kes" }, // 6 animal
    { name: "processed honey", price: "110kes" }, // 7 animal
    { name: "unprocessed honey", price: "110kes" }, // 8 animal
    { name: "beef", price: "110kes" }, // 9 animal
    { name: "goat meat", price: "110kes" }, // 10 animal
    { name: "pork", price: "110kes" }, // 11 animal
    { name: "local chicken", price: "110kes" }, // 12 animal
    { name: "turkey", price: "110kes" }, // 13 animal

    { name: "agwedde beans", price: "110kes" }, // 14 beans
    { name: "maize", price: "110kes" }, // 15 cere
    { name: "millet", price: "110kes" }, // 16 cere Maize
    { name: "white rice", price: "110kes" }, // 17 rice
    { name: "bananas", price: "110kes" }, // 18 fruit
    { name: "coffee", price: "110kes" }, // 19 other
    { name: "sweet potatoes", price: "110kes" }, // 20 Roots 
    { name: "sunflower seeds", price: "110kes" }, // 21 nuts
    { name: "peas", price: "110kes" } // 22 vege
  ]);
};
