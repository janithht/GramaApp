import ballerina/http;
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerina/log;
<<<<<<< HEAD
=======

>>>>>>> 80eb51bcf89d55824995da9449782f5ef3ea1fe7

public type Citizen record{|
    int division_id;
    readonly string NIC;
    string no;
    string street1;
    string street2;
    string city;
    string postalcode;
|};

configurable string HOST = ?;
configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string DATABASE = ?;
configurable int PORT = ?;

mysql:Client nationalDb = check new(host=HOST, user=USER, password=PASSWORD, database=DATABASE, port=PORT,connectionPool ={maxOpenConnections: 5});

service /addressCheck on new http:Listener(9092) {
    resource function post address(Citizen citizen) returns int {
        
        Citizen|sql:Error user = nationalDb->queryRow(`Select division_id,NIC,no,street1,street2,city,postalcode from users where NIC = ${citizen.NIC}`);

        if user is sql:NoRowsError {  // User Not Found
<<<<<<< HEAD
            log:printError("User Not Found"+user.message());
=======
            log:printError("User Not Found");
>>>>>>> 80eb51bcf89d55824995da9449782f5ef3ea1fe7
            return 1;

        }else if user is sql:Error { //Other SQL Errors
            log:printError("SQL error: " + user.message());
            return 1;

        }else if user is Citizen{
<<<<<<< HEAD
            if (isEqual(citizen.no,user.no) && isEqual(citizen.street1,user.street1) && isEqual(citizen.street2,user.street2) && isEqual(citizen.city,user.city) ) {

            return 0;

=======
            if (isEqual(citizen.address.no,user.address.no) && isEqual(citizen.address.street1,user.address.street1) && isEqual(citizen.address.street2,user.address.street2) && isEqual(citizen.address.city,user.address.city) ) {
            return 0;

>>>>>>> 80eb51bcf89d55824995da9449782f5ef3ea1fe7
        } else {
            log:printError("Error");
            return 1;
        } 
        }
    }
}

function isEqual(string citizenAddress,string userAddress) returns boolean{
    return citizenAddress.trim().equalsIgnoreCaseAscii(userAddress);
}