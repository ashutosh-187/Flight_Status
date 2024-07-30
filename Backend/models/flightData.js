const mongoose = require('mongoose');

const flightData_Schema = new mongoose.Schema({
    flight_id: String,
    airline: String,
    status: String,
    departure_gate: String,
    arrival_gate: String,
    scheduled_departure: String,
    scheduled_arrival: String,
    actual_departure: String,
    actual_arrival: String
});

const flightData = mongoose.model('flightData', flightData_Schema);

module.exports = flightData;