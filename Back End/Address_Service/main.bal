import ballerina/http;
import ballerina/sql;
import ballerinax/mysql;
import ballerina/time;
import ballerinax/mysql.driver as _;

type Citizen record {|
    string nic;
    string citizenName;
    string addressNumber;
    string street1;
    string street2;
    string city;
    string postalCode;
|};

type ErrorDetails record {
    string message;
    string details;
    time:Utc timeStamp;
};

type UserNotFound record {|
    *http:NotFound;
    ErrorDetails body;
|};

type AddressMismatch record {
    ErrorDetails body;
};

configurable string HOST = ?;
configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string DATABASE = ?;
configurable int PORT = ?;

mysql:Client nationalDb = check new(host=HOST, user=USER, password=PASSWORD, database=DATABASE, port=PORT);

service /addressCheck on new http:Listener(9092) {
    resource function post address(Citizen citizen) returns Citizen|AddressMismatch|UserNotFound|sql:Error {
        
        Citizen|sql:Error user = nationalDb->queryRow(`Select * from citizenData where NIC = ${citizen.nic}`);

        if user is sql:NoRowsError {  // User Not Found
            UserNotFound userNotFound= {
                body: {message: string `user not found`, details: string `USER ${citizen.nic}`, timeStamp: time:utcNow()}
            };

            return 1;

        }else if user is sql:Error { //Other SQL Errors
            return 1;

        }else if user is Citizen {
            if (isEqual(citizen.addressNumber,user.addressNumber) && isEqual(citizen.street1,user.street1) && isEqual(citizen.street2,user.street2) && isEqual(citizen.city,user.city) ) {
                
                return 0;

            } else {
                AddressMismatch addressMismatch = {
                    body: {message: string `Address Mismatch`, details: string `USER ${citizen.nic}`, timeStamp: time:utcNow()}
                };
                return 1;
            }
        }
        
    }

    
}

function isEqual(string citizenAddress,string userAddress) returns boolean{
    // string newString = citizenAddress.trim();
    // newString = re `,\$`.replace(newString," ");
    return citizenAddress.trim().equalsIgnoreCaseAscii(userAddress);
}