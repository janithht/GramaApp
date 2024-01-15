import ballerina/http;
import ballerina/io;
import ballerinax/slack;

service /slackService on new http:Listener(9090) {
    resource function post postMessagesToSlack() returns error? {
        slack:ConnectionConfig slackConfig = {
            auth: {
                token: "xoxp-6448348554055-6465350645444-6458107539879-ad8b026630b6f1f5f7bb161e76c12627"
            }
        };

        slack:Client slackClient = check new (slackConfig);

        slack:Message messageParams = {
            channelName: "grama",
            text: "Hello"
        };

        string stringResult = check slackClient->postMessage(messageParams);
        io:println(stringResult);
    }
}

