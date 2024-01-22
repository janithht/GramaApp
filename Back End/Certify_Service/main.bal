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
configurable string POLICE_CHECK_SERVICE = ?;
configurable string IDENTITY_SERVICE = ?;
configurable string ADDRESS_SERVICE = ?;


mysql:Client certifyDb = check new(host=HOST, user=USER, password=PASSWORD, database=DATABASE, port=PORT,connectionPool ={maxOpenConnections: 2});


public type division_record record {|
    @sql:Column { name: "division_id" }
    int division_id;
    @sql:Column { name: "division" }
    string division;
|};

public type NewRequest record{|
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

public type Request record{|
    readonly int req_id;
    readonly int division_id;
    readonly string NIC;
    readonly string email;
    string  phoneNo;
    readonly int Id_check;
    readonly int address_check;
    readonly int police_check;
    readonly int status;
    readonly string date_submitted;
|};


// police check service
final http:Client policeCheckClient = check new (POLICE_CHECK_SERVICE);

// Id check service
final http:Client identityClient = check new (IDENTITY_SERVICE);


// address check service
final http:Client addressCheckClient = check new (ADDRESS_SERVICE);


//Input parameters : NIC, Address
function addCertificateRequest(NewRequest req) returns int|error {
    
    //returns the exist_id if there's a user
    int exist_Id = check identityClient->get("/users?NIC="+req.NIC);
    // get police_check value from police check service
    int police_check = check policeCheckClient->get("/checkCriminal/?NIC="+req.NIC);
    
    

    int address_check = check addressCheckClient->post("/address",req
    );

    // intial request status (processing=0, approved=1, rejected=2)
    int request_status=0;
    
    //req time
    time:Utc currTime = time:utcNow();
    string dateUtc = time:utcToString(currTime);
   
    string date = dateUtc.substring(0, 10);
    io:println(date);
    io:println("Date: ", date);
    


    // insert certificate request to database with police_check value
    sql:ExecutionResult result = check certifyDb->execute(`
        INSERT INTO certificaterequest (division_id, NIC, email, phoneNo, id_check, address_check, police_check, status,date_submitted)
        VALUES (${req.division_id},${req.NIC}, ${req.email},${req.phoneNo} ,${exist_Id}, ${address_check}, ${police_check}, ${request_status},${date})`);
    int|string? lastInsertId = result.lastInsertId;
    if lastInsertId is int {
        //update Status
        int _ = check updateStatus(lastInsertId, police_check, exist_Id, address_check);
        return lastInsertId;
    } 
    else {
        return error("Unable to obtain last insert ID");
    }

}


function updateStatus(int id, int policeCheck, int identityCheck, int addressCheck) returns int|error {
    int status = (policeCheck == 0 && identityCheck == 0 && addressCheck == 0) ? 1 : 2;  // 1=approved, 2=rejected

    sql:ExecutionResult result = check certifyDb->execute(`
        UPDATE certificaterequest
        SET status = ${status}
        WHERE req_id = ${id}`);
    
    int|string? affectedRowCount = result.affectedRowCount;

    if affectedRowCount is int {
        return affectedRowCount;
    } else {
        return error("Unable to obtain affected row count");
    }
}


function notificationUpdate(int id) returns int|error {
    sql:ExecutionResult result = check certifyDb->execute(`
        UPDATE certificaterequest
        SET status = 3
        WHERE req_id = ${id}`);
    
    int|string? affectedRowCount = result.affectedRowCount;

    if affectedRowCount is int {
        return affectedRowCount;
    } else {
        return error("Unable to obtain affected row count");
    }
}







