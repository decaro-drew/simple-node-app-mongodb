var express = require("express")
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");

var client = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/admin';
client.connect(url,{ useNewUrlParser: true }, function(err,db)
{
     console.log("Connected");
     db.close();
});

app.use(bodyParser.json());

app.get("/", function(req, res){
    res.render("home.ejs");
});

app.post("/result", function(req, res){
    console.log(req.body);
    client.connect(url, function(err, client){
        let db = client.db("admin");
        db.collection('Data').insertOne({
            data: req.body.data
        });
        db.collection('Data').find({}).toArray(function(err, result){
            res.render("result.ejs", {result});
        })
    })
    //res.send(req.body);
});


app.listen(3000, function(){
    console.log("Server running on port 3000")
});