// import ballerina/http;
import ballerina/io;
import ballerinax/slack;

configurable string token = ?;

// service /slackService on new http:Listener(9090) {
// resource function post postMessagesToSlack(string username, string email, string message) returns error? {
public function main(string message) returns error? {

    slack:ConnectionConfig slackConfig = {
        auth: {
            token
        }
    };

    slack:Client slackClient = check new (slackConfig);

    slack:Message messageParams = {
        channelName: "grama_",
        // text: "Hello"
        text: message
    };

    string stringResult = check slackClient->postMessage(messageParams);
    io:println(stringResult);
}
// }
// }
