const mongoose = require('mongoose');

const db = {
    'mongoose': mongoose,
    'flightData_Model': require('./flightData'),
};

module.exports = db;