var mongoose = require("mongoose");
var LeaugeSchema = new mongoose.Schema ({
    name: String,
    size: String,
    tier: Number,
    teams: [[mongoose.Types.ObjectId]]
});

var Leauge = mongoose.model('Leauge',LeaugeSchema);

module.exports = Leauge; 
