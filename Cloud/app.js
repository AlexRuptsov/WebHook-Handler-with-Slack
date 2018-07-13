/*
* Advanced Cloud Code Example
*/

var express = require('express');
var app = express();

// This will be our route handler for the /unbilled Slash Command
app.post('/getUnbilledUsers', function(req, res) {
  var query = new Parse.Query(Parse.User);
  query.equalTo("billed", false); // find all unbilled users
  query.find({
      success: function(unbilled) {
          if (unbilled.length > 0) {  // If there are unbilled users, format them and send them as a response
              var usernames = "Username: " + unbilled[0].get("username") + " | " + "User ID: " + unbilled[0].id + "\n";

              for (var i = 1; i < unbilled.length; i++) {
                  usernames += "Username: " + unbilled[i].get("username") + " | " + "User ID: " + unbilled[i].id + "\n";

              }
              res.send({
                  "text": "Unbilled Users:",
                  "attachments": [{
                      "text": usernames
                  }]
              });
          } else {  // If there are no unbilled users, send a different response
              res.send({
                  "text": "No unbilled users!"
              });
          }
      },
      error: function(error) {
          res.send({
              "text": "An Error occured"
          });
          console.error("Error" + error);
      }
  });
});

//This will be our route handler for the /bill Slash Command
app.post('/billUser', function(req, res) {
  var query = new Parse.Query(Parse.User);
  query.equalTo("billed", false); // find all unbilled users
  query.find({
      success: function(users) {
          if (users.length > 0) { // Only execute bill logic if there are unbilled users to save time
              for (var i = 0; i < users.length; i++) {
                  users[i].set("billed", true);
                  users[i].save(null, {
                      useMasterKey: true, // Use of MasterKey is required because we're updaing a field of the _User class
                      success: function(user) {
                          console.info("User with Username: " + user.get("username") + " and UserID: " + user.id + " successfully billed!");
                      },
                      error: function(error) {
                          console.error("Error" + error.message);
                      }
                  });
              }
              res.send({
                  "text": "Users successfully billed!"
              });
          } else {
              res.send({
                  "text": "There are currently no unbilled users."
              });
          }
      },
      error: function(error) {
          res.send({
              "text": "An Error occured, check your Logs!"
          });
          console.error("Error" + error);
      }
  });
});

app.get('/hello-advanced', function (req, res)
{
  res.send("Hello from SashiDo's Advanced Cloud Code");
});

/*
* Exporting of module.exports.app is required.
* we mount it automaticaly to the Parse Server Deployment.
*/

module.exports = app
