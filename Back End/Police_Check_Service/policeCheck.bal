import ballerina/http;
import ballerinax/mysql;
import ballerina/time;

configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string HOST = ?;
configurable int PORT = ?;
configurable string DATABASE = ?;

final mysql:Client dbClient = check new(
host=HOST, user=USER, password=PASSWORD, port=PORT, database=DATABASE
);


type CriminalRecord record {|
  int convictionID; 
  string offendersNIC;
  string offenderName;
  string offenseType;
  time:Date convictionDate;
  string sentencingCourt;
  string penalty;
  boolean isConvicted;
  int severityLevel;

|};

type CriminalRecordResponse record {|
    boolean isCriminalRecords;
    CriminalRecord [] userCriminalRecords;
|};

type RecordNotFound record {
     *http:NotFound;
      boolean isCriminalRecords;
};


service /policeCheck on new http:Listener(9090) {


resource function get checkCriminalRecords/[string NIC]() returns CriminalRecordResponse|error {

CriminalRecord [] criminalRecords = [];
    stream<CriminalRecord, error?> resultStream = dbClient->query(
        `SELECT * FROM CriminalConvictions WHERE offendersNIC = ${NIC}`);
    check from CriminalRecord userCriminalRecord in resultStream
        do {
            criminalRecords.push(userCriminalRecord);
        };
    check resultStream.close();
    
    CriminalRecordResponse criminalRecordResponse;

    if criminalRecords.length() >0 {

        criminalRecordResponse= {
        isCriminalRecords: true,
        userCriminalRecords:criminalRecords
        };
    }else{
        criminalRecordResponse= {
        isCriminalRecords: false,
        userCriminalRecords:criminalRecords
        };
    }
    return criminalRecordResponse;  
}



}

