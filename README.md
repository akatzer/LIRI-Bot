# LIRI-Bot

LIRI is a node application that takes in a command along with a search phrase and returns information based on the command entered. The commands it recognizes are:
    -   spotify-this-song
    -   concert-this
    -   movie-this
    -   do-what-it-says

Command format <command> <search phrase>:
- spotify-this-song <song title>
    - This takes the song title entered and runs it through the spotify API. The following is logged to the terminal:
        - Artist
        - Song Title
        - Spotify Preview Link
        - Album

- concert-this <band name>
    -  This takes the band name entered and runs it through the bands in town API and retuns concert information for that particular band. The following is logged in the terminal:
        -   Venue Name
        -   Location of Venue
        -   Date of the Concert
        

- movie-this <movie title>
    - This takes the movie title entered and runs it through the OMDB API and returns: 
        -   Movie Title
        -   Year Released
        -   IMDB Rating
        -   Rotten Tomatoes Rating
        -   Countries where the movie was produced
        -   Language
        -   Plot
        -   Actors
