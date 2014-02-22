/**
 * Created by user on 2/22/14.
 */
Parse.initialize("SsKj0DVPOxnQde6rHobJsUH21T2FwzlQbcDkUmGU", "wZ6GNIGQwQ030sGc6maS54fHjagJKAJXbhlxL1am");
TB.setLogLevel(TB.DEBUG); 

var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

function gup( name ){
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )    return "";
    else    return results[1];
    }



var chatID = gup('id');

var Chat = Parse.Object.extend("Chat");
var query = new Parse.Query(Chat);

	var apiKey    = "44662662";
	var sessionId = "2_MX40NDY2MjY2Mn5-U2F0IEZlYiAyMiAxMjozMzo0MSBQU1QgMjAxNH4wLjY1MTIxNTQzfg";
	var token     = "T1==cGFydG5lcl9pZD00NDY2MjY2MiZzZGtfdmVyc2lvbj10YnJ1YnktdGJyYi12MC45MS4yMDExLTAyLTE3JnNpZz00N2NiOGY4MGMzMjI2ZWUzYzU0OTY5YmJlMmI5NWVhMDM4YjU3MjJhOnJvbGU9cHVibGlzaGVyJnNlc3Npb25faWQ9Ml9NWDQwTkRZMk1qWTJNbjUtVTJGMElFWmxZaUF5TWlBeE1qb3pNem8wTVNCUVUxUWdNakF4Tkg0d0xqWTFNVEl4TlRRemZnJmNyZWF0ZV90aW1lPTEzOTMxMDEyMzImbm9uY2U9MC4yNzAyODU1OTU1MjczMDU2JmV4cGlyZV90aW1lPTEzOTU2OTMyMTYmY29ubmVjdGlvbl9kYXRhPQ==";

var session;
var publisher;

query.get(chatID, {
    success: function(chat) {
        // The object was retrieved successfully.
        console.log(chat.get('sessionId'));
        // sessionId = chat.get('sessionId');
				// sessionId = '2_MX40NDY2MjY2Mn5-U2F0IEZlYiAyMiAxMjozMToxOCBQU1QgMjAxNH4wLjk3NDM5MzA3fg'
				console.log(sessionId);
        
				// session = TB.initSession(sessionId);
				// 
				//         session.connect(apiKey, token);
				// 
				//         session.addEventListener("sessionConnected",
				//             sessionConnectedHandler);
				// 
				//         session.addEventListener("streamCreated",
				//             streamCreatedHandler);
				
			  publisher = TB.initPublisher(apiKey,
                                 "video",
                                 {width:320, height:180});
 				
				session   = TB.initSession(sessionId);
				console.log(session);
 				session.connect(apiKey, token);
 				session.addEventListener("sessionConnected", 
 				                           sessionConnectedHandler);
 				 
 				session.addEventListener("streamCreated", 
 				                           streamCreatedHandler);
				session.publish(publisher);


    },
    error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and description.
    }
});


	
 
  function sessionConnectedHandler (event) {
     session.publish( publisher );
     subscribeToStreams(event.streams);
  }
  function subscribeToStreams(streams) {
    for (var i = 0; i < streams.length; i++) {
        var stream = streams[i];
        if (stream.connection.connectionId 
               != session.connection.connectionId) {
            session.subscribe(stream,
                                 "partner",
                                 {width:w, height:h});
        }
    }
  }
  function streamCreatedHandler(event) {
    subscribeToStreams(event.streams);
  }
 


