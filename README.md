# Long Island Minecraft Server

# Server Commands

## Dust

dust is needed to cast any spells on the server with `/jsp` commands.  It's
aquired by breaking (by hand) emerald, diamond, gold, or lapis lazuli ore. The
amount of dust rewarded is based on how rare that ore is.

 * `/jsp dust balance` tells you how much dust you have.

 * `/jsp dust <survey|excavate> <square>` survey tells you how much dust is
   in the square blocks you're pointing at down to bedrock, and excavate will
   remove all square blocks down to the bedrock leaving all ore floating there.

## Garden House

To build the Garden House, you can use one of the following commands:

 * `/jsp garden_house` build a garden house choosing the woods at random.

 * `/jsp garden_house <wood type>` where <wood type> can be (acacia, birch,
   jungle, oak, or spruce)

## Home

The `jsp home` command has the following options...

### Basic options

 * `/jsp home set` Will set your current location as your
   'home' location to which you can return at any time using the ...

 * `/jsp home` ..command will return you to your home, if you have set one.

 * `/jsp home set_outside` Will set your current location as your
   'outside home' location to which you can return at any time using the ...

 * `/jsp home outside` ..command will return you to outside your home, if you have set one.

 * `/jsp home {player}` Will take you to the home of {player} (where
   {player} is the name of the player whose home you wish to visit.

 * `/jsp home delete` Deletes your home location from the location
   database. This does not actually remove the home from the world or
   change the world in any way. This command is completely
   non-destructive and cannot be used for griefing. No blocks will be
   destroyed by this command.

### Social options
The following options allow players to open their homes to all or some
players, invite players to their home and see a list of homes they can
visit.

 * `/jsp home list` Lists home which you can visit.
 * `/jsp home ilist` Lists players who can visit your home.
 * `/jsp home invite {player}` Invites the named player to your home.
 * `/jsp home uninvite {player}` Uninvites (revokes invitation) the named player to your home.
 * `/jsp home public` Opens your home to all players (all players can visit your home).
 * `/jsp home private` Makes your home private (no longer visitable by all).

### Administration options
The following administration options can only be used by server operators...

 * `/jsp home listall` List all of the homes
 * `/jsp home clear {player}` Removes the player's home
   location. Again, this command does not destroy any structures in
   the world, it simply removes the location from the database. No
   blocks are destroyed by this command.

# Docker
```
docker build -t godsflaw/lomc .
docker push godsflaw/lomc:latest
docker run -p 25565:25565 -it -e OPS=godsflaw -e ONLINE_MODE=true -v /Users/godsflaw/minecraft:/minecraft godsflaw/lomc:latest
```
