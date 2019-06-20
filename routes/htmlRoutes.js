
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var db = require("../models");

module.exports = function (app) {
    
    app.get("/", function (req, res) {
        db.Article.find({}).then( function (response) {
            res.render("index", {dbData: response});
        })
    });
    
    app.get("/scrape", function (req, res) {
        
        const decornews = "https://www.nytimes.com/topic/subject/interior-design-and-home-furnishings"
        axios.get(decornews).then(function (response) {

            const $ = cheerio.load(response.data);

            var dbArray = [];
            
            $("a.story-link").each( function (i, element) {
                let result = {};
                result.title = $(this).find(".headline").text().trim();
                result.link = $(this).attr("href");

                dbArray.push(result);
            })

            db.Article.create(dbArray);
            res.json("scrape completed"); 
            
        });
    });
};