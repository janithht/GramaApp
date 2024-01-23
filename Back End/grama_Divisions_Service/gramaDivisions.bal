import ballerina/http;
import ballerinax/mysql;
import ballerinax/mysql.driver as _;


configurable string USER = ?;
configurable string PASSWORD = ?;
configurable string HOST = ?;
configurable int PORT = ?;
configurable string DATABASE = ?;

final mysql:Client nationaldb = check new(
host=HOST, user=USER, password=PASSWORD, port=PORT, database=DATABASE,connectionPool ={maxOpenConnections: 2}
);



type DivisionResponse record {
    GramaDivision [] gramaDivisions;
};

type GramaDivision record {
  int divisionID; 
  string divisionName;
  string gramaNiladariName;
  string contactNumber;
  string district;
   
};

// @http:ServiceConfig {
//     cors: {
//         allowOrigins: ["http://localhost:3000"],
//         allowCredentials: true,
//         allowMethods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"]
//     }
// }


service /gramaDivisions on new http:Listener(9099) {
    //get all certificate requests
    resource function get allGramaDivisions() returns DivisionResponse|error {

        GramaDivision[] gramaDivisions = [];
        stream<GramaDivision, error?> resultStream = nationaldb->query(`SELECT * from  grama_division_information`);
        check from GramaDivision division in resultStream
            do {
                gramaDivisions.push(division);
            };
        check resultStream.close();
       
       DivisionResponse grmaDivisionResponse ={
         gramaDivisions: gramaDivisions 
       };

        return grmaDivisionResponse;
    }

}