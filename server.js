const app = require("express")();
const bodyParser = require("body-parser");
const db = require("./data/dbConfig");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("It's alive!");
});

app.get("/products", (req, res) => {
  db("products")
    .then(products => {
      res.status(200).json(products);
    })
    .catch(err => {
      res.status(400).json({ message: "Fail" });
    });
});

const UssdMenu = require("ussd-menu-builder");
let menu = new UssdMenu();

async function findPrice(name, product) {
  return db("markets")
    .select("price")
    .where({ name: name, product: product });
}

async function addProduct(product) {
  const [id] = await db('products').insert(product)

}

async function get() {
  return db('marketplaces')
}

async function getMarkets() {
  return db('marketplaces')
}

async function getCat() {
  return db('categories')
}

async function categories(){
  const result = await models.getCat()
  return result
}

async function products(){
  const result = await models.getProducts()
  return result
}

async function getProducts() {
  const products = await db('products')
  // add a temporary "seller_id" -- we need to add this to the actual database
  return products.map(product => {
    product.seller_id = product.id
    return product
  })
}

async function getSellers () {
  const sellers = []
  for (let i=0; i<100; i++) {
    sellers.push({
      id: i,
      name: `This Guy ${i}`,
      phone: '555-555-${i}${i}${i}${i}'
    })
  }
  return sellers
}

// Menu & State Generators
// ------------------------------------------------------------------------------------------
// */
// create a USSD menu string from a set of db rows
function generateMenuStringFromDbRows (dbRows) {
  let stringy = ''
  dbRows.forEach((row, i) => {
    const digit = i + 1
    stringy += `\n${digit}. ${row.name}`
  })
  return stringy
}

// create a "next" route option for each USSD menu option from a set of db rows
function generateNextRoutesFromDbRows (dbRows, nextRoute) {
  const next = {}
  dbRows.forEach((row, i) => {
    next[i.toString()] = nextRoute
  })
  return next
}

// find the database row that corresponds to a the USSD menu selection
function findDbRowForMenuSelection (menuSelection, dbRows) {
  // convert the selection to a number
  const i = parseInt(menuSelection)
  // find that row from the rows
  return dbRows[i] 
}

/*
------------------------------------------------------------------------------------------
Buyer - Categories & Products
------------------------------------------------------------------------------------------
*/

async function getCategoriesForMarketplace (marketplaceId) {
  // ... need to get categories from database
  // SELECT * FROM categories WHERE marketplace_id = marketplaceId ORDER BY name
  // ... for now, we'll return these hard-coded
  return [
    { id: 1, name: 'Animal Product' },
    { id: 2, name: 'Cereals' },
    { id: 3, name: 'Fruits' },
    { id: 4, name: 'Beans' }
  ]
}

/*
------------------------------------------------------------------------------------------
Routes 
------------------------------------------------------------------------------------------
*/
async function buildMenu () {
  // WELCOME!
  menu.startState({
    run: () => {
      menu.con(`\n1. Go To Market \n2. goodbye`)
    },
    next: {
      '1': 'position',
      '2': 'goodbye'
    }
  })

  // POSITION
  menu.state('position', {
    run: () => {
      menu.con(`\n1. buyer \n2. seller `)
    },
    next: {
      '1': 'buyerMarketplace',
      '2': 'sellerMarketplace'
    }
  })

  // BUYER: CHOOSE MARKETPLACE
  const buyerMarketsDbRows = await getMarkets()
  const buyerMarketplaceRoute = (showErrorMessage) => {
    return {
      run: async () => {
        const menuStr = generateMenuStringFromDbRows(buyerMarketsDbRows)
        if (showErrorMessage) {
          menuStr = `Invalid entry.\n` + menuStr
        }
        menu.con(menuStr)
      },
      next: generateNextRoutesFromDbRows(buyerMarketsDbRows),
      defaultNext: 'invalidBuyerMarketplace'
    }
  }
  menu.state('buyerMarketplace', buyerMarketplaceRoute())
  menu.state('invalidBuyerMarketplace', buyerMarketplaceRoute(true))

  // BUYER: CATEGORIES
  menu.state(`buyerCategories`, {
    run: () => {
      // what did they enter?
      const selection = menu.val
      // what does that value map to?
      const marketplaceDbRows = await getMarkets()
      const marketplace = findDbRowForMenuSelection(selection, marketplaceDbRows)
      // if no value matches this selection, give invalid message
      if (!marketplace) {
        
      }
      // what categories exist in this marketplace?
      const categoryDbRows = getCategoriesForMarketplace(marketplace.id)
      const menuStr = await generateMenuStringFromDbRows(categoryDbRows)
      menu.con(menu)
    },
    next: {
      '1': 'Animal Products',
      '2': 'Cereals',
      '3': 'Fruits',
      '4': 'Beans',
      '5': 'Other',
      '6': 'Roots & Tubers',
      '7': 'Seeds & Nuts',
      '8': 'Vegetables'
    }
  })

}


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))





