const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const posts = require("./posts");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  console.log("PRODUCTION");
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.get("/api/greeting", (req, res) => {
  return res.send("LOVE U");
});

app.use("/", posts);

//I added to fix react router cannot GET error...
app.get("*", (req, res) => {
  return res.sendFile(path.resolve("client/build", "index.html"));
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, function() {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
