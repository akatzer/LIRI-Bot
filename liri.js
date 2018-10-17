require("dotenv").config();
var keys = require('./keys');
var request = require('request');
var Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var fs = require('fs');

var command1 = process.argv[2];
var command2 = process.argv.slice(3).join("+");



function spotifyThis() {
    var songName = command2
    if (songName == "") {
        spotify.search({ type: 'track', query: "The Sign Ace of Base", limit: 1 }, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
            }
            var artist = data.tracks.items[0].album.artists[0].name
            var title = data.tracks.items[0].name
            var link = data.tracks.items[0].album.external_urls.spotify
            console.log("YOU DIDN'T ENTER ANYTHING, DEFAULTING TO THE GREATEST SONG EVER!")
            console.log("Artist: " + artist);
            console.log("Song Title: " + title);
            console.log("Preview Link: " + link);

            fs.appendFile("log.txt", "***********************DATA********************************" + "\nCommand: " + command1 + "\nSearch: " + songName + "\nArtist: " + artist + "\nSong Title: " + title + "\nPreview Link: " + link + "\n ", function (err) {
                if (err) {
                    return console.log(err);
                }
            })
        });
    }
    else {
        spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);

            }
            var artist = data.tracks.items[0].album.artists[0].name
            var title = data.tracks.items[0].name
            var link = data.tracks.items[0].album.external_urls.spotify
            var album = data.tracks.items[0].album.name
            console.log("Artist: " + artist);
            console.log("Song Title: " + title);
            console.log("Preview Link: " + link);
            console.log("Album: " + album)

            fs.appendFile("log.txt", "***********************DATA********************************" + "\nCommand: " + command1 + "\nSearch: " + songName + "\nArtist: " + artist + "\nSong Title: " + title + "\nPreview Link: " + link + "\n ", function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        });
    }
}

    
        
function concertThis() {
    var bandName = command2
    // console.log(bandName);
    var queryUrl = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp"
    request(queryUrl, function (err, response, data) {
        if (err && response.statusCode != 200) {
            console.log('error:', err);
            console.log('statusCode:', response && response.statusCode);
        }
        var bP = JSON.parse(data);
        // console.log("***********************DATA********************************")
        // fs.appendFile("log.txt", "***********************DATA********************************" + "\nCommand: " + command1 + "\nSearch: " + command2 + "\n***********************************************************\n", function (err) {
        //     if (err) {
        //         return console.log(err);
        //     }
        // });

        for (i = 0; i < bP.length; i++) {
            var venue = bP[i].venue.name
            var region = bP[i].venue.region
            var country = bP[i].venue.country
            var city = bP[i].venue.city
            console.log("Venue: " + venue)
            // fs.appendFile("log.txt", "\nvenue: " + venue, function (err) {
            //     if (err) {
            //         return console.log(err);
            //     }
            // });
            if (region === "") {
                console.log("Location: " + city + ", " + country)
                // fs.appendFile("log.txt", "\nLocation: " + city + ", " + country, function (err) {
                //     if (err) {
                //         return console.log(err);
                //     }
                // });
            }
            else {
                console.log("Location: " + city + ", " + region)
                // fs.appendFile("log.txt", "\nLocation: " + city + ", " + region, function (err) {
                //     if (err) {
                //         return console.log(err);
                //     }
                // });
            }
            console.log("Date: " + moment(bP[i].datetime).format('L'));
            // fs.appendFile("log.txt", "\nDate: " + moment(bP[i].datetime).format('L') + "\n ", function (err) {
            //     if (err) {
            //         return console.log(err);
            //     }
            // });
            console.log("***********************************************************")



        };
    });
};

function movieThis() {
    var movie = command2;
    var queryUrl = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie + "";
    if (queryUrl === "http://www.omdbapi.com/?apikey=trilogy&t=") {
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
        fs.appendFile("log.txt", "\n***********************DATA********************************" + "\nCommand: " + command1 + "\nSearch: " + movie + "\nTitle: " + mP.Title + "\nYear Released: " + mP.Year + "\nIMDD Rating: " + mP.Ratings[0].Value + "\nRotten Tomatoes Rating: " + mP.Ratings[1].Value + "\nCountries where the movie was produced: " + mP.Country + "\nLanguage: " + mP.Language + "\nPlot: " + mP.Plot + "\nActors: " + mP.Actors + "\n ", function (err) {
            if (err) {
                return console.log(err);
            }
        });

    })
}



function run() {
    switch (command1) {
        case "spotify-this-song":
            spotifyThis();
            break;

        case "concert-this":
            concertThis();
            break;

        case "movie-this":
            movieThis();
            break;
    }
}

switch (command1) {
    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", function (err, data) {
            if (err) {
                return console.log(err);
            }
            var dataArr = data.split(",");
            command1 = dataArr[0];
            command2 = dataArr[1].replace(/"/g, "");
            run();
        })
        break;
}



run();



