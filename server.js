const app = require("express")();
const bodyParser = require("body-parser");
const db = require("./data/dbConfig");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("It's alive!");
});

const UssdMenu = require("ussd-menu-builder");
let menu = new UssdMenu();

// Define menu states
menu.startState({
  run: () => {
    // use menu.con() to send response without terminating session
    menu.con("Welcome. Choose option:" + "\n1. Buyer" + "\n2. Seller");
  },
  // next object links to next state based on user input
  next: {
    "1": "markets",
    "2": "postForSale"
  }
});

menu.state("markets", {
  run: () => {
    menu.con(
      "Welcome. Choose option:" +
        "\n1. Bujumbaru" +
        "\n2. Tororo" +
        "\n3. Mbale" +
        "\n4. Eldoret" +
        "\n5. Kisumu" +
        "\n6. Soroti" +
        "\n7. Ownio" +
        "\n8. Kampala"
    );
  },
  next: {
    "1": "Bujumbaru",
    "2": "Tororo",
    "3": "Mbale",
    "4": "Eldoret",
    "5": "Kisumu",
    "6": "Soroti",
    "7": "Ownio",
    "8": "Kampala"
  }
});

menu.state("Bujumbaru", {
  run: () => {
    let sql = `
    SELECT price
FROM products
WHERE country = 'BTI' AND market = 'Bujumbaru' AND product = 'beans';`;
    try {
      const results = await db.raw(sql);
    console.log(results);
      response = results.rows
    } catch (error) {
      console.log(error);
      // do stuff with error
    }
  // response = `END Current prices for \n Eggs ${prices}`;
  break;
  }
});

menu.state("postForSale", {
  run: () => {
    async function addPost(post) {
  
      const func = await db("products")
        .insert(post)
        .where({ market: market });

      return `New Post ID: ${post.market} : Added :)`;
    }
    menu.end("Your post is live" + post);
  }
});

// nesting states
menu.state("buyAirtime.amount", {
  run: () => {
    // use menu.val to access user input value
    var amount = Number(menu.val);
    buyAirtime(menu.args.phoneNumber, amount).then(function(res) {
      menu.end("Airtime bought successfully.");
    });
  }
});

// Registering USSD handler with Express

app.post("*", function(req, res) {
  menu.run(req.body, ussdResult => {
    res.send(ussdResult);
  });

});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`\nAPI running on port ${port}\n`));
