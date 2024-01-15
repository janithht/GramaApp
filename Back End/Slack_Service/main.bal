import ballerina/http;
import ballerina/io;
import ballerinax/slack;

service /slackService on new http:Listener(9090) {
    resource function post postMessagesToSlack(string username, string email, string message) returns error? {
        slack:ConnectionConfig slackConfig = {
            auth: {
                token: "xxxx-xxxxxxxxx-xxxx"
            }
        };

        slack:Client slackClient = check new (slackConfig);

        slack:Message messageParams = {
            channelName: "grama_",
            text: "Hello! I am " + username + " and my email is " + email + ". " + message
        };

        string stringResult = check slackClient->postMessage(messageParams);
        io:println(stringResult);
    }
}

