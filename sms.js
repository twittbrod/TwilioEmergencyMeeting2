var express = require("express");
var bodyParser = require("body-parser");
var twilio = require('twilio');

//var accountSid = ''; // Your Account SID from www.twilio.com/console
//var authToken = ''; // Your Auth Token from www.twilio.com/console
//var myTwilioNumber = process.env.TWILIO_NUMBER; // number assigned inside Twilio console
//var myTestNumber = process.env.MY_TEST_NUMBER;

//var client = new twilio(accountSid, authToken);
var client = new twilio();


// send an SMS
client.messages.create({
        body: 'ALERT: This is an SMS notification.',
        to: process.env.MY_TEST_NUMBER,  // Text this number
        from: process.env.TWILIO_NUMBER // From a valid Twilio number
    },
    function (error, message) {
        if (error) {
            console.log(error);
        } else {
            console.log(message.sid);
        }
    }
)




// place a call
