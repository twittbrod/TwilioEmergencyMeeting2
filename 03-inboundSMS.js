const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser());

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    // if-block builds the message
    if (req.body.Body == 'Hello') {
        // if incoming message is 'Hello' reply with 'Hi!'
        twiml.message('Hi!');
    } else if(req.body.Body == 'Bye') {
        // if incoming message is 'Bye' reply with 'Goodbye'
        twiml.message('Goodbye');
    } else {
        // for any other incoming mesage, reply with "It's a great day at Twilio!'
        twiml.message('It\'s a great day at Twilio!');
    }

    // send the message
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

// set listen port for webhook
http.createServer(app).listen(3000, () => {
    console.log('express server listening on port 3000');
});
