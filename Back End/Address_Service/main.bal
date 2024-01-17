import ballerina/http;
import ballerina/sql;
import ballerinax/mysql;
import ballerina/time;
import ballerinax/mysql.driver as _;

public type Citizen record{|
    int division_id;
    readonly string NIC;
    Address address;
|};

public type Address record{|
    string no;
    string street1;
    string street2;
    string city;
    string postalcode;
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

mysql:Client nationalDb = check new(host=HOST, user=USER, password=PASSWORD, database=DATABASE, port=PORT,connectionPool ={maxOpenConnections: 2});

service /addressCheck on new http:Listener(9092) {
    resource function post address(Citizen citizen) returns int {
        
        Citizen|sql:Error user = nationalDb->queryRow(`Select * from users where NIC = ${citizen.NIC}`);

        if user is sql:NoRowsError {  // User Not Found
           
            return 1;

        }else if user is sql:Error { //Other SQL Errors
            return 1;

        }else if user is Citizen {
            if (isEqual(citizen.address.no,user.address.no) && isEqual(citizen.address.street1,user.address.street1) && isEqual(citizen.address.street2,user.address.street2) && isEqual(citizen.address.city,user.address.city) ) {
                
                return 0;

            } else {
                
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