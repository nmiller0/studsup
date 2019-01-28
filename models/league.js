var mongoose = require("mongoose");
var LeaugeSchema = new mongoose.Schema ({
    name: String,
    size: String,
    tier: Number,
    teams: [{type: mongoose.Schema.Types.ObjectId, ref:"team"}]
});

var Leauge = mongoose.model('Leauge',LeaugeSchema);

module.exports = Leauge; 
