import ballerinax/twilio;

configurable string accountSid = ?;
configurable string authToken = ?;

const string fromMobile = "+19152137635";


twilio:ConnectionConfig twilioConfig = {
auth: {
username: accountSid,
password: authToken
}
};

twilio:Client twilio = check new (twilioConfig);

function twilio_SMS(string message) {
    twilio:CreateMessageRequest messageRequest = {
    To: "+94714591034", 
    From: fromMobile, 
    Body: message
};

twilio:Message|error response = twilio->createMessage(messageRequest);
if(response is error){

}
return;
// Print the status of the message from the response
//io:println("Message Status: ", response?.status);
}