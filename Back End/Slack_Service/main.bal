import ballerina/http;

service /slackService on new http:Listener(9094) {
   resource function post sendMessage(string message) returns boolean | error? {
       boolean|error? writeMessageResult = writeMessage(message);
       if writeMessageResult is boolean {
            return writeMessageResult;
       } else{
            return writeMessageResult;
       }
   }
   resource function get getMessages() returns json[] | error? {
       json[]|error? readMessagesResult = getConversationHistory();
        return readMessagesResult;
   }
}
