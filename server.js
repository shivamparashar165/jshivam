const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

mongoose.connect('mongodb+srv://authenticate:authenticate@authentication.wlz32ko.mongodb.net/AuthenticateDB');

mongoose.connection.on('connected', () => {
    console.log('Successfully connected to MongoDB!');
  });


const usersSchema = new mongoose.Schema({
    id: Number,
    email: String,
    pass: String,
});

const Users = mongoose.model("Users", usersSchema);
const users = new Users ({
    id: 1,
    email: "shivam@gmail.com",
    pass: "@#1Skshivam"
});

// users.save();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.set('view-engine', 'ejs');
const fs = require('fs');
const https = require('https');




app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
    

});

app.post("/", function(req, res){
    Users.find({ email: req.body.email}, {pass: req.body.pass}, function (err, docs) {
        if (err){
            console.log(err);
            res.send("Credntials didn't match")
        }
        else{
            console.log("Authentication Successfull!");
            
            res.sendFile(__dirname +"/public/index.html");
        }
    });

});

app.listen(80, function(){
    console.log("Server has started on port 3003");
});


