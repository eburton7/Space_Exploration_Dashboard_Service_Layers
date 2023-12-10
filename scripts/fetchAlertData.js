const axios = require('axios');
require('dotenv').config();

async function fetchElectronFluxAlert() {
    try {
        const response = await axios.get('https://services.swpc.noaa.gov/products/alerts.json');
        const alerts = response.data;
        const currentMonth = new Date().getMonth(); // 0-11 for Jan-Dec

        // Filter and parse the Electron Flux Alerts
        const electronFluxAlerts = alerts
            .filter(alert => {
                const alertDate = new Date(alert.issue_datetime);
                return alert.message.includes("ALTEF3") && alertDate.getMonth() === currentMonth;
            })
            .map(alert => {
                const messageLines = alert.message.split('\r\n');
                const serialNumber = messageLines.find(line => line.startsWith("Serial Number:"))?.split("Serial Number:")[1]?.trim();
                const issueTime = messageLines.find(line => line.startsWith("Issue Time:"))?.split("Issue Time:")[1]?.trim();
                const alertDetail = messageLines.slice(3).join('\r\n'); // All the details after the first three lines

                // Combine the details into a single formatted string
                const formattedAlert = `Space Weather Message Code: ALTEF3\r\nSerial Number: ${serialNumber}\r\nIssue Time: ${issueTime}\r\n\r\n${alertDetail}`;

                return formattedAlert;
            });

        return electronFluxAlerts;
    } catch (error) {
        console.error('Error fetching Electron Flux Alert data:', error);
        return [];
    }
}

module.exports = fetchElectronFluxAlert;
