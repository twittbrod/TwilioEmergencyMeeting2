// accountSid and authToken are set in environment variables
const client = require('twilio')();

client.calls.create({
        url: 'https://handler.twilio.com/twiml/EHcadc5c67a4e71b8943bd44568ed33883', // TwiML Bin URL tied to phone number (call)
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
)

