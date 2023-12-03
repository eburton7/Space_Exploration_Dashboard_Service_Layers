const mongoose = require('mongoose');

const SolarFlareSchema = new mongoose.Schema({
    flrID: String,
    instruments: [{
        displayName: String
    }],
    beginTime: Date,
    peakTime: Date,
    endTime: Date,
    classType: String,
    sourceLocation: String,
    activeRegionNum: Number,
    linkedEvents: [{
        activityID: String
    }],
    link: String
});

module.exports = mongoose.model('SolarFlare', SolarFlareSchema);
