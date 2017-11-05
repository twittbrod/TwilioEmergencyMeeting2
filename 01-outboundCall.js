// accountSid and authToken are set in environment variables
const client = require('twilio')();

client.calls.create({
        url: 'https://handler.twilio.com/twiml/EHa9de919d3d77e16406b86298861354c9', // TwiML Bin URL tied to phone number (call) - TwiML Bin name: JoinIncidentConference
        to: process.env.MY_TEST_NUMBER,
        from: process.env.TWILIO_NUMBER,
    },
    function (error, call) {
        if (error) {
            // print error to console
            console.log(error);
        } else {
            //print call sid to console
            console.log(call.sid);
        }
    }
)

