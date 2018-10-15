require("dotenv").config();
var keys = require('./keys');
var request = require('request');
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var fs = require('fs');

var command = process.argv[2];

if (command === "spotify-this-song") {
    var songName = process.argv.slice(3).join(" ");
    // console.log(songName);
    spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            songName = "The Sign Ace of Base";
            spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {
                console.log("AN ERROR HAS OCCURED, DEFAULTING TO THE GREATEST SONG EVER!")
                console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
                console.log("Song Title: " + data.tracks.items[0].name);
                console.log("Preview Link: " + data.tracks.items[0].album.external_urls.spotify);
            })
        }
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song Title: " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].album.external_urls.spotify);
    });
}
if (command === "concert-this") {
    var bandName = process.argv.slice(3).join("+");
    // console.log(bandName);
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp"
    request(queryUrl, function (err, response, data) {
        if (err && response.statusCode != 200) {
            console.log('error:', err);
            console.log('statusCode:', response && response.statusCode);
        }
        var bP = JSON.parse(data);
        console.log("***********************DATA********************************")
        for (i = 0; i < bP.length; i++) {
            console.log("Venue: " + bP[i].venue.name)
            if (bP[i].venue.region === "") {
                console.log("Location: " + bP[i].venue.city + ", " + bP[i].venue.country)
            }
            else {
                console.log("Location: " + bP[i].venue.city + ", " + bP[i].venue.region)
            }
            console.log("Date: " + moment(bP[i].datetime).format('L'));
            console.log("***********************************************************")
        }
    });
};
if (command === "movie-this") {
    var movie = process.argv.slice(3).join("+");
    var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie + "";
    if (queryUrl === "http://www.omdbapi.com/?apikey=trilogy&t="){
        queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=Mr.+Nobody";
    }
    request(queryUrl, function (err, response, data) {
        if (err) {
            console.log('error:', err);
            console.log('statusCode:', response);
        }
        var mP = JSON.parse(data);
        console.log("***********************DATA********************************")
        console.log("Title: " + mP.Title);
        console.log("Year Released: " + mP.Year);
        console.log("IMDP Rating: " + mP.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + mP.Ratings[1].Value);
        console.log("Countries where the movie was produced: " + mP.Country);
        console.log("Language: " + mP.Language);
        console.log("Plot: " + mP.Plot);
        console.log("Actors: " + mP.Actors);
    })
}




