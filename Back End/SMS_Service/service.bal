import ballerina/http;

service /smsService on new http:Listener(8080) {

    resource function get send_approved_message() returns anydata|http:Response|http:StatusCodeResponse|error {
    string message = "Your request has been approved.";
    return check main(message);
    } 

    resource function get send_rejected_message() returns anydata|http:Response|http:StatusCodeResponse|error{
        string message = "Your request has been rejected. Please contact the Grama Niladhari Office for more information.";
         return check main(message);
    }
    
}

