const db = require('../models');
require('dotenv').config();
const nodeMailer = require('nodemailer');
const flightData = require('../models/flightData');

exports.sendEmail = async (notification)=>{
    let mailTransporter = nodeMailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_PASS
    }
    });

    changedFlight = await flightData.findOne({_id: notification.objectID});
    const mailDetails = {
    from: process.env.EMAIL,
    to: process.env.RECIPIENT_EMAIL,
    subject: 'Flight Status',
    text: `Your ${changedFlight.flight_id} is ${changedFlight.status}. Departure time is ${changedFlight.scheduled_departure}. Departure gate is ${changedFlight.departure_gate}`
    };

    mailTransporter.sendMail(mailDetails).then(()=>{
        console.log("Mail send");
    }).catch((err)=>{
        console.log(`Unable to send mail: ${err}`);
    });
};

exports.sendSMS = async(notification)=>{
    const account = process.env.TWILIO_ACCOUNT;
    const token = process.env.TWILIO_TOKEN;
    const client = require('twilio')(account, token)

    changedFlight = await flightData.findOne({_id: notification.objectID});
    client.messages.create({
        body: `Your ${changedFlight.flight_id} is ${changedFlight.status}. Departure time is ${changedFlight.scheduled_departure}. Departure gate is ${changedFlight.departure_gate}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.RECIPIENT_Number
    }).then(()=>{
        console.log('SMS send!');
    }).catch((err)=>{
        console.log(`Unable to send SMS ${err}`);
    })
};