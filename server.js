const express = require("express");
var PORT = process.env.PORT || 3000;
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
var app = express();

//middleware
app.use(express.static("public"))

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//expresss-handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

mongoose.Promise = Promise;

//database connection
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

//routes 
require("./routes/htmlRoutes")(app);
//require("./routes/apiRoutes")(app);


//start our app listening 
app.listen(PORT, function () {
    console.log("Listening on http://localhost:"+PORT);
})

