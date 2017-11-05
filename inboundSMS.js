const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser());

app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    if (req.body.Body == 'Hello') {
        twiml.message('Hi!');
    } else if(req.body.Body == 'Bye') {
        twiml.message('Goodbye');
    } else {
        twiml.message('It\'s a great day at Twilio!');
    }

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

http.createServer(app).listen(3000, () => {
    console.log('Express server listening on port 3000');
});
