# discord-bot
My first discord bot. Written in Javascript with NodeJs and DiscordJs

**Commands**

Command | Action | Optional Tags | Optional Tag functionality | Currently functional
--------|--------|---------------|--------------------------- | --------------------
**Say** | Repeats back Str with optional Embed keyword | embed | embeds Str | **YES**
**Quote** | Pulls random quote from [Adafruits quote API page](adafruit.com/quotes.php) | *N/A* | *N/A* | **YES**
**Hours** | Sends hours of both spaces | irl, irl2 | sends hours of specified space | **YES without tags**
**Open** | Sends if spaces are open/when they open/close | irl, irl2 | sends for specified space | **NO**
**Machines** | Lists Machines with docs | irl, irl2 | Sends list for specified space | **NO**
 | | 3Dprint, Lasercut, CNC, Woodshop, VinylCut, Sewing, Screenprint, Electronics | lists machines in group 

* Machines (subset)
  * Lists Machines with docs with optional subset tag

* Software (subset)
  * Lists Software used with optional subset tag

* StaffOn (role)
  * Lists Staff on with optional rol tag for specific help

* Upcoming
  * Lists upcoming events

* Help
  * Lists all commands


