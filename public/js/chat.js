/**
 * Created by user on 2/22/14.
 */
Parse.initialize("SsKj0DVPOxnQde6rHobJsUH21T2FwzlQbcDkUmGU", "wZ6GNIGQwQ030sGc6maS54fHjagJKAJXbhlxL1am");

var apiKey    = "44662662";
var token     = "T1==cGFydG5lcl9pZD00NDY2MjY2MiZzZGtfdmVyc2lvbj10YnJ1YnktdGJyYi12MC45MS4yMDExLTAyLTE3JnNpZz0yZmZkOGZkZjdiZjgxM2Q0YTY3YjMyZWMzYTQ5NWEyNDFhOWY3OWQ5OnJvbGU9cHVibGlzaGVyJnNlc3Npb25faWQ9Ml9NWDQwTkRZMk1qWTJNbjUtVTJGMElFWmxZaUF5TWlBd09Ub3pOam8xTkNCUVUxUWdNakF4Tkg0d0xqazFOVE16TnpNMWZnJmNyZWF0ZV90aW1lPTEzOTMwOTA2NTQmbm9uY2U9MC40MDc0NzE4MTIwNjg5OTk2MyZleHBpcmVfdGltZT0xMzkzMTc3MDA2JmNvbm5lY3Rpb25fZGF0YT0=";

function gup( name ){
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )    return "";
    else    return results[1];
    }

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

var chatID = gup('id');
var session;
var Chat = Parse.Object.extend("Chat");
var query = new Parse.Query(Chat);
var sessionId;
query.get(chatID, {
    success: function(chat) {
        // The object was retrieved successfully.
        console.log(chat.get('sessionId'));
        // sessionId = chat.get('sessionId');
				sessionId = '1_MX40NDY2MjY2Mn5-U2F0IEZlYiAyMiAxMjoyNjowOSBQU1QgMjAxNH4wLjMzNDMzOTA4fg'
				console.log(sessionId);
        session = TB.initSession(sessionId);

        session.connect(apiKey, token);

        session.addEventListener("sessionConnected",
            sessionConnectedHandler);

        session.addEventListener("streamCreated",
            streamCreatedHandler);



    },
    error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and description.
    }
});