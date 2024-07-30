const flightController = require("../controller/flight.controller");
const express = require('express');
const router = express.Router();

router.use(function (req, res, next){
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
    );
    next();
});

router.get("/status", flightController.flightStatus);
router.post('/createFlight', flightController.newFlight);

module.exports = router;