const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
import session from "express-session";

import morgan from "morgan"; // HTTP REQUEST LOGGER

const app = express();
const PORT = process.env.PORT || 5000;

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

app.get("/api/greeting", (req, res) => {
  return res.send("LOVE U");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(PORT, function() {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
