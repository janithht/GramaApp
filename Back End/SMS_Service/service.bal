import ballerina/http;

service /smsService on new http:Listener(8080) {

    resource function get send_message(string phoneNo, string message) returns error|boolean {
        twilio_SMS(phoneNo, message);
        return true;
  }
    
}

