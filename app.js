require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const GardenRoutes = require("./GardenRoutes/GardenPlannerROUTES");
const cookieParser = require("cookie-parser");

app.disable('x-powered-by');

app.use(cookieParser());

app.use(morgan('dev'));

app.use(express.json());
app.use(express.static('GardenPublic'));
app.use(express.static('GardenPublic/sites', { extensions: ['html'] }));
app.use(express.urlencoded({ extended: true }));

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