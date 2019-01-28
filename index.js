var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/studsupDEV", { useNewUrlParser: true });
var seed = require("./seeds");
seed();
