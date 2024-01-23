import ballerina/http;
import ballerina/sql;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;
import ballerina/log;

public type Citizen record{|
    int division_id;
    readonly string NIC;
    readonly string email;
    @sql:Column{name: "contactNo"}
    string  phoneNo;
    string no;
    string street1;
    string street2;
    string city;
    string postalcode;
|};

public type GramaDivisions record{
    @sql:Column{name: "divisionId"}
    int division_id;
    @sql:Column{name: "divisionName"}
    string div_name;
};

configurable string HOST = ?;
configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string DATABASE = ?;
configurable int PORT = ?;

mysql:Client nationalDb = check new(host=HOST, user=USER, password=PASSWORD, database=DATABASE, port=PORT,connectionPool ={maxOpenConnections: 2});

function isEqual(string citizenAddress,string userAddress) returns boolean{
    return citizenAddress.trim().equalsIgnoreCaseAscii(userAddress);
}

service /addressCheck on new http:Listener(9092) {
    resource function post address(Citizen citizen) returns int {
        
        Citizen|sql:Error user = nationalDb->queryRow(`Select division_id,NIC,email,contactNo,no,street1,street2,city,postalcode from users where NIC = ${citizen.NIC}`);

        if user is sql:NoRowsError {  // User Not Found
            log:printError("User Not Found"+user.message());
            return 1;

        }else if user is sql:Error { //Other SQL Errors
            log:printError("SQL error: " + user.message());
            return 1;

        }
        
        if user is Citizen{
            if (isEqual(citizen.no,user.no) && isEqual(citizen.street1,user.street1) && isEqual(citizen.street2,user.street2) && isEqual(citizen.city,user.city) ) {

                return 0;

            } else {
                log:printError("Error");
                return 1;
            } 
        }

        return 1;
    }
}

service /gramasevaDivision on new http:Listener(9093) {
    resource function get allGramasevaDivisions() returns GramaDivisions[]|error {

        GramaDivisions[] gramaDivisions=[];
        stream<GramaDivisions, sql:Error?> query = nationalDb->query(`Select divisionId, divisionName from grama_division_information`);
        check from GramaDivisions req in query
            do {
                gramaDivisions.push(req);
            };
        check query.close();
        return gramaDivisions;
    }
}


