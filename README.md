VizWords
================
VizWords is a game in which a user tries to guess a trending search term after seeing a number of images and tweets related to that term. We pulled data from various APIs and used them in various stages of the game.

The game flow is as follows:
* Gather the top 20 hot search trends from Google and select one randomly.
* Pick up to five related images from Instagram and display them as the first set of clues to the user.
* The user will then enter a guess and s/he will be presented with more options ("more hints" and "answer") if the answer is incorrect. The user has five chances to guess, after which the game will end.
* The interface also detects duplicate input from the user and keeps a history of the user's answers.
* There are two additional sets of hints: (1) additional images from Tumblr, and (2) related tweets from Twitter.
* The game will end when the user: (1) submits five different guesses, or (2) clicks on "answer", or (3) guesses the term correctly.
* When the game ends, the interface will pull up an overlay window that displays the appropriate ending message as well as a related YouTube video.
* At this point, the user can close the overlay window or play the game again.

## Team Members and Roles
* [Jiun-Tang Huang]() - worked with Google Hot Trends and Tumblr API, developed additional game logic
* [Chan Kim]() - worked with Instagram API, developed main game logic
* [Suhani N Mehta](https://github.com/suhaninmehta) - worked with Twitter and YouTube API, created modals/overlays
* [Raymon Sutedjo-The](http://ray-mon.com/) - built basic files & script architecture, integrated script, worked on interaction & interface design

## Technologies Used
* Code - HTML, CSS, Javascript/jQuery, JSON, PHP
* APIs - Google Hot Trends, Instagram, Tumblr, Twitter, YouTube
 
## Demo Version 
http://ray-mon.com/vizwords/

## Known Bugs
* Not tested on older browsers.
* Validation of user's input to actual answer may not be accurate. If user enters "rain" and the correct answer is "rains", it will show user "wrong answer"
* There are known number of topics (20) that can be pulled from Google HotTrends at one time. Hence, after 20 tries, the trend topics will repeat.

