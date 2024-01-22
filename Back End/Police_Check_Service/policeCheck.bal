import ballerina/http;
import ballerinax/mysql;
import ballerina/time;
import ballerina/io;



configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string HOST = ?;
configurable int PORT = ?;
configurable string DATABASE = ?;

final mysql:Client policeDb = check new(
host=HOST, user=USER, password=PASSWORD, port=PORT, database=DATABASE,connectionPool ={maxOpenConnections: 2}
);


type CriminalRecord record {|
  int convictionID; 
  string NIC;
  string offenderName;
  string offenseType;
  time:Date convictionDate;
  string sentencingCourt;
  string penalty;
  boolean isConvicted;
  int severityLevel;

|};

type CriminalRecordResponse record {|
    int isCriminalRecords;
    CriminalRecord [] userCriminalRecords;
|};

type RecordNotFound record {
     *http:NotFound;
      boolean isCriminalRecords;
};


@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000"],
        allowCredentials: true,
        allowMethods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"]
    }
}


service /policeCheck on new http:Listener(9091) {

resource function get checkCriminal(string NIC) returns int|error {

CriminalRecord [] criminalRecords = [];
    stream<CriminalRecord, error?> resultStream = policeDb->query(
        `SELECT * FROM CriminalConvictions WHERE NIC = ${NIC}`);
    check from CriminalRecord userCriminalRecord in resultStream
        do {
            criminalRecords.push(userCriminalRecord);
        };

    if criminalRecords.length() >0 {
        io:println("User is a criminal");
        return 1;
    }else{
        io:println("User is not a criminal");
        return 0;
    }
    
}

resource function get checkCriminalRecords(string NIC) returns CriminalRecordResponse|error {

CriminalRecord [] criminalRecords = [];
    stream<CriminalRecord, error?> resultStream = policeDb->query(
        `SELECT * FROM CriminalConvictions WHERE NIC = ${NIC}`);
    check from CriminalRecord userCriminalRecord in resultStream
        do {
            criminalRecords.push(userCriminalRecord);
        };
    
    
    CriminalRecordResponse criminalRecordResponse;

    if criminalRecords.length() >0 {

        criminalRecordResponse= {
        isCriminalRecords:1,
        userCriminalRecords:criminalRecords
        };
    }else{
        criminalRecordResponse= {
        isCriminalRecords:0,
        userCriminalRecords:criminalRecords
        };
    }
    return criminalRecordResponse;  
}



}

