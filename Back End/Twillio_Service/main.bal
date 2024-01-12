import ballerina/http;
import ballerina/sql;
import ballerina/log;



public function send_twilio_message(string message) returns error? {
    
}


service /api/v1 on new http:Listener(8080) {

    resource function get send_approved_message() returns string|sql:Error|error?{
        string message = "Your request has been approved. Please contact the grama niladhari office for more information.";
        var result = send_twilio_message(message);
        return result;
    } 

    resource function get send_rejected_message() returns string|sql:Error|error?{
        string message = "Your request has been rejected. Please contact the grama niladhari office for more information.";
        var result = send_twilio_message(message);
        return result;
    }

    
}