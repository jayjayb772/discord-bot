# discord-bot
My first discord bot. Written in Javascript with NodeJs and DiscordJs
Has auto-moderation and sends flagged messages to managers set in the environment variables.
# Commands
**In order to use commands you must start with the set prefix. In this bot it is "irl!".** \
*ex; "irl!hours" will give hours*

**Regular use commands**

Command | Action | Optional Tags | Optional Tag functionality | Currently functional
--------|--------|---------------|--------------------------- | --------------------
**say (embed) str** | Repeats back Str | embed | embeds Str | **YES**
**quote** | Pulls random quote from [Adafruits quote API page](adafruit.com/quotes.php) | *N/A* | *N/A* | **YES**
**poll (prev ID)** | leads you through instructions to make reaction polls | prev_id | Message ID of a previous poll to get winner | **YES**
**hours (space) *n*** | Sends hours of both spaces | irl, irl2 | sends hours of specified space | **YES**
hours (cont.) | | n, normal | Implemented for COVID-19 to get normal hours of operation | **YES**
**site** | links to the [irl site](http://irl.depaul.edu/) | *N/A* | *N/A* | **YES**
**machines** | Lists Machines with docs | *REPLY MENU* | reply to it's messages to get info on specific machines | **IN PROGRESS**
**software** | lists software used | *REPLY MENU* | lists machines in group | **NO**
**staff (discordRole)** | Lists Staff on | discordRole | specify what specialty you need | **YES**
**upcoming (space)** | Lists upcoming events | irl, irl2 | specifies space | **NO**
**portal (channel)** | move you from one channel to another | channels | mention channel | **NO**
**bug (report)** | allows you to report a bug to set user easily | report | Enter a description of the bug and what is wrong to the best of your ability | **YES**
**help** | Lists all commands | *N/A* | *N/A* | **YES**

**Music channel commands**

Command | Action | Optional Tags | Optional Tag functionality | Currently functional
--------|--------|---------------|--------------------------- | --------------------
**play (link)** | adds song from youtube link to music queue | link | youtube link, maximum 5 minutes | **NO**
**skip** | skips current song | *N/A* | *N/A* | **NO**
**pause** | pauses song where its at | *N/A* | *N/A* | **NO**
**stop** | stops music bot from playing and clears queue | *N/A* | *N/A* | **NO**

For comments, questions or suggestions please contact Jacob B through discord or comment on this github repo.

# Future plans
This bot will live in the IRL discord server and handle most IRL related things. I'm working on gettting all listed commands functional. The ones that will take the longest are the machine and software commands due to the need to scrape info from the [IRL website](http://irl.depaul.edu/equipment-and-resources/) or type everything into a repeatable JSON file to easily have the bot send, most likely the latter.

### Command Development Order
1. Software
1. Machines
1. Upcoming

# Dev notes
I'm working on learning the DiscordJs package and making discord bots. This is my first real discord bot project so it will take some time to work out bugs and get it to full functionality. I'm using **dotenv** for bot token and other api secrets storage to keep them off github and make switching between testing and production much simpler. The bot has Auto-moderator features that will flag messages with banned words and send a notification to managers.

[Discordjs cheat sheet](https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584)

# TODO for the future:
* [Add instagram integration](https://github.com/pradel/node-instagram)
* [Add facebook integration](https://github.com/node-facebook/facebook-node-sdk)
* [Add twitter integration](https://www.npmjs.com/package/twitter)
* [Look into rss functionality as well](https://www.npmjs.com/package/rss-parser)
