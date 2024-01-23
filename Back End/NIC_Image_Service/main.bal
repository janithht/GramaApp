import ballerina/http;
import ballerina/io;

service /NIC on new http:Listener(9094) {

    resource function post upload(http:Request request,string requestID) returns string|error {
        stream<byte[], io:Error?> streamer = check request.getByteStream();

        // Writes the incoming stream to a file using the `io:fileWriteBlocksFromStream` API
        // by providing the file location to which the content should be written.
        check io:fileWriteBlocksFromStream("/files/"+requestID+".jpeg", streamer);
        check streamer.close();
        return "File Received!";
    }

    resource function get download(string requestID) returns http:Response|error {
        
        string filePath = "/files/"+requestID+".jpeg";
        string contentType = "image/*";

        // Read the file content
        byte[] fileContent = check io:fileReadBytes(filePath);

        // Create an HTTP response with the file content
        http:Response response = new;
        response.setPayload(fileContent);
        response.setHeader("Content-Type", contentType);
        
        // Send the response
        return response;
        
    }
    resource function get liveness() returns http:Ok {
        return http:OK;
    }

}