# discord-bot
My first discord bot. Written in Javascript with NodeJs and DiscordJs
Has auto-moderation and sends flagged messages to managers set in the environment variables.
# Commands
**In order to use commands you must start with the set prefix. In this bot it is "irl!".** \
*ex; "irl!hours" will give hours*

Command | Action | Optional Tags | Optional Tag functionality | Currently functional
--------|--------|---------------|--------------------------- | --------------------
**say (embed) str** | Repeats back Str | embed | embeds Str | **YES**
**quote** | Pulls random quote from [Adafruits quote API page](adafruit.com/quotes.php) | *N/A* | *N/A* | **YES**
**hours (space) *n*** | Sends hours of both spaces | irl, irl2 | sends hours of specified space | **YES**
hours (cont.) | | n, normal | Implemented for COVID-19 to get normal hours of operation | **YES**
**site** | links to the [irl site](http://irl.depaul.edu/) | *N/A* | *N/A* | **YES**
**machines (subset) (space)** | Lists Machines with docs | irl, irl2 | Sends list for specified space | **NO**
machines (cont.)| | 3Dprint, Lasercut, CNC, Woodshop, VinylCut, Sewing, Screenprint, Electronics | lists machines in group | **NO**
**software (subset)** | lists software used | 3Dprint, Lasercut, CNC, Woodshop, VinylCut, Sewing, Screenprint, Electronics | lists machines in group | **NO**
**staff (discordRole)** | Lists Staff on | discordRole | specify what specialty you need | **YES**
**upcoming (space)** | Lists upcoming events | irl, irl2 | specifies space | **NO**
**portal (channel)** | move you from one channel to another | channels | mention channel | **NO**
**bug** | allows you to report a bug to set user easily | *N/A* | *N/A* | **NO**
**help** | Lists all commands | *N/A* | *N/A* | **YES**

For comments, questions or suggestions please contact Jacob B through discord or comment on this github repo.

# Future plans
This bot will live in the IRL discord server and handle most IRL related things. I'm working on gettting all listed commands functional. The ones that will take the longest are the machine and software commands due to the need to scrape info from the [IRL website](http://irl.depaul.edu/equipment-and-resources/) or type everything into a repeatable JSON file to easily have the bot send, most likely the latter.

### Command Development Order
1. Software
1. Machines
1. Upcoming

# Dev notes
I'm working on learning the DiscordJs package and making discord bots. This is my first real discord bot project so it will take some time to work out bugs and get it to full functionality. I'm using **dotenv** for bot token and other api secrets storage to keep them off github and make switching between testing and production much simpler. The bot has Auto-moderator features that will flag messages with banned words and send a notification to managers.
