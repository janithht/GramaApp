import ballerinax/twilio;
import ballerina/io;

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

public function main(string message) returns error? {
    twilio:CreateMessageRequest messageRequest = {
    To: "+94714591034", 
    From: fromMobile, 
    Body: message
};

twilio:Message response = check twilio->createMessage(messageRequest);

// Print the status of the message from the response
io:println("Message Status: ", response?.status);
}