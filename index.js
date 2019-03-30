var express = require("express");
var app = express();
var mongoose = require("mongoose");
app.use(express.static(__dirname + "/public"));
var database = process.env.DATABASEURL || "mongodb://localhost:27017/studsup";

mongoose.connect(database, {
    useNewUrlParser: true
});
var Models = require("./models");
var controllers = require("./controllers");
var userRoutes = require("./routes/users");
var matchRoutes = require("./routes/matches");
var teamRoutes = require("./routes/teams");
var leagueRoutes = require("./routes/leagues");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/users", userRoutes);
app.use("/teams", teamRoutes);
app.use("/matches", matchRoutes);
app.use("/leagues", leagueRoutes);

controllers.League.createLeague("Test League",null,3);

var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('App listening on port 3000!');
});