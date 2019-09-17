const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members:[
            {email_address: email,
            status:"subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }
        }
        ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        url: 'https://us4.api.mailchimp.com/3.0/lists/7e10e5ddc1',
        method: "POST",
        headers:{
            "authorization": "robson1 8fd96535136d57b19b5fc58429529927-us4"
        },
        body: jsonData,

    };

    request(options, function(error, response, body){
        if(error){
            console.log(error);
        }else{
            console.log(response.statusCode);
        }

    });

})

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});

//API Key
//8fd96535136d57b19b5fc58429529927-us4

//ID for Audience Robson Muniz
//7e10e5ddc1