/*  Demo script to demonstrate Twilio API.  Leveraes messaging, calling, and conferencing components.
    Demo flow:
        - Initiate incident response meeting
        - parse list of participants
            - send SMS notification and invite
            - automatically call with outbound voice and connect to conference

    Created By: Tim Wittbrod (twittbrod@gmail.com)
 */

var http = require('http');
var express = require("express");
var bodyParser = require("body-parser");
var twilio = require('twilio');
//var request = require('request');
var fs = require('fs');
var MessagingResponse = require('twilio').twiml.MessagingResponse;
var bodyParser = require('body-parser');


//var accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
//var authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
//var myTwilioNumber = process.env.TWILIO_NUMBER; // number assigned inside Twilio console
//var myTestNumber = process.env.MY_TEST_NUMBER; // mobile phone number for testing - me :)

//var client = new twilio(accountSid, authToken);
var client = new twilio();
// accountSid and authToken are set in environment variables
//const client = require('twilio')();


var userFile = "SWATTeamList.txt" // list of phone numbers to contact


const app = express();

app.use(bodyParser());

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

// (GO | Go | go) are keywords to instantiate conference
if ((req.body.Body == 'GO') || (req.body.Body == 'go') || (req.body.Body == 'Go')) {
    // notify sender of receipt of message to instantiate conference
    twiml.message('Launching SWAT meeting immediately!');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
//    client.calls.create({
//            url: 'https://handler.twilio.com/twiml/EHa9de919d3d77e16406b86298861354c9', // TwiML Bin URL tied to phone number (call)
//            to: process.env.MY_TEST_NUMBER,
//            from: process.env.TWILIO_NUMBER,
//        },  // end client.calls.create *{*
//        function (error, call) {
//            if (error) {
//                console.log(error);
//            } else {
//                console.log(call.sid);
//            } // end if (error)
//        }
//    ); // end client.calls.create *(*


    // read file and parse for phone numbers
    fs.readFile(userFile, 'utf8', function (err,data) {
        if (err) throw err;

        // convert phone list to array, separated by end of line
        var phoneE164 = data.split('\n');

        // iterate through list
        for (var i=0; phoneE164[i] != ""; i++) {
            console.log(phoneE164[i]);

            // send messages to participants
            client.messages.create({
                    body: 'INCIDENT OCCURRED -- Please join the SWAT call by simply calling this phone number.',
                    to: phoneE164[i],  // Text this number
                    from: process.env.TWILIO_NUMBER // From a valid Twilio number
                },
                function (error, message) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(message.sid);
                    }
                }
            );

            //Place calls out to conference participants:
            client.calls.create({
                    url: 'https://handler.twilio.com/twiml/EHa9de919d3d77e16406b86298861354c9',
                    to: phoneE164[i],
                    from: process.env.TWILIO_NUMBER,
                },
                function (error, call) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(call.sid);
                    }
                }
            );
        }
    });
} else {  // if message does not instantiate meeting
    twiml.message('Tell me GO to rally the troops into a conference.');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
}


});


// set listen port for webhook
http.createServer(app).listen(3000, () => {
    console.log('Express server listening on port 3000');
});












