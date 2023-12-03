require('dotenv').config();
const mongoose = require('mongoose');

const mongoDBUri = process.env.MONGODB_URI || 'mongodb://localhost/spaceDashboard';

mongoose.connect(mongoDBUri)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));
