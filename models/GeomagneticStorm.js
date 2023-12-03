const mongoose = require('mongoose');

const kpIndexSchema = new mongoose.Schema({
    observedTime: Date,
    kpIndex: Number,
    source: String
});

const linkedEventSchema = new mongoose.Schema({
    activityID: String
});

const geomagneticStormSchema = new mongoose.Schema({
    gstID: { type: String, unique: true },
    startTime: Date,
    allKpIndex: [kpIndexSchema],
    linkedEvents: [linkedEventSchema],
    link: String
});

const GeomagneticStorm = mongoose.model('GeomagneticStorm', geomagneticStormSchema);

module.exports = GeomagneticStorm;
