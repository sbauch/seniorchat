/**
 * Created by user on 2/22/14.
 */
Parse.initialize("SsKj0DVPOxnQde6rHobJsUH21T2FwzlQbcDkUmGU", "wZ6GNIGQwQ030sGc6maS54fHjagJKAJXbhlxL1am");

function startNewChat(){
    var Chat = Parse.Object.extend("Chat");
    var chat = new Chat();
    chat.set('participant_1', "wK38A5KSdh");
    chat.save(null, {
        success: function(chat) {
            // Execute any logic that should take place after the object is saved.
//            alert('New object created with objectId: ' + chat.id);
            window.location.href = "chat?id=" + chat.id;
        },
        error: function(chat, error) {
            // Execute any logic that should take place if the save fails.
            // error is a Parse.Error with an error code and description.
            alert('Failed to create new object, with error code: ' + error.description);

        }
    });


};
