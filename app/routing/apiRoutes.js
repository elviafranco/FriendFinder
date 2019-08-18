

// CONNECTING OUR ARRAY OF OBJECTS (FRIENDS LIST)
var friends = require("../data/friends");

// API GET REQUEST- GETS OUR FRIENDS DATA FROM THE FRIENDS.JS
 // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/friends... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a survey... this data is then sent to the server...
    // Then the server saves the data to the friends array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        // res.json(true);
        console.log("===================================")

        const newFriendScores = req.body.scores
        console.log("These are the scores of the person who just submitted the survey : " + newFriendScores)
        let highNumber = 100
        let chosenFriend = 0
        console.log("===================================")

        // loop for friends
        for (let index = 0; index < friends.length; index++) {
            console.log("This is the loop for friends : " + friends[index].name)
            var difference = 0
            // console.log("===================================")

        // loop for scores of each friend 
        for (let j = 0; j < friends[index].scores.length; j++) {
            console.log("This is the score loop. These are all of the scores for : " + friends[index].name + ": " + friends[index].scores)

            // The addition assignment operator (+=) adds a value to a variable. Difference = Difference + Absolute Value 
            difference += Math.abs(newFriendScores[j] - friends[index].scores[j])
            console.log("Incremented difference between new friend scores and friend : " + friends[index].name + " : " + difference)
        }

        if (difference < highNumber) {
            highNumber = difference
            chosenFriend = friends[index]
        }
        }

        console.log("===================================")
        friends.push(req.body);
        console.log(chosenFriend)
        res.send(chosenFriend)

    });
        
    // ---------------------------------------------------------------------------
    // Clear out the table while working with the functionality.

    app.post("/api/clear", function (req, res) {
        // Empty out the arrays of data
        friends.length = 0;
        res.json({ ok: true });
    });
};



