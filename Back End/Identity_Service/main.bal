import ballerina/http;
import ballerina/time;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerina/sql;
import ballerina/io;

configurable string HOST = ?;
configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string DATABASE = ?;
configurable int PORT = ?;

public type User record{|
    readonly string NIC;
    string fname;
    string lname;
    string contactNo;
    string gender;
    string dob;
    string address;
|};


type ErrorDetails record{
    string message;
    string details;
    time:Utc timeStamp;
};

type UserNotFound record{|
    *http:NotFound;
    ErrorDetails body;
|};

mysql:Client nationalDb = check new(host=HOST, user=USER, password=PASSWORD, database=DATABASE, port=PORT,connectionPool ={maxOpenConnections: 2});

service /identityCheck on new http:Listener(9090) {


    //Check for exisiting user by NIC
    //Output: IF a user exists returns o
    resource function get users(string NIC) returns int|error {
        User|sql:Error user = nationalDb->queryRow(`SELECT * FROM users WHERE NIC = ${NIC}`);  
        if user is sql:NoRowsError {
            io:println("User not found");
            return 1;
        } else {
            // User found
            io:println("User found");
            return 0;
        }
    }

}