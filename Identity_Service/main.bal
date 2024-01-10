import ballerina/http;
import ballerina/time;
import ballerinax/mysql;
import ballerina/sql;

public type User record{|
    readonly int NIC;
    string name;
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

mysql:Client nationalDb = check new("localhost", "root","1234","nationaldb", 3306);

service /identityCheck on new http:Listener(9090) {
    resource function get users() returns User[]|error {
        stream<User, sql:Error?> userStream = nationalDb->query(`SELECT * FROM users`);
        return from var user in userStream select user;
    }

    resource function get users/[int NIC]() returns User|UserNotFound|error {
        User|sql:Error user = nationalDb->queryRow(`SELECT * FROM users WHERE NIC = ${NIC}`);  
        if user is sql:NoRowsError {
            UserNotFound userNotFound = {
                body: {message: string `id: ${NIC}`, details: string `user/${NIC}`, timeStamp: time:utcNow()}
            };
            return userNotFound;
        }
        return user;
    }

}