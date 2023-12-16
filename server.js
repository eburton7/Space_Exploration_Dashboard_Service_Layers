require('dotenv').config();
const cors = require('cors');
const express = require('express');
const fetchGeomagneticStorms = require('./scripts/fetchGeomagneticStorms');
const spaceWeatherRouter = require('./routes/spaceWeatherRouter');
const app = express();
const fetchSolarFlares = require('./scripts/fetchSolarFlares');

app.use(express.json());
app.use(cors());
app.use('/api/space-weather', spaceWeatherRouter);

app.get('/fetch-geomagnetic-storms', async (req, res) => {
    try {
        await fetchGeomagneticStorms();
        res.send('Geomagnetic storms data fetched successfully');
    } catch (error) {
        res.status(500).send('Error fetching geomagnetic storms data');
    }
});

app.get('/fetch-solar-flares', async (req, res) => {
    try {
        await fetchSolarFlares();
        res.send('Solar flares data fetched successfully');
    } catch (error) {
        res.status(500).send('Error fetching solar flares data');
    }
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

