/**
 * Created by user on 2/22/14.
 */

Parse.initialize("SsKj0DVPOxnQde6rHobJsUH21T2FwzlQbcDkUmGU", "wZ6GNIGQwQ030sGc6maS54fHjagJKAJXbhlxL1am");
var apiKey    = "44662662";
var sessionId = "2_MX40NDY2MjY2Mn5-U2F0IEZlYiAyMiAwOTozNjo1NCBQU1QgMjAxNH4wLjk1NTMzNzM1fg";
var token     = "T1==cGFydG5lcl9pZD00NDY2MjY2MiZzZGtfdmVyc2lvbj10YnJ1YnktdGJyYi12MC45MS4yMDExLTAyLTE3JnNpZz0yZmZkOGZkZjdiZjgxM2Q0YTY3YjMyZWMzYTQ5NWEyNDFhOWY3OWQ5OnJvbGU9cHVibGlzaGVyJnNlc3Npb25faWQ9Ml9NWDQwTkRZMk1qWTJNbjUtVTJGMElFWmxZaUF5TWlBd09Ub3pOam8xTkNCUVUxUWdNakF4Tkg0d0xqazFOVE16TnpNMWZnJmNyZWF0ZV90aW1lPTEzOTMwOTA2NTQmbm9uY2U9MC40MDc0NzE4MTIwNjg5OTk2MyZleHBpcmVfdGltZT0xMzkzMTc3MDA2JmNvbm5lY3Rpb25fZGF0YT0=";

function sessionConnectedHandler (event) {
    session.publish( publisher );
    subscribeToStreams(event.streams);
}
function subscribeToStreams(streams) {
    for (var i = 0; i < streams.length; i++) {
        var stream = streams[i];
        if (stream.connection.connectionId
            != session.connection.connectionId) {
            session.subscribe(stream);
        }
    }
}
function streamCreatedHandler(event) {
    subscribeToStreams(event.streams);
}

var publisher = TB.initPublisher(apiKey);
var session   = TB.initSession(sessionId);

session.connect(apiKey, token);
session.addEventListener("sessionConnected",
    sessionConnectedHandler);

session.addEventListener("streamCreated",
    streamCreatedHandler);

var Chat = Parse.Object.extend("Chat");
var chat = new Chat();
chat.set('participant_1', "wK38A5KSdh");
chat.save(null, {
    success: function(chat) {
        // Execute any logic that should take place after the object is saved.
        alert('New object created with objectId: ' + chat.id);
    },
    error: function(chat, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and description.
        alert('Failed to create new object, with error code: ' + error.description);

    }
});