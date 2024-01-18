import ballerina/io;
import ballerina/time;
import ballerinax/slack;

configurable string token = ?; 

public function main(string message) returns error? {
    boolean | error? writeMessageResult = writeMessage(message);

    if writeMessageResult is error {
        io:println(writeMessageResult);
    }
    json[]|error? conversationHistory = getConversationHistory();
    if conversationHistory is json[] {
        foreach json conversation in conversationHistory {
            io:println(conversation);
        }
    } else if conversationHistory is error {
        io:println("Error occurred while getting conversation history");
    }
}

function writeMessage(string message) returns boolean | error? {
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

    string | error messageResult = check slackClient->postMessage(messageParams);
    io:println("messageResult:",typeof messageResult);
    if(messageResult is error){
        return false;
    }else{
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
            if (!messageInfo.text.endsWith("has joined the channel")) {
                conversationHistory.push({"user": userInfoByUserId, "message": messageInfo.text, "timestamp": messageInfo.ts});
            }
        } else {
            io:println("Error occurred while getting user info");
        }
    });
    return conversationHistory;
}

isolated function getUserInfoByUserId(string userId) returns string|error? {
    slack:ConnectionConfig slackConfig = {
        auth: {
            token
        }
    };

    slack:Client slackClient = check new (slackConfig);

    slack:User userInfo = check slackClient->getUserInfoByUserId(userId);
    return userInfo.realName;
}
