const http = require('http');
const express = require('express');
const client = require('twilio')();
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser());

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    if ((req.body.Body == 'GO') || (req.body.Body == 'go') || (req.body.Body == 'Go')) {
        twiml.message('Launching SWAT meeting immediately!');
        client.calls.create({
                url: 'https://handler.twilio.com/twiml/EHa9de919d3d77e16406b86298861354c9', // TwiML Bin URL tied to phone number (call)
                to: process.env.MY_TEST_NUMBER,
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
    } else {
        twiml.message('Tell me GO to rally the troops into a conference.');
    }

res.writeHead(200, {'Content-Type': 'text/xml'});
res.end(twiml.toString());
});

http.createServer(app).listen(3000, () => {
    console.log('Express server listening on port 3000');
});





