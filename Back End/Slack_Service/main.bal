import ballerina/http;
import ballerina/time;
import ballerinax/slack;

configurable string token = ?;

service /slackService on new http:Listener(9094) {
    resource function post sendMessage(string message) returns boolean|error? {
        boolean|error? writeMessageResult = writeMessage(message);
        if writeMessageResult is boolean {
            return writeMessageResult;
        } else {
            return writeMessageResult;
        }
    }
    resource function get getMessages() returns json[]|error? {
        json[]|error? readMessagesResult = getConversationHistory();
        return readMessagesResult;
    }
}

function writeMessage(string message) returns boolean|error? {
    slack:ConnectionConfig slackConfig = {
        auth: {
            token
        }
    };
    slack:Client slackClient = check new (slackConfig);

    slack:Message messageParams = {
        channelName: "grama_",
        text: message
    };

    string|error messageResult = check slackClient->postMessage(messageParams);
    if (messageResult is error) {
        return false;
    } else {
        return true;
    }
}

function getConversationHistory() returns json[]|error? {
    slack:ConnectionConfig slackConfig = {
        auth: {
            token
        }
    };
    slack:Client slackClient = check new (slackConfig);
    time:Utc utc = time:utcNow();
    string currentTime = utc[0].toString();

    stream<slack:MessageInfo, error?> resultStream =
                check slackClient->getConversationHistory("grama_", "1705318200", currentTime);

    json[] conversationHistory = [];
    check resultStream.forEach(function(slack:MessageInfo messageInfo) {
        string|error? userInfoByUserId = getUserInfoByUserId(messageInfo.user);
        if (userInfoByUserId is string) {
            if (!messageInfo.text.endsWith("has joined the channel")
            && !messageInfo.text.endsWith("has left the channel")
            && !messageInfo.text.startsWith("added an integration to this channel")) {
                conversationHistory.push({"user": userInfoByUserId, "message": messageInfo.text, "timestamp": messageInfo.ts});
            }
        }
    });
    return conversationHistory;
}

function getUserInfoByUserId(string userId) returns string|error? {
    slack:ConnectionConfig slackConfig = {
        auth: {
            token
        }
    };

    slack:Client slackClient = check new (slackConfig);

    slack:User userInfo = check slackClient->getUserInfoByUserId(userId);
    return userInfo.realName;
}
