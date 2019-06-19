const router = require("express").Router();

const UssdMenu = require('ussd-menu-builder')


const menu = new UssdMenu()

module.exports = {
  postForSale,
  addCountry
}

menu.state("postForSale", {
  run: () => {
    menu.con("Enter a country:");
  },
  next: {
    "*[a-zA-Z]+": "addCountry"
  }
});

// nesting states
menu.state("addCountry", {
  run: () => {
    // use menu.val to access user input value
    let country = menu.val;
    const product = {
      country: country,
      market: "market",
      product: "product",
      price: "price"
    };
    db("products")
      .insert(product)
      .then(res => {
        menu.end("Country added successfully!");
      })
      .catch(err => {
        menu.end("Fail");
      });
  }
});


