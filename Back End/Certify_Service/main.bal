import ballerina/http;
import ballerina/time;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerina/sql;

configurable string HOST = ?;
configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string DATABASE = ?;
configurable int PORT = ?;


mysql:Client certifyDb = check new(host=HOST, user=USER, password=PASSWORD, database=DATABASE, port=PORT);

type Request record{|
    readonly int req_id;
    readonly int NIC;
    string address;
    string status;
|};

public type Address record{|
    string no;
    string street1;
    string street2;
    string city;
    string postalcode;
|};


type NewRequest record{|
    int NIC;
    Address address;
|};

type UpdateStatus record{|
    string status;
|};

type ErrorDetails record{
    string message;
    string details;
    time:Utc timeStamp;
};

type RequestNotFound record{|
    *http:NotFound;
    ErrorDetails body;
|};

service /certificateRequest on new http:Listener(9091) {

    //Submit Certificate Request
    resource function post requests(NewRequest newRequest) returns http:Created|error {

        string addressString = newRequest.address.toString();
       _ = check certifyDb->execute(`
       INSERT INTO certificaterequest(nic, address, status)
       VALUES (${newRequest.NIC}, ${addressString}, 'Pending');`);
       return http:CREATED;
    }


    //List Certificate Requests
    resource function get requests() returns Request[]|error {
        stream<Request, sql:Error?> reqStream = certifyDb->query(`SELECT * FROM certificaterequest`);
        return from var request in reqStream select request;
    }

    //Get Certificate Request by NIC
    resource function get requests/[int NIC]() returns Request|RequestNotFound|error {
        Request|sql:Error request = certifyDb->queryRow(`SELECT * FROM certificaterequest WHERE NIC = ${NIC}`);  
        if request is sql:NoRowsError {
            RequestNotFound reqNotFound = {
                body: {message: string `id: ${NIC}`, details: string `user/${NIC}`, timeStamp: time:utcNow()}
            };
            return reqNotFound;
        }
        return request;
    }

    //Update Certificate Request Status
    resource function put requests/[int NIC](UpdateStatus updateStatus) returns Request|RequestNotFound|error {
        // Check if the certificate request with the given NIC exists
        Request|sql:Error request = certifyDb->queryRow(`SELECT * FROM certificaterequest WHERE NIC = ${NIC}`);
        if request is sql:NoRowsError {
            RequestNotFound reqNotFound = {
                body: {message: string `Certificate request not found with NIC: ${NIC}`, details: "", timeStamp: time:utcNow()}
            };
            return reqNotFound;
        }

        // Update the status of the certificate request
        sql:ExecutionResult result = check certifyDb->execute(`
        UPDATE certificaterequest
        SET status = ${updateStatus.status}
        WHERE nic = ${NIC};
        `);

        // Return the updated request
        if (result.affectedRowCount > 0) {
            return request;
        } else {
            // Handle the case where no rows were updated (unlikely but possible)
            return error("Request update failed: no rows affected");
        }
    }

}
