import ballerina/http;

service /smsService on new http:Listener(8080) {

    resource function post send_message(Response res) returns error|boolean {
        twilio_SMS(res.phoneNo, res.message);
        return true;
  }
    
}

