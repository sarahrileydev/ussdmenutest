const app = require("express")();
const bodyParser = require("body-parser");

const router = require('./router');


app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('*', router);


app.get("/", (req, res) => {
  res.send(
    "It's alive!"
  );
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});