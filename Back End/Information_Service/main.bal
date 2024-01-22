import ballerina/http;
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;

public type Citizen record{|
    readonly string NIC;
    string contactNo;
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

mysql:Client nationalDb = check new(host=HOST, user=USER, password=PASSWORD, database=DATABASE, port=PORT,connectionPool ={maxOpenConnections: 2});

service /addressCheck on new http:Listener(9092) {
    resource function get information(string nic) returns Citizen|sql:Error {
        Citizen|sql:Error user = nationalDb->queryRow(`Select NIC,contactNo,no,street1,street2,city,postalcode from users where NIC = ${nic}`);

        return user;

    }
}