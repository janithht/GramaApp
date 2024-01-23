import ballerina/http;
import ballerinax/mysql.driver as _;


service /gramaCertificate on new http:Listener(9093) {
    //get all certificate requests
    resource function get allCertRequests() returns Request[]|error {

        Request[] certificate_requests = [];
        stream<Request, error?> resultStream = certifyDb->query(`SELECT * from certificaterequest`);
        check from Request req in resultStream
            do {
                certificate_requests.push(req);
            };
        check resultStream.close();
        return certificate_requests;
    }

    resource function get getUserRequest(string email) returns Request[]|error {

        Request[] certificate_requests = [];
        stream<Request, error?> resultStream = certifyDb->query(`SELECT * from certificaterequest where email = ${email}`);
        check from Request req in resultStream
            do {
                certificate_requests.push(req);
            };
        check resultStream.close();
        return certificate_requests;
    }

    resource function post addCertificateRequest(@http:Payload NewRequest req) returns int|error? {
        
        return addCertificateRequest(req);
    }

    resource function put updateStatus(int requestId) returns int|error? {
        
        int affectedRows = check notificationUpdate(requestId);
        if (affectedRows > 0) {
            // Successfully updated the status
            return 200; // HTTP 200 OK
        } else {
            // Failed to update the status
            return 500; // HTTP 500 Internal Server Error
        }
    }

}