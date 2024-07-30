const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const flightStatus_Routes = require("./routes/flight.routes");
const { sendEmail, sendSMS } = require('./controller/notification.controller');

const app = express();

app.use(cors());

app.use(express.json())

app.use('/flight', flightStatus_Routes);

const port = 3000;

app.listen(port, ()=>{
    console.log("Server is running at port number:", port)
});

const mongoDB_URL = "mongodb://localhost:27017/Indigo";

mongoose.connect(mongoDB_URL).then(()=>{
    console.log("Connected to MongoDB")

    const db = mongoose.connection;
    const flightDB = db.collection('flightdatas');
    const changeStream = flightDB.watch();
    changeStream.on('change', (change)=>{
        console.log('Change detected');

        if(change.operationType === 'update'){
            const newUpdates = {
                objectID : change.documentKey._id,
                updatedField: change.updateDescription.updatedFields
            };
            sendEmail(newUpdates);
            sendSMS(newUpdates);
        }
    })
}).catch((error)=>{
    console.error('Unable to connect with mongoDB', error);
});
