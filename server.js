const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const db = require("./models/Article");

app.use(cors());
// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
// app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nytreact", {
  useMongoClient: true
});

// Send every request to the React app
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// setup a server to listen for post to /api/article
app.post("/api/article", (req, res) => {
  console.log(req.body);

  let newArticle = {
    title: req.body.title,
    summary: req.body.summary,
    url: req.body.url,
    date: req.body.date
  };

  console.log("Article", newArticle);

  db
    .create(newArticle)
    .then(result => {
      console.log(`post successful`, result);
    })
    .catch(error => {
      console.log("Post Error!", error);
    });
});


// route for pulling data from DB
app.get("/api/article", (req, res) => {
  // res.send('GET request to the homepage')
  db.find(req.query)
    .then(result => {
      res.json(result)
      console.log(`Get successful`, result);
    })
    .catch(error => {
      res.json(error)
      console.log("Get Error!", error);
    });

});//end app.get

// Define any API routes before this runs
app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
