# discord-bot
My first discord bot. Written in Javascript with NodeJs and DiscordJs

# Commands

Command | Action | Optional Tags | Optional Tag functionality | Currently functional
--------|--------|---------------|--------------------------- | --------------------
**Say (embed) str** | Repeats back Str with optional Embed keyword | embed | embeds Str | **YES**
**Quote** | Pulls random quote from [Adafruits quote API page](adafruit.com/quotes.php) | *N/A* | *N/A* | **YES**
**Hours (space)** | Sends hours of both spaces | irl, irl2 | sends hours of specified space | **YES without tags**
**Open (space)** | Sends if spaces are open/when they open/close | irl, irl2 | sends for specified space | **NO**
**Machines (subset) (space)** | Lists Machines with docs | irl, irl2 | Sends list for specified space | **NO**
| | | 3Dprint, Lasercut, CNC, Woodshop, VinylCut, Sewing, Screenprint, Electronics | lists machines in group 
**Software (subset)** | lists software used | 3Dprint, Lasercut, CNC, Woodshop, VinylCut, Sewing, Screenprint, Electronics | lists machines in group | **NO**
**StaffOn (discordRole)** | Lists Staff on | discordRole | specify what specialty you need | **NO**
**Upcoming (space)** | Lists upcoming events | irl, irl2 | specifies space | **NO**
**Help** | Lists all commands | *N/A* | *N/A* | **NO**

For comments, questions or suggestions please contact Jacob B through discord or comment on this github repo.

# Future plans
This bot will live in the IRL discord server and handle most IRL related things. I'm working on gettting all listed commands functional. The ones that will take the longest are the machine and software commands due to the need to scrape info from the [IRL website](http://irl.depaul.edu/equipment-and-resources/) or type everything into a repeatable JSON file to easily have the bot send, most likely the latter.
## command development order
- [x] Help
- [ ] Hours
- [ ] Open
- [ ] StaffOn
- [ ] Software
- [ ] Machines
- [ ] Upcoming

# Dev notes
I'm working on learning the DiscordJs package and making discord bots. This is my first real discord bot project so it will take some time to work out bugs and get it to full functionality. I'm using **dotenv** for bot token and other api secrets storage to keep them off github and make switching between testing and production much simpler.