// functions based on user's menu choice
menu.state('goodbye', {
  run: () => {
    menu.end(`goodbye`)
  }
})


// function base on "buyer" choice
menu.state('buyer', {
  run: async () => {
    await menuRunFunctionFromModelGetter(marketPlaces)
  },
  next: {
    '1': 'Busia',
    '2': 'Tororo',
    '3': 'Mbale',
    '4': 'Eldoret',
    '5': 'Kisumu',
    '6': 'Soroti',
    '7': 'Bungoma',
    '8': 'Kampala'
  }
});

// ************************************************************************
// Define menu states
// menu.startState({
//   run: () => {
//     // use menu.con() to send response without terminating session
//     menu.con("Welcome. Choose option:" + "\n1. Buyer" + "\n2. Seller");
//   },
//   // next object links to next state based on user input
//   next: {
//     "1": "markets",
//     "2": "postForSale"
//   }
// });

// const fetchMarkets = (phoneNumber, session, text) => {
//   const market = "Bujumbaru";
//   console.log("FETCH P#: ", phoneNumber);
//   console.log("FETCH SESH: ", session);
//   console.log("FETCH TEXT: ", text);
//   return db("products")
//     .where({ market: market })
// }

// menu.state("markets", {

//   run: () => {
//     fetchMarkets(menu.args.phoneNumber, menu.args.sessionId, menu.args.text)
//       .then(res => {
//         console.log("DB RES: ", res);
//         if(res.length > 0) {
//           let options = "";
//           for(let i = 0; i < res.length; i++){
//             options += `\n#${res[i].id}: ${res[i].product} $${res[i].price}`
//           }
//           menu.con(`Fetched ${res.length} items from db${options}`)
//         } else {
//           menu.con("Found no products in that market that match your selection")
//         }
//       })
//       .catch(err => {
//         menu.con(err);
//       })
//   },

//   next: {"0": "start"},

//   defaultNext: "product"
// })

// // menu.state("product", {
// //   run: () => {
// //     // gives you an array of all the decisions
// //     // the user has made. 
// //     // the last item in that array is the most recent
// //     // menu.args.text.split("*")

// //     // sets a key/value that can be used anywhere else in the application
// //     menu.session.set({"product_id": menu.args.text.split("*")})
// //     // retreives the value for the key stored for the session
// //     menu.session.get("product_id")
// //   }
// // })

// menu.state("done", {
//   run: () => {
//     menu.end('Goodbye');
//   }
// })

// // menu.state("markets", {
// //   run: () => {
// //     const market = "Bujumbaru";

// //     // const markets = await db.find("products")
// //     // .where({menu.val});
// //     menu.con(`The products available at ${market}`);
// //     // return markets;
// //   },
  
// //   next: () => {
// //     const market = "Bujumbaru";
    
// //     db("products")
// //       .where({ market: market })
// //       .then(products => {
// //         const options = {};
// //         // console.log("DBPRODUCTS", products)
// //         for (let i = 0; i < products.length; i++) {
// //           options[i + 1] = `${products[i].product} ${products[i].price} `;

// //         }
// //         console.log("OPTIONS", options)
// //         return options;
// //       });

// //   }
// // });

// // menu.state("Test", {
// //   run: () => {
// //     menu.end("You made it!");
// //   }
// // });

// menu.state("postForSale", {
//   run: () => {
//     menu.con("Enter a country:");
//   },
//   next: {
//     "*[a-zA-Z]+": "addCountry"
//   }
// });

// // // nesting states
// menu.state("addCountry", {
//   run: () => {
//     // use menu.val to access user input value
//     let country = menu.val;
//     const product = {
//       country: country,
//       market: "market",
//       product: "product",
//       price: "price"
//     };
//     db("products")
//       .insert(product)
//       .then(res => {
//         menu.end("Country added successfully!");
//       })
//       .catch(err => {
//         menu.end("Fail");
//       });
//   }
// });

// Registering USSD handler with Express

app.post("*", function(req, res) {
  let args = {
    phoneNumber: req.body.phoneNumber,
    sessionId: req.body.sessionId,
    serviceCode: req.body.serviceCode,
    text: req.body.text
  }

  menu.run(args, resMsg => {
   
    res.send(resMsg);
    // let sessionData = JSON.stringify(args);
    let phoneNumber = menu.args.phoneNumber;
    let sessionId = menu.args.sessionId;
    let serviceCode = menu.args.serviceCode;
    let text = menu.args.text;

        const product = {
          country: phoneNumber,
          market: sessionId,
          product: serviceCode,
          price: text 
        };
        db("products")
          .insert(product)
          .then(res => {
            menu.end("session added successfully!");
          })
          .catch(err => {
            menu.end("Fail");
          });
  });

});



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`\nAPI running on port ${port}\n`));
