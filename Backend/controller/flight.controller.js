const db = require('../models');
const flightData_Model = db.flightData_Model;

exports.newFlight = (req, res)=>{
    const newFlight = new flightData_Model({
        flight_id: req.body.flight_id,
        airline: req.body.airline,
        status: req.body.status,
        departure_gate: req.body.departure_gate,
        arrival_gate: req.body.arrival_gate,
        scheduled_departure: req.body.scheduled_departure,
        scheduled_arrival: req.body.scheduled_arrival,
        actual_departure: req.body.actual_departure,
        actual_arrival: req.body.actual_arrival
    });

    newFlight.save().then(()=>{
        res.send("New data inserted into flight database");
    }).catch((err)=>{
        res.send("Unable to save data into flight database").status(500);
    });
};


exports.flightStatus = async (req, res)=>{
    try {
        const flight = await flightData_Model.findOne({
        flight_id: req.query.flight_id
        });
        if (!flight){
            return res.status(404).send({message: "Flight not found."})
        };

        output = {
            "Flight_Number": flight.flight_id,
            "Airline": flight.airline,
            "Status": flight.status,
            "Departure_Gate": flight.departure_gate,
            "Arrival_Gate": flight.arrival_gate,
            "Scheduled_Departure": flight.scheduled_departure,
            "Scheduled_Arrival": flight.scheduled_arrival
        }
        res.status(200).send(output);
    } catch (error) {
        res.status(500).send(error);
    }
};
