const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
const router = require("./controllers/burgers_controller.js");

app.use(router);

let db = require("./models");

// Start our server so that it can begin listening to client requests.
db.sequelize.sync().then(function(){
  app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
});
