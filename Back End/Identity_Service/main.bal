import ballerina/http;
import ballerina/time;
import ballerinax/mysql;
import ballerina/sql;
import ballerina/io;

configurable string HOST = ?;
configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string DATABASE = ?;
configurable int PORT = ?;

public type User record{|
    readonly int NIC;
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

mysql:Client nationalDb = check new(host=HOST, user=USER, password=PASSWORD, database=DATABASE, port=PORT);

service /identityCheck on new http:Listener(9090) {

    //Get List of users
    resource function get users() returns User[]|error {
        stream<User, sql:Error?> userStream = nationalDb->query(`SELECT * FROM users`);
        return from var user in userStream select user;
    }

    //Check for exisiting user by NIC
    resource function get users/[int NIC]() returns User|UserNotFound|error {
        User|sql:Error user = nationalDb->queryRow(`SELECT * FROM users WHERE NIC = ${NIC}`);  
        if user is sql:NoRowsError {
            UserNotFound userNotFound = {
                body: {message: string `id: ${NIC}`, details: string `user/${NIC}`, timeStamp: time:utcNow()}
            };
            io:println("User not found");
            return userNotFound;
        }
        return user;
    }

}