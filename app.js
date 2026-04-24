require('dotenv').config();
const express = require('express');
const app = new express();
const GardenRoutes = require("./GardenRoutes/GardenPlannerROUTES");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(express.static('GardenPublic'));
app.use(express.static('GardenPublic/sites', { extensions: ['html'] }));
app.use(express.urlencoded({ extended: true }));

// Request logger -> logs method path status and response time
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const log = `${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)`;
        if (res.statusCode >= 400) {
            console.warn(log);
        } else {
            console.log(log);
        }
    });
    next();
});

app.use('/api', GardenRoutes);

// 404 handler for unknown API routes
app.use('/api', (req, res) => {
    res.status(404).json({ success: false, message: 'This endpoint does not exist.' });
});

// Global error handler -> unhandled errors in route handlers
app.use((err, req, res, next) => {
    console.error(`Unhandled error on ${req.method} ${req.originalUrl}:`, err.message);
    res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running http://localhost:${port}`);
});