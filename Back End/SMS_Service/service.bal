import ballerina/http;

service /smsService on new http:Listener(8080) {

    resource function get send_approved_message() returns error|boolean {
        string message = "Your request has been approved.";
        twilio_SMS(message);
        return true;
    } 

    resource function get send_rejected_message() returns error|boolean{
        string message = "Your request has been rejected. Please contact the Grama Niladhari Office for more information.";
        twilio_SMS(message);
        return true;
    }
    
}

